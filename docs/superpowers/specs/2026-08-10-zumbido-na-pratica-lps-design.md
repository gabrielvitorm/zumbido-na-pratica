# Design — LPs Zumbido na Prática (Turma 4)

## Contexto e objetivo

Lançamento do curso "Zumbido na Prática" (Turma 4) precisa de 3 páginas web publicadas no mesmo domínio: página de vendas, página de obrigado (pós-compra, com upsell) e um quiz de captação de leads. A copy completa e a lógica de conversão de cada página já estão definidas em três arquivos na raiz do projeto:

- `pagina-vendas.md`
- `pagina-obrigado.md`
- `pagina-captacao-quiz.md`

O objetivo deste projeto é construir a implementação em Next.js dessas 3 páginas, publicada em uma VPS Hostgator, com uma identidade visual voltada à área da saúde — clean, transmitindo segurança e confiança — e uma estrutura de projeto pensada para hospedar novas campanhas/produtos no mesmo domínio no futuro, sem exigir retrabalho estrutural.

Este spec cobre a fundação do projeto (stack, design system, integrações, deploy) e as 3 páginas da campanha "Zumbido na Prática". Não cobre campanhas futuras — a estrutura só deixa espaço para elas.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** para estilo, com tokens de design (cores/tipografia) centralizados
- **react-hook-form** + **zod** para o formulário de captura de contato do quiz (validação client-side e server-side)
- **Framer Motion** para transições do quiz e accordions
- **lucide-react** para ícones (check, x, shield, clock, play)
- Sem banco de dados. Leads são recebidos via API Route e repassados a um webhook externo (Make.com, Google Sheets via Apps Script, ou similar) configurado por variável de ambiente.

## Estrutura de pastas

```
/app
  /(campaigns)
    /zumbido-na-pratica
      /vendas/page.tsx
      /obrigado/page.tsx
      /quiz/page.tsx
      content.ts        # copy tipada da campanha (headline, módulos, FAQ, depoimentos, lotes...)
      config.ts          # links (checkout, whatsapp), datas/preços dos lotes, refs de env vars
  /api/lead/route.ts      # recebe submissão do quiz, valida e repassa pro webhook
  /privacidade/page.tsx   # política de privacidade (link do checkbox LGPD do quiz)
  layout.tsx               # fontes, metadata padrão, scripts de tracking condicionais
  globals.css               # tokens Tailwind (cores, radius, tipografia)
/components
  /ui                       # Button, Accordion, Card, Badge, StickyBar, CountdownTimer, TwoColumnList, VideoEmbed
  /campaign                  # blocos maiores reutilizáveis entre campanhas: Hero, PriceCard, GuaranteeBlock, FaqSection, QuizStep
/lib
  campaign-phase.ts          # decide o lote vigente com base na data atual e nas janelas configuradas
  tracking.ts                  # helpers para disparar eventos Meta Pixel / GA4 condicionalmente
  quiz-scoring.ts               # lógica de pontuação e faixa de resultado do quiz
/docs
  superpowers/specs/            # specs de design (este arquivo e futuros)
  superpowers/plans/            # planos de implementação
DEPLOY.md                        # passo a passo de deploy na VPS
```

Cada nova campanha futura é uma nova pasta dentro de `(campaigns)`, com seu próprio `content.ts`/`config.ts`, reaproveitando `/components` e `/lib`. Nenhum mecanismo de listagem/roteamento automático entre campanhas é construído agora — não foi solicitado.

## Identidade visual

**Paleta:**

| Papel | Cor | Uso |
|---|---|---|
| Primária | `#12495A` (azul petróleo) | títulos, links, elementos de marca |
| Fundo | `#FAF9F6` (branco quente) | fundo padrão das páginas |
| Texto | `#1F2937` (cinza-chumbo) | corpo de texto |
| Accent/CTA | `#E8703A` (terracota) | botões primários, destaques de urgência |
| Sucesso | `#2F9E63` (verde) | confirmações, ícones de "é pra você" |
| Alerta/urgência | `#D64545` (vermelho) | barra sticky na fase final de lote apenas |

**Tipografia:** família única — Inter (variável, pesos 400/500/600/700) para título e corpo. Hierarquia por tamanho/peso, não por combinação de fontes.

**Linguagem visual:** cantos arredondados moderados (`rounded-xl`, ~12px), sombras suaves e rasas, ícones de linha consistentes (lucide-react), espaçamento generoso entre seções, sem gradientes decorativos nem imagens de banco de imagens — a única foto/vídeo da página é da Expert, quando disponível.

Os tokens de cor/tipografia vivem em `globals.css` (variáveis CSS) e no `tailwind.config` — não são específicos da campanha "Zumbido na Prática", são o design system base do domínio.

## Página de Vendas (`/zumbido-na-pratica/vendas`)

- Composição de blocos de `/components/campaign` na ordem exata das 14 dobras definidas em `pagina-vendas.md`. A ordem é hardcoded no `page.tsx` — não é reordenável por config, por instrução explícita da copy original ("não reordene sem motivo").
- **Barra de urgência (`StickyBar`)**: componente `position: sticky`. Usa `lib/campaign-phase.ts` para comparar a data atual com as janelas de lote definidas em `config.ts` (Lote 1: 10–13/08, Lote 2: 14–20/08, Últimas 96h: 21–24/08) e seleciona automaticamente o texto e preço correspondentes. Inclui `CountdownTimer` (client component) contando regressivamente até o fim do lote vigente, com placeholder estático até montar no client (evita mismatch de hidratação SSR).
- **Preço e lotes**: o card de preço consome a mesma função `campaign-phase.ts` que a barra sticky usa — garante que os dois lugares nunca mostrem preços/lotes divergentes.
- **Conteúdo — 7 módulos**: `Accordion` reutilizável; título/descrição de cada módulo vêm de `content.ts`. O nome do Módulo 6 ("Surdez Súbita") entra como placeholder marcado explicitamente em `content.ts`, para confirmação posterior.
- **Para quem é / não é**: duas colunas com ícone check/x.
- **Virada (dobra 4)** e **prova social**: suportam `VideoEmbed` (thumbnail + play, autoplay mudo opcional) com `src` vindo de `content.ts`; entram como placeholder até os arquivos finais existirem.
- Todos os CTAs consomem `config.checkoutLink`. Trocar esse valor atualiza todos os botões da página.

## Página de Obrigado (`/zumbido-na-pratica/obrigado`)

- Ordem fixa das 5 dobras: confirmação → próximo passo (grupo da turma) → timeline → upsell → compartilhamento. Compartilhamento é renderizado condicionalmente via flag em `config.ts` (fácil de desligar).
- Nome da compradora lido via query string (`?nome=`), com fallback genérico ("Bem-vinda!") se o parâmetro não vier — depende de o checkout permitir passar esse dado no redirect.
- **Upsell do Módulo de Avaliação**: card com fundo visualmente distinto do resto da página. O botão de recusa ("Não, obrigada, só o combo por enquanto") é sempre visível e nunca menor/escondido, por instrução explícita da copy original — evita fricção/desconfiança logo após uma compra de valor alto.
- Dispara evento de tracking de conversão (`Purchase`/`CompleteRegistration`) ao montar a página.

## Quiz de Captação (`/zumbido-na-pratica/quiz`)

- Componente client-side `Quiz`, uma pergunta por tela, sem scroll interno, avanço automático ao clicar em opções de múltipla escolha, botão "Voltar" discreto, barra de progresso no topo.
- Estado local (`useReducer`) acumula respostas e pontuação; nada é enviado ao servidor antes da Tela 6.
- **Tela 6 (captura de contato)**: formulário `react-hook-form` + `zod` com nome, WhatsApp (máscara BR) e checkbox de consentimento LGPD obrigatório, linkando para `/privacidade`. Submit dispara `POST /api/lead`.
- **`POST /api/lead`**: valida o payload no servidor com zod (nunca confia apenas na validação client-side), repassa para `LEAD_WEBHOOK_URL` via `fetch`. Se o webhook falhar, o erro é logado mas a resposta ao usuário permanece de sucesso — a experiência dela não deve travar por um problema de infraestrutura externa; falhas são monitoradas via logs do PM2.
- **Tela 7 (resultado)**: a faixa de pontuação (0-4 / 5-9 / 10-14) é calculada em `lib/quiz-scoring.ts`, inteiramente a partir do estado já em memória (sem round-trip ao servidor). Cada faixa mostra sua copy correspondente; os três resultados levam ao mesmo CTA final, cujo destino (`config.quizResultCtaLink`) é trocado manualmente entre "grupo da aula" e "página de vendas" conforme a fase do carrinho — a página não decide isso sozinha por data, é edição manual em `config.ts`, como o MD original prevê.

## Integrações e configuração

Todas as integrações são configuradas via variáveis de ambiente, referenciadas em `config.ts` por campanha, com fallback visível em vez de quebra quando ausentes (ex.: CTA aponta para `#checkout-pendente` se `CHECKOUT_LINK` não estiver definida):

```
CHECKOUT_LINK
WHATSAPP_GROUP_LINK
LEAD_WEBHOOK_URL
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_GA_ID
```

**Tracking**: `lib/tracking.ts` centraliza os disparos de evento. Scripts do Meta Pixel/GTM só carregam (via `next/script`) se o respectivo ID estiver definido. Eventos disparados: `Lead` (submit do quiz), `InitiateCheckout` (clique em qualquer CTA de checkout), `CompleteRegistration`/`Purchase` (carregamento da página de obrigado).

## Deploy — VPS Hostgator (nova/limpa)

Documentado em `DEPLOY.md` na raiz do projeto, cobrindo:

1. Instalação do Node.js LTS (via `nvm`) e PM2 global
2. `next.config.js` com `output: 'standalone'`
3. Nginx como proxy reverso (443 → porta interna do Next.js)
4. Certbot (Let's Encrypt) para SSL do domínio
5. `ecosystem.config.js` do PM2 — auto-restart em crash, `pm2 startup` para sobreviver a reboot da VPS
6. Passo a passo de deploy/atualização (pull, build, `pm2 reload`) para reaplicar em campanhas futuras sem precisar reconfigurar a VPS do zero

## Testes

- Testes unitários (Vitest) para lógica pura sem dependência de UI: `campaign-phase.ts` (seleção correta de lote por data) e `quiz-scoring.ts` (cálculo de faixa por pontuação).
- Verificação manual em navegador (não automatizada) das 3 páginas antes de considerar cada uma concluída — cobrindo os componentes visuais (accordion, sticky bar, countdown, quiz) que não valem a pena testar via testes automatizados de UI neste escopo.

## Fora de escopo

- Painel administrativo para editar datas/preços de lote sem mexer em código (edição manual em `config.ts` + redeploy, como a copy original já prevê).
- Qualquer mecanismo de roteamento/listagem automática entre múltiplas campanhas no domínio raiz.
- Integração direta com plataforma de checkout (o link de checkout é externo e opaco ao projeto).
- Confirmação de pagamento via webhook do checkout — a página de obrigado assume que só é acessada após pagamento aprovado, pois é para onde o checkout redireciona.
