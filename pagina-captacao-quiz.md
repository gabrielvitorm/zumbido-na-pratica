# Página de Captação — Quiz de Diagnóstico

Formato: uma pergunta por tela, estilo Typeform. Diferente da página de vendas, o objetivo aqui **não é vender direto** — é elevar consciência de problema e capturar contato qualificado. A venda acontece depois, no grupo/e-mail que essa pessoa entra.

**Use esse quiz para:** captar gente nova para o grupo de WhatsApp da **aula aberta do dia 18/08** (ver `/plano-acoes-carrinho.md`), ou como porta de entrada paralela durante todo o carrinho.

**Voz:** 1ª pessoa, na voz da Expert — o quiz parece uma conversa com ela, não um formulário.

---

## Lógica do funil

```
Tela 0 — Capa (promessa do quiz)
  ↓
Tela 1-5 — Perguntas de diagnóstico (sobem consciência)
  ↓
Tela 6 — Captura de contato (nome + WhatsApp)
  ↓
Tela 7 — Resultado personalizado (por faixa de pontuação)
  ↓
CTA final → grupo de WhatsApp da aula OU direto para a página de vendas
```

**Regra de ouro do formato quiz:** cada pergunta precisa, sozinha, fazer a pessoa pensar "eu não sei responder isso" ou "eu faço errado isso". Pergunta de diagnóstico não é pesquisa de opinião — é confronto gentil com a própria lacuna.

---

## Estrutura técnica geral

- Barra de progresso no topo (aumenta conclusão — pessoa vê que falta pouco)
- Botão "Voltar" discreto em cada tela
- Sem scroll dentro da tela — cada pergunta ocupa a tela inteira, transição por clique/toque
- Avança automaticamente ao clicar na opção (não precisa de botão "próximo" separado nas perguntas de múltipla escolha)
- As respostas alimentam uma pontuação simples (ver tabela na Tela 7) — pode ser calculado em JS puro no client, não precisa de backend além de salvar o lead

---

## Tela 0 — Capa

### Função
Promessa do quiz + motivo para a pessoa investir 2 minutos respondendo.

### Copy

> **Você sabe tratar zumbido de verdade — ou está só "aprendendo a conviver" junto com o paciente?**
>
> Responda 5 perguntas rápidas e descubra em que nível está sua conduta clínica pra zumbido.
>
> Leva 2 minutos.
>
> [BOTÃO: Começar]

---

## Tela 1

### Função
Pergunta de abertura fácil — ninguém abandona um quiz na primeira pergunta, então ela serve pra "comprometer" a pessoa a continuar.

### Copy

> **Com que frequência chega paciente com zumbido no seu consultório?**
>
> ( ) Quase todo mês
> ( ) De vez em quando
> ( ) Raramente, mas quando chega eu fico sem saber o que fazer
> ( ) Ainda não atendo, mas quero me preparar

---

## Tela 2

### Função
Primeira pergunta de confronto — expõe a lacuna de conduta sem acusar.

### Copy

> **Quando o exame do paciente vem normal, mas o zumbido continua, você sabe explicar por quê?**
>
> ( ) Sim, sei explicar com segurança
> ( ) Mais ou menos, mas não consigo explicar com clareza pro paciente
> ( ) Não sei — e confesso que isso me incomoda

---

## Tela 3

### Função
Testa se a pessoa sabe diferenciar protocolos — a maioria não vai saber, e é exatamente isso que o curso resolve.

### Copy

> **Você sabe quando indicar Laserterapia em vez de Neuromodulação para um caso de zumbido?**
>
> ( ) Sim, tenho critério claro pra isso
> ( ) Eu uso sempre a mesma abordagem, não importa o caso
> ( ) Não sei diferenciar quando usar cada uma

---

## Tela 4

### Função
Pergunta emocional — mede o desconforto real da profissional, não só o conhecimento técnico. Isso é o que vai justificar a urgência na hora do resultado.

### Copy

> **Como você se sente quando um paciente de zumbido volta e diz que não melhorou nada?**
>
> ( ) Frustrada, sem saber o próximo passo
> ( ) Incomodada, mas sigo o protocolo que conheço
> ( ) Tranquila, sei ajustar a conduta

---

## Tela 5

### Função
Pergunta final, de intenção — separa quem só está curioso de quem tem urgência real de resolver isso.

### Copy

> **Se você tivesse um protocolo estruturado e testado pra zumbido, o que mudaria primeiro no seu consultório?**
>
> ( ) Eu pararia de encaminhar tanto paciente pra outros profissionais
> ( ) Eu cobraria mais pelo meu atendimento, porque teria mais segurança
> ( ) Eu simplesmente dormiria mais tranquila sabendo o que fazer

---

## Tela 6 — Captura de contato

### Função
A pessoa já respondeu 5 perguntas e está investida — é o melhor momento pra pedir o contato, porque ela quer ver o resultado.

### Estrutura técnica
- Campo nome (obrigatório)
- Campo WhatsApp (obrigatório, com máscara de formato brasileiro)
- Campo e-mail (opcional, se você quiser rodar e-mail em paralelo)
- Checkbox de consentimento (LGPD) — obrigatório, com link para política de privacidade

### Copy

> **Só mais um passo pra ver seu resultado**
>
> Quero te mandar o diagnóstico completo e, se fizer sentido, o convite pra uma aula ao vivo gratuita sobre o assunto.
>
> Nome: [____]
> WhatsApp: [____]
>
> [BOTÃO: Ver meu resultado]
>
> *Seus dados estão seguros e não serão compartilhados.*

---

## Tela 7 — Resultado personalizado

### Função
Entrega o "prêmio" prometido e converte a pontuação em urgência — sem soar como venda direta ainda. O CTA leva para o grupo de WhatsApp da aula aberta (ideal, porque cria outro ponto de contato antes da venda) ou direto pra página de vendas, se for perto do fim do carrinho.

### Lógica de pontuação

Cada resposta vale pontos (a mais insegura = mais pontos). Some as 5 respostas:

| Faixa | Perfil |
|---|---|
| 0-4 pontos | **Já tem base, mas pode ir além** |
| 5-9 pontos | **Conduta inconsistente** |
| 10-14 pontos | **No improviso** |

### Copy — Resultado "No improviso" (10-14 pontos)

> **[Nome], seu diagnóstico: você está no improviso com zumbido — e não está sozinha.**
>
> A maioria das profissionais que responde esse quiz está exatamente onde você está: sem exame alterado pra guiar a conduta, sem critério claro entre as abordagens, e com aquela sensação de estar torcendo pro paciente melhorar sozinho.
>
> Isso tem solução — e não é estudar mais teoria, é ter protocolo.
>
> [CTA: Quero conhecer o protocolo — aula gratuita dia 18/08]

### Copy — Resultado "Conduta inconsistente" (5-9 pontos)

> **[Nome], seu diagnóstico: você já sabe o básico, mas ainda decide caso a caso, sem um protocolo fixo.**
>
> Isso funciona até aparecer o paciente que não responde ao que você já conhece — e aí volta a insegurança.
>
> Vale fechar essa lacuna antes que ela custe um paciente insatisfeito.
>
> [CTA: Quero conhecer o protocolo — aula gratuita dia 18/08]

### Copy — Resultado "Já tem base" (0-4 pontos)

> **[Nome], seu diagnóstico: você já tem uma base sólida em zumbido.**
>
> O que pode fazer diferença agora não é aprender do zero, é adicionar abordagens que você provavelmente ainda não usa — como Neuromodulação e Laserpuntura — e ganhar mais critério pra escolher entre elas.
>
> [CTA: Quero conhecer o protocolo — aula gratuita dia 18/08]

**Nota:** os 3 resultados levam ao mesmo CTA de propósito — o quiz serve para segmentar a mensagem que a pessoa recebe depois no WhatsApp (você pode usar a faixa de pontuação para personalizar o primeiro contato 1:1), não para desviar pessoas do funil.

---

## O que acontece depois (fora da página)

1. Lead cai automaticamente no grupo de WhatsApp da aula (ou numa lista separada, se preferir abordagem 1:1 antes)
2. Recebe mensagem de boas-vindas + lembrete da aula do dia 18
3. Se estiver perto do fim do carrinho (a partir de 20/08), troque o CTA da Tela 7 para ir direto à página de vendas em vez da aula, já que a aula já terá acontecido

**Lembre o Gabriel:** configurar isso para redirecionar automaticamente conforme a data — ou simplesmente trocar o link manualmente no dia 19/08.
