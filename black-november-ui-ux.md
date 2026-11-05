# Black November Zumbido na Prática — Guia de UI/UX

Briefing de design e experiência para transformar `/zumbido-na-pratica/vendas` em uma página de **Black November** (até 30/11). Nada foi alterado na página: este arquivo só descreve o que precisa mudar. Para a copy de cada seção, ver `black-november-copy.md`.

Referência visual: a arte oficial dos módulos (fundo azul-marinho/preto, dourado, ícones em linha dourada, cards com borda fina e brilho).

---

## 1. Direção visual

**Conceito:** premium e sofisticado, não "liquidação gritante". Preto profundo + dourado, alinhado à identidade da arte dos módulos, com um acento de urgência controlado.

### Paleta (propostas — validar com o código atual)

| Uso | Cor sugerida | Observação |
|-----|--------------|------------|
| Fundo principal | `#05070D` a `#0A1020` (preto azulado) | A arte oficial é azul-marinho muito escuro, não preto puro |
| Fundo de seções alternadas | `#0D1424` | Cria ritmo sem perder o clima Black |
| Cards/superfícies | `#101A2E` com borda `rgba(212,175,55,.35)` | Replica o card dos módulos |
| Dourado principal | `#D4AF37` | Títulos de destaque, bordas, ícones |
| Dourado claro (gradiente) | `#F5D77A` → `#B8860B` | Para títulos grandes e botões |
| Texto principal | `#F2F4F8` | Contraste alto sobre fundo escuro |
| Texto secundário | `#A9B4C6` | Mínimo AA sobre o fundo |
| Urgência/prazo | `#FF3B3B` ou âmbar `#FFB020` | Só para contador e "termina hoje"; usar com parcimônia |
| Sucesso/garantia | `#3DDC97` | Selo de garantia |

### Tipografia
- Títulos: serifada de display (a arte usa uma serifada marcante no "CURSO") ou a fonte de marca atual, em **dourado com gradiente sutil**.
- Subtítulos/etiquetas: sans-serif em **caixa alta com espaçamento de letras** (como "MÓDULOS DO").
- Corpo: manter a fonte atual, tamanho mínimo 16px no mobile.
- Evitar mais de 2 famílias.

### Elementos gráficos
- Brilho/linhas douradas no canto superior (como na arte) como detalhe de hero.
- Bordas finas douradas com leve *glow* nos cards.
- Logo "Zumbido na Prática" (orelha dourada) no header, em versão dourada sobre escuro.
- Selo `BLACK NOVEMBER` reutilizável (hero, barra, oferta, CTA final).

---

## 2. Estrutura da página (ordem recomendada)

1. **Barra sticky de oferta** (topo, com contador)
2. **Hero** (headline + preço + CTA + selo)
3. Identificação ("Você já teve esse paciente")
4. Tese ("O zumbido não está no ouvido")
5. Para quem é / não é
6. O que você vai saber
7. **Módulos** (8 cards)
8. **Bônus: 2 lives** (destaque próprio)
9. Bio da especialista
10. **Bloco de oferta** (preço, o que inclui, CTA)
11. Garantia
12. FAQ
13. CTA final com contador
14. Rodapé

> Mudança estrutural em relação a hoje: **mover o preço para cima (hero)** e criar **um bloco de bônus separado**. O CTA aparece pelo menos 4 vezes (hero, após módulos, oferta, final) + botão fixo no mobile.

---

## 3. Componentes — o que construir/alterar

### 3.1 Barra sticky de oferta
- Fundo dourado em gradiente ou preto com borda dourada inferior.
- Conteúdo: selo + preço + **contador regressivo (dias:horas:min:seg)** + botão compacto.
- Hoje já existe contador; **trocar a data-alvo para 30/11/2026 23:59 (America/Fortaleza)** e usar o fuso fixo, não o do navegador, para todos verem o mesmo prazo.
- Comportamento quando expirar: **não** apresentar "zerado" em loop. Definir estado pós-prazo (ver seção 6).
- Mobile: texto em 1 linha + botão; esconder o contador de segundos se faltar espaço.

### 3.2 Hero
- Layout desktop: texto à esquerda, bloco de preço/oferta à direita (ou abaixo, em mobile).
- Selo `BLACK NOVEMBER` acima do H1.
- H1 em branco com a parte-chave ("não tem cura, vamos aprender a conviver") em dourado.
- **Bloco de preço**: preço antigo riscado, preço Black em destaque grande (dourado), parcelamento menor, linha de economia.
- Botão primário dourado com leve brilho. Microcopy de garantia/prazo logo abaixo.
- Prova social (65+ profissionais) como linha discreta sob o CTA.

### 3.3 Seção de módulos (principal ativo visual)
Reproduzir a arte enviada como componente nativo (HTML/CSS), **não** como imagem única, por acessibilidade, SEO e responsividade.

- Lista vertical de **8 cards**, mesma ordem da arte.
- Cada card: ícone dourado à esquerda, divisor vertical dourado, título em caixa alta; **expandir** para mostrar 1–2 linhas de descrição (acordeão ou hover/tap).
- **Aconselhamento** (último card) com destaque maior, como na arte (card mais largo e com brilho).
- Numeração opcional (01–08) em dourado discreto.
- Ícones: reaproveitar os da arte exportando em SVG (prancheta/lupa, caneta laser, cérebro, nervo trigeminal, orelha com onda, sistema vagal, cabeça/mandíbula, balões de conversa). Se só existir a imagem, pedir ao designer o pack em SVG.
- Mobile: cards em coluna única, ícone menor, texto quebrando em 2 linhas como na arte.

### 3.4 Bloco de bônus — 2 lives
- Seção própria com visual diferente (card dourado cheio ou borda animada).
- Ícone de "ao vivo" (ponto pulsante), `LIVE 1` e `LIVE 2` com **data e horário**.
- Botão "Adicionar ao calendário" (opcional, aumenta presença).
- Etiqueta: `BÔNUS EXCLUSIVO BLACK`.

### 3.5 Bloco de oferta (empilhamento de valor)
- Tabela/lista "O que você leva" com check dourado.
- Preço antigo riscado → preço Black → parcelamento → economia.
- Contador repetido **dentro do card** de oferta.
- Botão grande com largura total no mobile.
- Selo de garantia (ícone de escudo, em verde) ao lado ou abaixo.

### 3.6 Garantia
- Card próprio, ícone de escudo, texto curto. Evitar enterrar no rodapé: é redutor de risco no ponto de decisão.

### 3.7 FAQ
- Acordeão (manter), com tema escuro, seta dourada.
- **Problema atual:** respostas só existem quando abertas, o que dificulta leitura em automação/SEO. Se possível, renderizar o texto no DOM (ocultado por CSS) em vez de montar só ao abrir.
- Permitir abrir mais de uma pergunta por vez.

### 3.8 CTA final
- Fundo com brilho dourado, contador grande, preço e botão.
- Estado diferente no dia 30/11 ("ÚLTIMO DIA").

### 3.9 Botão fixo no mobile
- Barra inferior fixa com preço + botão `Quero entrar na Black`, aparecendo após o hero e escondendo-se quando o bloco de oferta estiver visível.

---

## 4. Responsividade
- Prioridade **mobile-first** (tráfego do Instagram é majoritariamente mobile).
- Breakpoints mínimos: 360px, 768px, 1024px, 1280px.
- Hero em coluna única no mobile: selo → H1 → sub → preço → CTA.
- Alvos de toque ≥ 44×44px.
- Contador: em 360px, mostrar dias/horas/min (sem segundos) ou reduzir tipografia.

---

## 5. Acessibilidade
- Contraste mínimo AA: dourado `#D4AF37` sobre `#0A1020` passa em textos grandes; **não** usar dourado fino para texto pequeno de corpo.
- Não depender só de cor para urgência (usar texto: "Termina em…").
- Contador com `aria-live="off"` (evitar leitura por segundo) e texto estático de apoio: "Oferta válida até 30/11 às 23:59".
- Acordeões com `button`, `aria-expanded` e `aria-controls`.
- Ícones decorativos com `aria-hidden="true"`; imagens informativas com `alt`.
- Respeitar `prefers-reduced-motion`: desativar brilho pulsante/animações quando solicitado.
- Foco visível em dourado nos botões e links.

---

## 6. Estados e regras de negócio da página

| Estado | Quando | Comportamento |
|--------|--------|---------------|
| Pré-Black (opcional) | antes do início | Só se houver data de abertura |
| Black ativa | até 30/11 23:59 | Página completa com contador |
| Último dia | 30/11 | Barra e CTA mudam de texto ("Termina hoje") e cor de urgência |
| **Encerrada** | após 30/11 23:59 | **Decidir:** (a) página volta ao preço normal automaticamente, (b) vai para lista de espera, ou (c) redirect para a Turma regular. **Não** deixar o contador negativo/zerado com preço antigo ativo |

- O encerramento deve ser feito **no servidor/checkout**, não só no front. Se só o contador acabar, quem recarregar a página ainda pode comprar com o preço Black.
- Prazo em fuso fixo (America/Fortaleza, UTC-3).

---

## 7. Checkout e rastreamento

- Todos os botões levam ao **mesmo link de checkout** com o preço/cupom Black.
- Checkout deve exibir: nome da oferta (Black November), preço, parcelamento, garantia.
- Eventos de analytics sugeridos (pixel/GA4/Meta):
  - `view_black_page`
  - `click_cta_hero`, `click_cta_modulos`, `click_cta_oferta`, `click_cta_final`, `click_cta_sticky_mobile`
  - `initiate_checkout`, `purchase`
  - `faq_open` (qual pergunta)
  - `scroll_depth` (25/50/75/100%)
- UTMs preservados (`utm_source`, `utm_campaign=black_november`) até o checkout.
- Garantir que a página só carrega scripts de tracking após consentimento (se aplicável ao site).

---

## 8. Desempenho
- Fundos/brilhos com CSS (gradientes), não imagens pesadas.
- Ícones em SVG inline ou sprite.
- Fontes com `font-display: swap`, no máximo 2 famílias.
- Lazy-load para imagens abaixo da dobra.
- Meta: LCP < 2,5s no mobile 4G.

---

## 9. Metadados e compartilhamento
- `<title>` e meta description com "Black November".
- Imagem Open Graph no padrão preto/dourado com `BLACK NOVEMBER`.
- Favicon: orelha dourada.

---

## 10. Entregáveis sugeridos (para quem for implementar)

1. Tokens de design (cores, tipografia, espaçamentos) em arquivo único.
2. Componente `Countdown` (fuso fixo, estados pré/ativo/último dia/encerrado).
3. Componente `ModuleCard` + lista de 8 módulos (dados em array, não hard-coded).
4. Componente `PriceBlock` (preço antigo, preço Black, parcelas, economia) alimentado por **uma única fonte de valores** — evita inconsistência entre barra, hero, oferta e CTA final.
5. Componente `LiveBonus` (2 lives com data/hora).
6. Barra sticky desktop + barra fixa mobile.
7. Ajuste do FAQ (conteúdo no DOM, abrir múltiplos).
8. Versões da barra/CTA para o "último dia".

---

## 11. Checklist de QA

- [ ] Todas as cores e fontes vêm dos tokens (nada hard-coded)
- [ ] Contador aponta para 30/11/2026 23:59 (America/Fortaleza) e funciona em Safari/iOS
- [ ] Preço e parcelas idênticos em barra, hero, oferta e CTA final
- [ ] 8 módulos na ordem da arte, com nomes idênticos
- [ ] 2 lives com data/hora corretas
- [ ] Contraste AA verificado nos textos pequenos
- [ ] Navegação por teclado funcional (menu, acordeões, botões)
- [ ] Testado em 360px, 390px, 768px, 1280px
- [ ] Botão fixo mobile aparece/esconde corretamente
- [ ] Todos os CTAs levam ao checkout Black com UTMs preservados
- [ ] Estado "encerrada" validado no servidor/checkout
- [ ] Eventos de analytics disparando
- [ ] LCP e CLS dentro da meta
