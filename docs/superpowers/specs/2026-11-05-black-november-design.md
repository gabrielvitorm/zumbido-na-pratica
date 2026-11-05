# Black November — Zumbido na Prática

## Design spec

**Status:** aprovada para execução, com datas das lives pendentes

**Base:** `black-november-copy.md` e `black-november-ui-ux.md`

**Rota afetada:** `/zumbido-na-pratica/vendas`

## 1. Intenção

Transformar a página de vendas da Turma 4 em uma landing page de Black November, mantendo a tese central da marca — ajudar profissionais de saúde a conduzir pacientes com zumbido — e mudando a oferta para acesso imediato, módulos gravados e 2 lives de tira-dúvidas.

A campanha deve comunicar uma oferta premium e limitada por prazo, com preço consistente em todos os pontos da página, sem usar escassez artificial de vagas nem promessas clínicas garantidas.

## 2. Estado atual identificado

- A rota de vendas já é composta por blocos reutilizáveis e recebe copy de `app/(campaigns)/zumbido-na-pratica/content.ts`.
- A oferta, o prazo e o estado do lote ficam em `app/(campaigns)/zumbido-na-pratica/config.ts`.
- A página atual ainda comunica Turma 4, início em setembro, 10 módulos, aulas ao vivo e mentoria.
- `modulosContent` possui 10 módulos e um bônus de mentoria; a Black deve exibir 8 módulos e 2 lives como bônus.
- O contador atual exibe `00:00:00:00` após o prazo e não possui estado de campanha encerrada.
- `getCurrentLote` sempre devolve um lote, inclusive depois do fim, o que pode manter preço e checkout antigos ativos.
- O tema atual é cream/verde/coral; a proposta Black pede azul-marinho/preto, dourado e acentos controlados de urgência.
- O tracking atual já possui `ViewContent`, `InitiateCheckout`, atribuição e scroll depth, mas precisa de eventos/posições específicos da campanha.

## 3. Objetivos

1. Posicionar a página como Black November até 30/11/2026 às 23:59 no fuso `America/Fortaleza`.
2. Apresentar uma oferta coerente em barra sticky, hero, módulos, oferta, CTA final e CTA mobile.
3. Exibir exatamente 8 módulos na ordem oficial.
4. Explicar sem ambiguidade o formato: conteúdo gravado + 2 lives de dúvidas.
5. Garantir que o prazo e o encerramento sejam refletidos no front e no destino de checkout.
6. Preservar boa experiência mobile, acessibilidade AA, tracking e performance.

## 4. Não objetivos

- Criar uma nova rota de campanha.
- Reescrever o quiz ou a página de confirmação, salvo ajustes de nomenclatura inevitáveis.
- Prometer cura, resultado clínico garantido ou número de vagas não comprovado.
- Transformar a página em um framework genérico de campanhas nesta entrega.
- Usar a arte dos módulos como uma imagem única no lugar de HTML acessível.

## 5. Abordagem escolhida

Readequar a rota existente e evoluir seus componentes.

Essa abordagem preserva o fluxo, os testes e o tracking já existentes, reduz duplicação e permite implementar a nova identidade por tokens de design. A configuração da oferta será extraída para uma fonte única de valores, sem criar ainda um sistema completo para múltiplas campanhas.

## 6. Decisões comerciais

Os valores abaixo não podem ser inferidos dos documentos e devem ser preenchidos antes do código de produção:

| Chave | Valor necessário | Impacto |
|---|---|---|
| `blackPrice` | **R$ 1.900,00** | Hero, barra, oferta, CTA mobile e tracking |
| `anchorPrice` | **R$ 3.000,00** | Economia e ancoragem |
| `savings` | **R$ 1.100,00** | Blocos de preço e urgência |
| `installment` | **12x de R$ 196,50** | Todos os blocos de preço e FAQ |
| `checkoutLink` | **https://pay.kiwify.com.br/UPbHakl** | Todos os CTAs enquanto a Black estiver ativa |
| `liveOne` / `liveTwo` | Data e horário das lives | Bônus, oferta e FAQ |
| `accessMonths` | Tempo de acesso | Oferta e FAQ |
| `includeGroup` | Grupo incluso ou não | Lista da oferta |
| `includeCertificate` | Certificado incluso ou não | Lista da oferta, se aplicável |
| `includeMentorship` | Mentoria permanece ou sai | Bônus e FAQ |
| `expiredBehavior` | **normal-price** | Estado após 30/11 |
| `discountForAlumni` | Regra para ex-alunas | FAQ |
| `moduleTrainingContent` | Conteúdo confirmado de Treinamento Auditivo e Zumbido | Card do módulo |
| `suddenDeafnessContent` | Confirmar se Surdez Súbita pertence a algum módulo | Lista de resultados |

As datas das duas lives continuam pendentes e devem ser preenchidas antes de publicar a página final. A implementação pode avançar com um estado explícito de configuração incompleta para as lives, mas não deve exibir placeholders para o público.

## 7. Modelo de dados da campanha

Criar uma configuração única para impedir divergências entre componentes. A estrutura deve conter, no mínimo:

```ts
interface BlackNovemberOffer {
  id: "black-november-2026";
  label: "Black November";
  price: "R$ 1.900,00";
  priceValue: 1900;
  anchorPrice: "R$ 3.000,00";
  anchorPriceValue: 3000;
  savings: "R$ 1.100,00";
  installment: "12x de R$ 196,50";
  checkoutLink: "https://pay.kiwify.com.br/UPbHakl";
  startDate: string;
  endDate: string;
  accessMonths: number;
  liveSessions: [{ date: string; label: string }, { date: string; label: string }];
  includesGroup: boolean;
  includesCertificate: boolean;
  includesMentorship: boolean;
  expiredBehavior: "normal-price";
}
```

O prazo deve ser representado com offset explícito `-03:00`, e a camada de checkout deve aplicar a mesma regra de encerramento. Após o prazo, a página deve remover o checkout Black e voltar ao preço normal. O front não pode ser a única proteção do preço promocional.

## 8. Copy e conteúdo

### 8.1 Mensagem central

Manter o headline:

> Pare de dizer “não tem cura, vamos aprender a conviver” pro seu paciente com zumbido

Subheadline proposta:

> O protocolo completo de avaliação e tratamento do zumbido — Fotobiomodulação, Neuromodulação, Estimulação Vagal e mais — em 8 módulos, com 2 lives de tira-dúvidas. Pelo menor preço do ano.

Evitar a expressão “tratar zumbido de verdade” quando ela sugerir promessa de resultado. Preferir “conduzir”, “avaliar”, “aplicar protocolos” e “modular”.

### 8.2 Seções

- Barra sticky: selo Black, preço, prazo e contador.
- Hero: selo, headline, subheadline, bloco de preço, CTA padronizado, microcopy de garantia/prazo e prova social.
- Dor: manter a narrativa, removendo início de turma.
- Virada: substituir terapia manual, laser e mindfulness pelos termos da nova oferta.
- Para quem é/não é: atualizar para 8 módulos e explicitar gravado + 2 lives.
- Transformação: alinhar resultados aos 8 módulos; remover precificação, mentoria e itens não confirmados.
- Módulos: renderizar os 8 nomes abaixo, na ordem exata.
- Bônus: remover mentoria, salvo decisão explícita; criar bloco próprio para 2 lives.
- Bio: remover referência à primeira turma e confirmar qualquer afirmação de exclusividade.
- Oferta: listar o que está incluso e preço único derivado da configuração.
- Garantia: 7 dias a partir da compra, condicionada à confirmação comercial.
- FAQ: reescrever formato, equipamento, agenda, lives, compra avulsa, parcelamento, garantia, prazo e regra para ex-alunas.
- CTA final: urgência por prazo, preço e CTA igual aos demais.

### 8.3 Módulos oficiais

1. Avaliação
2. Fotobiomodulação
3. Neuromodulação
4. Neuromodulação Trigeminal
5. Treinamento Auditivo e Zumbido
6. Estimulação Vagal
7. Motricidade Orofacial e Zumbido
8. Aconselhamento

Cada card deve conter título, ícone e uma descrição de 1–2 linhas com “o que aprende + resultado prático”. Os textos dos módulos removidos não devem permanecer em descrições, FAQ, bio ou metadados.

## 9. UI/UX e componentes

### 9.1 Tokens visuais

Adicionar tokens de campanha em `app/globals.css` ou arquivo equivalente:

- Fundo principal: `#05070D`–`#0A1020`.
- Fundo alternado: `#0D1424`.
- Superfície: `#101A2E`.
- Dourado: `#D4AF37`.
- Dourado claro: `#F5D77A`.
- Texto principal: `#F2F4F8`.
- Texto secundário: `#A9B4C6`.
- Urgência: âmbar/vermelho usado apenas em prazo e último dia.
- Sucesso/garantia: `#3DDC97`.

Manter no máximo duas famílias tipográficas e garantir `font-display: swap`.

### 9.2 Componentes novos ou evoluídos

- `Countdown`: prazo com fuso fixo, estado ativo, último dia e encerrado; nunca exibir contador zerado como se a oferta ainda estivesse ativa.
- `PriceBlock`: âncora, preço, parcela, economia e CTA usando a mesma fonte de dados.
- `ModuleCard`: ícone, número, título, descrição e estado de expansão acessível.
- `LiveBonus`: duas lives, data/hora, selo de bônus e, opcionalmente, adicionar ao calendário.
- `StickyBar`: desktop com preço/prazo/contador e CTA compacto.
- `StickyMobileCta`: aparece após o hero e desaparece ao entrar no bloco de oferta.
- `GuaranteeBlock`: escudo, texto curto e cor de segurança.
- `FaqSection`: múltiplas perguntas abertas, respostas presentes no DOM e eventos de abertura.

### 9.3 Ordem da página

1. Barra sticky
2. Hero
3. Identificação
4. Tese
5. Para quem é/não é
6. O que a pessoa saberá
7. 8 módulos
8. Bônus: 2 lives
9. Bio
10. Oferta
11. Garantia
12. FAQ
13. CTA final
14. Rodapé

## 10. Prazo e estados

Implementar estados explícitos:

| Estado | Regra | UI |
|---|---|---|
| Ativa | Antes de `2026-11-30T23:59:59-03:00` | Preço Black, contador e CTAs Black |
| Último dia | Data local de 30/11 | Textos “termina hoje” e urgência reforçada |
| Encerrada | Depois do prazo | Comportamento definido em `expiredBehavior`; nunca manter preço Black ativo |

O checkout precisa validar a expiração no servidor. O teste de data deve cobrir antes do prazo, exatamente no limite, durante o último dia e depois do prazo.

## 11. Tracking

Manter os eventos existentes e adicionar eventos customizados:

- `view_black_page`
- `click_cta_hero`
- `click_cta_modulos`
- `click_cta_oferta`
- `click_cta_final`
- `click_cta_sticky_mobile`
- `initiate_checkout`
- `faq_open` com identificador da pergunta
- `scroll_depth` em 25/50/75/100%
- `purchase` quando houver confirmação confiável

Todos os CTAs devem preservar UTMs e `utm_campaign=black_november`. O tracking deve respeitar consentimento quando aplicável.

## 12. Acessibilidade e performance

- Contraste mínimo AA, especialmente em texto pequeno.
- Contador com `aria-live="off"` e texto estático de validade.
- Acordeões como `button`, com `aria-expanded` e `aria-controls`.
- Ícones decorativos com `aria-hidden="true"` e imagens informativas com `alt`.
- Foco visível em dourado.
- Respeitar `prefers-reduced-motion`.
- Alvos de toque mínimos de 44×44px.
- Testar 360px, 390px, 768px, 1024px e 1280px.
- Usar CSS/SVG para brilhos e ícones; lazy-load abaixo da dobra.
- Meta de LCP inferior a 2,5s em mobile 4G.

## 13. Arquivos prováveis

### Modificar

- `app/(campaigns)/zumbido-na-pratica/config.ts`
- `app/(campaigns)/zumbido-na-pratica/content.ts`
- `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx`
- `app/globals.css`
- `components/campaign/hero.tsx`
- `components/campaign/module-cards.tsx`
- `components/campaign/price-card.tsx`
- `components/campaign/faq-section.tsx`
- `components/ui/countdown-timer.tsx`
- `components/ui/sticky-bar.tsx`
- `components/ui/sticky-mobile-cta.tsx`
- `lib/campaign-phase.ts`
- `lib/tracking.ts`

### Criar, se necessário

- `components/campaign/live-bonus.tsx`
- `components/campaign/price-block.tsx`
- `components/campaign/black-november-countdown.tsx`
- `lib/black-november.ts`
- testes para campanha, contador, transição de estados, módulos, FAQ e tracking

## 14. Critérios de aceite

- [ ] A rota não menciona Turma 4, datas de setembro ou primeiro fim de semana.
- [ ] Não aparecem 10 módulos, 7 protocolos, mindfulness, processamento cognitivo, módulo empreendedor, Laserpuntura ou mentoria sem confirmação.
- [ ] Os 8 módulos aparecem na ordem oficial e com nomenclatura consistente.
- [ ] Preço, âncora, parcelas e economia são idênticos em barra, hero, oferta, CTA final e CTA mobile.
- [ ] Todos os CTAs usam o mesmo destino Black e preservam UTMs.
- [ ] O contador usa `America/Fortaleza`, funciona em Safari/iOS e não fica zerado após expirar.
- [ ] O estado encerrado impede a manutenção acidental do preço promocional.
- [ ] As 2 lives mostram datas e horários confirmados.
- [ ] FAQ esclarece gravado versus ao vivo, equipamentos, prazo, garantia e compra avulsa.
- [ ] A garantia é compatível com o formato gravado.
- [ ] Eventos de tracking possuem posição e nome da campanha.
- [ ] Testes, lint e build passam.
- [ ] A página é validada nos cinco breakpoints definidos e por teclado.

## 15. Ordem recomendada de execução

1. Fechar decisões comerciais e copy pendente.
2. Criar modelo único da oferta e testes de estado/prazo.
3. Atualizar conteúdo e módulos.
4. Implementar tokens e componentes visuais Black.
5. Atualizar a composição da página.
6. Implementar tracking e UTMs.
7. Validar acessibilidade, responsividade, performance e checkout.
8. Rodar testes, lint, build e revisão final da copy.
