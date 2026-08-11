# Design — Redesign Visual da Página de Vendas (Zumbido na Prática)

## Contexto

Autoria original desta spec: fornecida pelo usuário (Gabriel), completa e detalhada, cobrindo o sistema visual da página `/zumbido-na-pratica/vendas` — não repete a copy (está em `pagina-vendas.md` / `content.ts`), cobre tokens, componentes, layout mobile-first e o elemento de assinatura da página.

**Diagnóstico do problema atual:** a página usa o mesmo padrão de bloco em todas as dobras (texto centralizado ou accordion, fundo único), então nada se destaca visualmente. Esta spec resolve isso com: um elemento de assinatura que atravessa a página inteira, alternância de fundo entre seções de leitura e seções de prova/conversão, e substituição de placeholders cinzas por conteúdo real ou elementos editoriais.

**Nota de investigação (verificação no código atual, feita antes de aprovar a spec):** o bug relatado de "fonte cursiva/ilegível sobrepondo o texto real" na dobra Dor não foi reproduzido — `app/(campaigns)/zumbido-na-pratica/vendas/page.tsx` renderiza o parágrafo com `text-lg text-brand-text/80`, sem nenhuma classe serifada/cursiva, e não há declaração de `font-family` cursiva em `globals.css` nem em nenhum componente do projeto. Se o bug for reproduzível numa sessão específica do navegador, precisa de mais detalhes (print/URL) para investigar; caso contrário, não há correção de código a fazer para esse item.

**Stack disponível no projeto (confirmado antes de aprovar):** Next.js 15 App Router, Tailwind CSS v4, `next/font/google` já em uso (Inter). `framer-motion` **não está instalado** — conforme a própria spec já prevê ("se o projeto já usa framer-motion... senão, CSS puro"), o elemento de assinatura usa CSS puro (`animation-timeline: view()` como progressive enhancement, com fallback estático), não framer-motion. `Fraunces` também não está instalado — será adicionado via `next/font/google`, mesmo padrão do Inter atual.

---

## 1. Tokens de design

### 1.1 Cor

```css
:root {
  /* Base */
  --color-ink: #0F3D3E;        /* petróleo profundo — fundo de seções de prova/conversão, texto de destaque */
  --color-ink-light: #17514F;  /* variação para hover/bordas sobre --ink */
  --color-cream: #FAF7F1;      /* fundo das seções de leitura */
  --color-white: #FFFFFF;

  /* Acento */
  --color-coral: #FF5A3C;      /* CTA primário, elementos de urgência */
  --color-coral-dark: #E14B2F; /* hover do CTA */
  --color-coral-tint: #FFE9E3; /* fundo suave para badges/tags */

  /* Texto */
  --color-text-primary: #17211F;
  --color-text-secondary: #52605D;
  --color-text-on-ink: #F3F1EA;
  --color-text-on-ink-secondary: #A9BDBB;

  /* Suporte */
  --color-border: #E4DFD3;
  --color-success: #2F7A5C;
  --color-warning-bg: #FDF3E4;
  --color-warning-text: #8A5A1C;
}
```

**Regra de uso:** seções de leitura (Dor, Virada, Para quem é, Transformação) usam `--color-cream` com texto `--color-text-primary`. Seções de prova e decisão (Prova Social, Oferta, Preço, CTA final) usam `--color-ink` com texto `--color-text-on-ink` — é essa alternância que dá ritmo à rolagem, hoje inexistente.

**Nota de implementação:** estes tokens são específicos da campanha `zumbido-na-pratica` (não do design system global do domínio) — o projeto já tem tokens de marca em `app/globals.css` (`--color-brand-*`) usados por outras páginas/campanhas futuras. Os novos tokens acima serão adicionados como tokens adicionais (namespace `--color-ink`, `--color-cream`, `--color-coral`, etc.) sem remover os `--color-brand-*` existentes, para não quebrar componentes genéricos de `/components/ui` reutilizados por outras páginas (obrigado, quiz, privacidade). Componentes específicos desta página usam os novos tokens; componentes verdadeiramente compartilhados continuam neutros.

### 1.2 Tipografia

Dois papéis, não mais:

- **Display** (headlines, números de destaque): "Fraunces" (Google Fonts, variável, pesos 400-700). Uso: H1, H2, número "65+", preço.
- **Corpo** (tudo mais): "Inter" (já em uso no projeto). Uso: parágrafos, labels, botões, FAQ.

```css
--font-display: "Fraunces", Georgia, serif;
--font-body: "Inter", system-ui, sans-serif;
```

**Escala (mobile-first, rem):**

| Papel | Mobile | Desktop (≥1024px) | Peso |
|---|---|---|---|
| H1 (hero) | 1.75rem / 1.25 | 2.75rem / 1.15 | 600 |
| H2 (seção) | 1.375rem / 1.3 | 1.875rem / 1.25 | 600 |
| Número de destaque (65+, preço) | 2.25rem | 3rem | 700 |
| Corpo | 1rem / 1.6 | 1.0625rem / 1.65 | 400 |
| Label/eyebrow | 0.8125rem, uppercase, tracking 0.04em | mesmo | 500 |

### 1.3 Espaçamento e raio

```css
--radius-card: 16px;
--radius-button: 10px;
--space-section-mobile: 3rem;   /* padding vertical entre dobras no mobile */
--space-section-desktop: 5.5rem;
```

---

## 2. Elemento de assinatura — "a linha da via auditiva"

Um traço fino (SVG, stroke) que nasce como um ícone de ouvido/onda sonora no hero, desce acompanhando a rolagem da página, e termina como um padrão neural (pontos conectados) na seção "Sou [Nome], neurocientista". Materializa a frase central do produto — "o zumbido não está no ouvido, está no cérebro" — como imagem, não só como texto.

**Implementação:**
- `components/campaign/auditory-pathway.tsx` (namespace do projeto: `components/campaign`, não um `components/` genérico na raiz) — um único `<svg>` `position: absolute`, atrás do conteúdo, com um `<path>` seguindo a coluna central da página (curva suave).
- **Fase 1 (deste ciclo):** traço estático, visível, sem animação de scroll.
- **Fase 2 (não bloqueante, ciclo futuro):** progresso do traço via `stroke-dasharray`/`stroke-dashoffset`, animado com CSS `animation-timeline: view()` como progressive enhancement (sem framer-motion, que não está instalado), com fallback estático total para navegadores sem suporte e para `prefers-reduced-motion: reduce`.
- No mobile, o traço é mais sutil (menor opacidade, `stroke-width: 1.5`) — textura de fundo, não protagonista.
- Nos pontos-chave (fim do hero, dobra "Virada", módulo 5 "Neuromodulação"), o traço ganha um nó/círculo destacado em `--color-coral`.

---

## 3. Especificação por seção (mobile-first)

Convenção: `<= 767px` é o layout base; anotações `@desktop` (`≥1024px`) indicam o que muda.

### 3.1 Barra de urgência (sticky top)
Já existe como `StickyBar` (`components/ui/sticky-bar.tsx`) — ajustar estilo: `position: sticky; top: 0; z-index: 50`, fundo `--color-ink`, texto `--color-text-on-ink`, altura 36px, `font-size: 0.75rem`. Contador regressivo em `--color-coral`.

### 3.2 Hero
- Fundo `--color-cream`.
- Ordem mobile: eyebrow (badge "Lote 1 até 13/08") → H1 → subheadline → foto ou vídeo real da Expert (nunca placeholder cinza — se o vídeo não estiver pronto, foto estática dela com play button sobreposto; **na ausência de foto real, manter o padrão atual de `VideoEmbed` com placeholder editorial, não cinza técnico**) → CTA → linha de prova social.
- Imagem: `aspect-ratio: 4/5` no mobile, `border-radius: var(--radius-card)`.
- CTA: full-width no mobile, fundo `--color-coral`, texto branco, `padding: 14px`, `border-radius: var(--radius-button)`.
- `@desktop`: grid de 2 colunas (texto à esquerda, imagem à direita, `aspect-ratio: 3/4`), H1 em `--font-display` grande.

### 3.3 Dor
- Fundo `--color-cream`.
- Estrutura (mapeando os 5 parágrafos existentes em `dorContent.paragraphs`): parágrafo 1 ("Você já teve esse paciente.") = frase de abertura isolada, `font-size: 1.25rem`, `font-family: var(--font-display)`, centralizada, largura máxima `20ch`. Parágrafos 2-4 = bloco em corpo normal, alinhado à esquerda, não centralizado. Parágrafo 5 ("Eu sei, porque eu também dizia isso.") = frase de fechamento isolada, mesmo tratamento do primeiro.
- `gap: 2rem` entre os 3 blocos no mobile.

### 3.4 Virada (explicação central)
- Fundo `--color-cream`, com um card de destaque `--color-white`, borda `1px solid var(--color-border)`, `border-radius: var(--radius-card)`, `padding: 1.5rem`.
- Dentro do card: título curto + diagrama simples (ouvido → seta → cérebro, usando o traço da assinatura como base) + texto.
- Ponto de maior contraste da seção clara.

### 3.5 Para quem é / não é
- Mobile: empilhado (não lado a lado). "É pra você" primeiro, "Não é pra você" depois, fundo levemente diferenciado (`--color-white` vs `--color-cream` com borda).
- Ícone de check `--color-success`, ícone de X `--color-text-secondary` (não vermelho).
- `@desktop`: lado a lado, 2 colunas.

### 3.6 Transformação
- Fundo `--color-cream`.
- Lista com ícone de check em `--color-coral` (não cinza/neutro).

### 3.7 Módulos
- Fundo `--color-white`.
- Substituir o accordion plano (`ModuleAccordion` atual) por cards numerados: número/badge à esquerda (`--color-ink` para módulos 1-4 e 6-7, `--color-coral` para o módulo 5 "Neuromodulação"), título + 1 linha de descrição sempre visível (não escondida atrás do accordion), chevron para expandir detalhe adicional se houver.
- Cards de bônus (Mentoria, Empresarial, Tráfego) com fundo `--color-coral-tint`, visualmente diferenciados dos 7 módulos.
- Upsell (Avaliação) com borda tracejada ou tag "disponível como adicional".
- **Nota de compatibilidade:** `modulosContent` (`content.ts`) já tem os campos `isBonus`/`isUpsell`/`number` necessários — o redesign é só de apresentação (`ModuleAccordion` → novo componente `ModuleCards`), sem mudança de dados.

### 3.8 Quem ensina
- Fundo `--color-ink`, texto `--color-text-on-ink`.
- Foto real da Expert, tamanho generoso (não avatar pequeno). Na ausência de foto real, manter tratamento editorial (não placeholder cinza técnico).
- Bio curta + 2-3 credenciais em badge (`--color-ink-light` de fundo, texto `--color-text-on-ink`).

### 3.9 Prova social
- Fundo `--color-ink`, contínuo com "Quem ensina" (bloco visual único de autoridade + prova).
- Número "65+" em destaque, `--font-display`, antes dos vídeos.
- Vídeos: enquanto não houver depoimento gravado, não usar caixa cinza vazia. Opção adotada: card com foto da Expert + citação de texto curta no lugar do vídeo (placeholder editorial). Quando os vídeos chegarem: thumbnail real, `object-fit: cover`, ícone de play sobreposto.

### 3.10 Oferta e bônus
- Fundo `--color-cream`.
- Lista em formato de "recibo": ícone de check + item + (se aplicável) valor riscado à direita.
- Item de maior valor percebido (Mentoria de Primeiros Pacientes) no topo, com leve destaque.

### 3.11 Preço e lotes
- Fundo `--color-white`, card único centralizado com `box-shadow` sutil (única sombra da página).
- Preço em `--font-display`, valor anterior riscado acima em `--color-text-secondary`.
- CTA full-width, mesmo estilo do hero.

### 3.12 Garantia
- Fundo `--color-cream`, bloco compacto, ícone de escudo `--color-success`.

### 3.13 FAQ
- Fundo `--color-white`.
- Accordion (único da página, já que Módulos deixa de usar esse padrão) — item ativo com borda esquerda `--color-coral`.

### 3.14 CTA final
- Fundo `--color-ink`, texto `--color-text-on-ink`.
- CTA em `--color-coral`, full-width mobile.

---

## 4. CTA fixo (sticky bottom, mobile only)

Elemento novo, crítico para conversão mobile:

- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50`.
- Aparece via `IntersectionObserver` depois que o hero sai da tela.
- Conteúdo: preço atual + botão "Garantir vaga", em uma linha, fundo `--color-white`, `box-shadow` para cima, `border-top: 1px solid var(--color-border)`.
- Desaparece (ou vira estático) ao chegar na seção de Preço (3.11).
- `padding-bottom` equivalente à altura da barra precisa ser adicionado ao final da página, para o CTA final (3.14) não ficar coberto.
- **Fonte de preço:** deve usar o mesmo `currentLote` (via `getCurrentLote`) já computado em `vendas/page.tsx`, para nunca divergir do preço mostrado na `StickyBar`/`PriceCard` — mesma regra de single-source-of-truth já usada no resto da página.

---

## 5. Ordem de implementação

1. Tokens de cor e tipografia (seção 1) — base para tudo.
2. Investigação do bug de fonte na dobra Dor (concluída nesta spec — não reproduzido no código; sem ação necessária a menos que reproduzido com mais detalhes).
3. Alternância de fundo cream/ink entre seções.
4. Cards de módulo substituindo o accordion (seção 3.7).
5. CTA fixo mobile (seção 4).
6. Elemento de assinatura — versão estática (seção 2, Fase 1).
7. Substituição dos placeholders de vídeo (seção 3.9) — depende de depoimentos/gravação da Expert, fora do escopo de código puro.
8. Animação de scroll do traço de assinatura (seção 2, Fase 2) — refinamento não bloqueante.

## Fora de escopo deste ciclo

- Gravação/edição de vídeos reais (depoimentos, Expert).
- Fase 2 do elemento de assinatura (animação de scroll) — implementada em ciclo futuro.
- Mudança de copy (já coberta por `pagina-vendas.md`/`content.ts`, inalterada por esta spec).
- Redesign das páginas de obrigado/quiz/privacidade (fora do escopo, que é só `/zumbido-na-pratica/vendas`).
