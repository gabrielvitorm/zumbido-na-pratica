# Página de Vendas — Zumbido na Prática (Turma 4)

Este arquivo tem duas partes: **a copy pronta** de cada dobra, e **a explicação técnica** do que ela precisa fazer — para você (ou o Claude Code) construir a estrutura em Next.js sem perder a lógica de conversão.

**Voz:** 1ª pessoa, na voz da Expert, do início ao fim.
**Link de checkout:** `[CHECKOUT_LINK]` — substituir em todos os CTAs.

---

## Mapa das dobras

1. Hero (promessa)
2. Barra de urgência (fixa, sticky)
3. Dor (identificação)
4. Virada (a explicação central — o gancho de neurociência)
5. Para quem é / não é
6. O que você vai saber fazer (transformação)
7. Conteúdo — os 7 módulos
8. Quem ensina (autoridade)
9. Prova social (65+ profissionais)
10. Oferta e bônus
11. Preço e lotes
12. Garantia
13. FAQ / quebra de objeção
14. CTA final

Ordem importa: cada dobra remove uma dúvida específica antes de a próxima aparecer. Não reordene sem motivo.

---

## 1. Hero

### Função
Primeira tela, sem scroll. Precisa comunicar promessa + para quem + prova em menos de 5 segundos, porque é o que decide se a pessoa continua.

### Estrutura técnica
- Headline (1 frase, grande)
- Subheadline (1 frase, apoio)
- 1 linha de prova social curta abaixo do CTA (não é a seção de prova completa, é um selo)
- CTA primário
- Imagem/vídeo da Expert à direita ou como fundo (se vídeo, thumbnail com play, autoplay mudo é aceitável)
- Contador ou tag de "Lote 1 até [data]" próximo ao CTA

### Copy

**Headline:**
> Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido

**Subheadline:**
> Aprenda o protocolo que eu uso pra tratar zumbido de verdade — Terapia Manual, Laserterapia, Neuromodulação e mais 4 abordagens, direto de quem estuda o cérebro por profissão.

**Selo de prova (abaixo do CTA):**
> Mais de 65 profissionais da saúde já passaram por essa formação

**CTA:**
> Quero minha vaga na Turma 4

---

## 2. Barra de urgência (sticky, topo ou rodapé)

### Função
Fica visível durante toda a rolagem. É o elemento que converte quem já decidiu mas estava "só olhando".

### Estrutura técnica
- Componente fixo (`position: sticky` ou `fixed`)
- Texto muda automaticamente conforme o lote vigente (ou você troca manualmente a cada virada)
- Contador regressivo até o fim do lote atual (opcional, mas ajuda)

### Copy por fase

**Lote 1 (10–13/08):**
> 🟡 Lote de abertura: R$ 3.200 (12x de R$ 291) — vale até quinta, 13/08

**Lote 2 (14–20/08):**
> Vagas abertas — R$ 3.500 (12x de R$ 318)

**Últimas 96h (21–24/08):**
> 🔴 Últimas horas de inscrição — fecha 24/08 às 23h59

---

## 3. Dor (identificação)

### Função
Fazer quem atende reconhecer a própria frustração antes de qualquer menção ao curso. Sem essa dobra, a virada da dobra 4 perde força.

### Estrutura técnica
- Bloco de texto centralizado, sem imagem — texto puro converte melhor aqui
- 3 a 4 parágrafos curtos, cada um uma frase ou duas
- Pode usar frases isoladas em destaque (tipografia maior) intercaladas com texto normal

### Copy

> Você já teve esse paciente.
>
> Ele chega falando que o zumbido não deixa ele dormir. Você pede o exame. O exame vem normal.
>
> E aí você fala a frase que todo mundo fala: "não tem cura, vamos aprender a conviver."
>
> Não é mentira. Mas também não é resposta — é o jeito educado de dizer que você não sabe o que fazer com aquele paciente.
>
> Eu sei, porque eu também dizia isso.

---

## 4. Virada — a explicação central

### Função
Esta é a dobra mais importante da página. É onde a autoridade da Expert (neurociência) se transforma em motivo real para comprar. Sem essa explicação, o curso parece "mais um curso de zumbido".

### Estrutura técnica
- Pode usar um diagrama simples (ilustração, não precisa ser científico) mostrando ouvido → via auditiva central
- Texto em blocos curtos, não parágrafo corrido longo
- Se houver o vídeo de 60s gravado ("por que o zumbido não está no ouvido"), incorpore aqui — essa dobra é o lugar certo pra ele

### Copy

> **O zumbido não está no ouvido.**
>
> O ouvido pode ter sido o gatilho. Mas quem sustenta o zumbido, na maioria dos casos, é a via auditiva central — a parte do cérebro que aprendeu a amplificar um sinal que não deveria estar ali.
>
> É por isso que o exame vem normal. Você não está tratando o órgão errado — você está tratando o sintoma errado.
>
> Quando eu entendi isso, o tratamento mudou. Parei de tentar "consertar o ouvido" e passei a modular o sistema inteiro — com terapia manual, laser, neuromodulação e mindfulness, cada um agindo numa parte diferente desse circuito.
>
> É esse protocolo que eu ensino no Zumbido na Prática.

---

## 5. Para quem é / não é

### Função
Reduz atrito pós-compra (menos pedido de reembolso) e aumenta confiança em quem lê — paradoxalmente, dizer "não é pra todo mundo" vende mais para quem realmente é o público.

### Estrutura técnica
- Duas colunas lado a lado (é pra você / não é pra você)
- Ícone de check e X, respectivamente
- 4-5 itens por coluna, curtos

### Copy

**É pra você se:**
- Você atende ou pretende atender pacientes com zumbido
- Você já se sentiu sem resposta na frente de um paciente assim
- Você quer sair do "não tem cura" e ter conduta de verdade
- Você é fono, fisio, TO, dentista ou outro profissional da saúde que lida com esse sintoma

**Não é pra você se:**
- Você busca só teoria acadêmica sobre zumbido, sem aplicação clínica
- Você não atende pacientes (o curso é 100% voltado à prática)
- Você já domina os 7 protocolos e busca apenas atualização pontual

---

## 6. Transformação — o que você vai saber fazer

### Função
Traduz "módulos" em capacidade prática. Essa dobra responde "o que eu consigo fazer depois que ninguém consegue fazer hoje".

### Estrutura técnica
- Lista de 5-6 itens, ícone de check
- Frases no formato "Eu vou saber [ação concreta]"

### Copy

> Ao final da formação, você vai saber:
>
> - Diferenciar os tipos de zumbido e escolher o protocolo certo pra cada caso
> - Aplicar Terapia Manual, Laserterapia e Laserpuntura com indicação e contraindicação claras
> - Usar Neuromodulação (TDS e vagal) em pacientes que não respondem às abordagens convencionais
> - Conduzir um caso de Surdez Súbita com segurança, sem "torcer para o paciente melhorar sozinho"
> - Estruturar seu atendimento de zumbido como serviço — como precificar, como montar pacote de sessões
> - Continuar sendo acompanhada nos seus primeiros casos reais, depois do curso

---

## 7. Conteúdo — os 7 módulos

### Função
Dobra de "prova de conteúdo" — mostra que a promessa tem substância por trás, não é só discurso.

### Estrutura técnica
- Accordion (cada módulo expande com 2-3 linhas de descrição) — evita poluir a página com texto demais de uma vez
- Numeração visual 1 a 7
- Se o upsell de Avaliação aparecer aqui, marcar visualmente como "módulo bônus" ou "disponível como upsell", não misturar com os 7 principais

### Copy

**Módulo 1 — Mindfulness**
> Técnicas de regulação da atenção que reduzem o incômodo do zumbido mesmo quando o som em si não muda.

**Módulo 2 — Terapia Manual**
> Abordagem manual voltada à musculatura e articulações que influenciam o sistema auditivo — nenhum equipamento necessário.

**Módulo 3 — Laserterapia**
> Protocolo de aplicação, dosagem e frequência para casos indicados.

**Módulo 4 — Laserpuntura**
> Pontos e protocolo específicos para zumbido, combinando laser com abordagem de acupuntura.

**Módulo 5 — Neuromodulação (TDS e vagal)**
> Conteúdo novo desta turma. Técnicas de estimulação que atuam diretamente no circuito neural responsável por manter o zumbido.

**Módulo 6 — [Surdez Súbita]** *(nome a confirmar)*
> Conduta diante de um caso de surdez súbita — o que fazer, quando encaminhar, o que não pode esperar.

**Módulo 7 — PAC e Estimulação Trigeminal**
> Abordagens complementares para casos que não respondem só às técnicas anteriores.

**Bônus incluído — Mentoria de Primeiros Pacientes (3 meses)**
> Depois do curso, você traz seus casos reais e eu te ajudo na conduta, por 3 meses. Quem quiser continuar depois, segue por R$ 147/mês — sem cobrança automática, você decide.

**Bônus incluído — Módulo Empresarial**
> Como precificar, montar pacote de sessões e estruturar o atendimento de zumbido como serviço no seu consultório.

**Bônus incluído — Mini Curso de Tráfego**
> Como atrair o paciente certo pro seu consultório — de nada adianta o protocolo sem gente pra aplicar nele.

**Upsell disponível — Módulo de Avaliação (R$ 700)**
> Protocolo completo de avaliação do paciente com zumbido, do zero. *(oferecido no checkout, não incluso no pacote)*

---

## 8. Quem ensina

### Função
Autoridade. Uma dobra curta, uma foto/vídeo dela, credenciais reais — sem exagero.

### Estrutura técnica
- Foto profissional dela, boa qualidade
- Bio curta (60-90 palavras)
- Pode incluir 2-3 credenciais em formato de selo (formação, tempo de atuação, nº de pacientes/alunos)

### Copy

> **Sou [Nome], neurocientista.**
>
> Estudo o cérebro há [X anos], com foco em como o sistema nervoso processa e mantém sintomas como o zumbido. Já formei mais de 65 profissionais da saúde através do Zumbido na Prática, em 3 turmas anteriores.
>
> Esta é a primeira turma depois de um tempo parada — usei essa pausa pra reformular o curso inteiro e trazer o que há de mais atual em neuromodulação para o tratamento do zumbido.

*(Ajustar "[X anos]" e demais credenciais com os dados reais dela.)*

---

## 9. Prova social

### Função
Onde a confiança se converte em decisão. É a dobra que mais precisa de conteúdo real — quanto mais específico, mais forte.

### Estrutura técnica
- Se houver os 2 depoimentos em vídeo: carrossel ou grid de 2 colunas com player
- Selo numérico grande: "65+ profissionais formadas"
- Se possível, 3-5 prints de mensagens reais de alunas (WhatsApp/Instagram) abaixo dos vídeos — prova social "crua" converte muito bem nesse formato

### Copy (estrutura, a preencher com os depoimentos reais)

> **Mais de 65 profissionais já passaram pela formação. Veja o que mudou na prática delas:**
>
> [VÍDEO 1 — depoimento]
> [VÍDEO 2 — depoimento]
>
> [Prints de mensagens, se disponíveis]

---

## 10. Oferta e bônus (resumo)

### Função
Consolidar tudo que está incluso antes de mostrar preço — a pessoa precisa ver o "monte" de valor antes do número.

### Estrutura técnica
- Lista em formato de "recibo" (item + valor, com o valor do combo riscado)
- Item de maior valor percebido no topo

### Copy

> **O que está incluso:**
>
> - 7 módulos completos, 100% ao vivo *(R$ 3.500 avulso — não disponível nesta turma)*
> - Gravação de todas as aulas por 12 meses
> - Mentoria de Primeiros Pacientes — 3 meses inclusos
> - Módulo Empresarial — bônus
> - Mini Curso de Tráfego — bônus
> - Acesso ao grupo exclusivo da turma
>
> **Tudo isso por R$ 3.200 no Lote 1** *(depois R$ 3.500)*

---

## 11. Preço e lotes

### Função
Dobra transacional. Precisa ser a mais clara e menos "vendedora" de todas — quem chegou até aqui já está convencido, agora só precisa de clareza.

### Estrutura técnica
- Card único de preço (não ofereça múltiplas opções de pacote — só o combo)
- Toggle ou destaque para parcelamento
- CTA grande, repetido

### Copy

> ### Turma 4 — Zumbido na Prática
>
> ~~R$ 3.500~~ **R$ 3.200** *(Lote 1, até 13/08)*
> ou 12x de R$ 291
>
> [CTA: Garantir minha vaga]
>
> 🟡 Preço sobe para R$ 3.500 depois do dia 13/08

---

## 12. Garantia

### Função
Remove o último medo antes da decisão de clicar.

### Estrutura técnica
- Selo visual (ícone de escudo/garantia)
- Texto curto, direto

### Copy

> **Garantia de 7 dias após o primeiro encontro**
>
> Você assiste ao primeiro fim de semana de aula (29 e 30/08) inteiro. Se não for pra você, é só pedir reembolso até 05/09 — sem burocracia.

---

## 13. FAQ / quebra de objeção

### Função
Última barreira antes do CTA final. Cada pergunta é uma objeção real mapeada.

### Estrutura técnica
- Accordion
- 6-8 perguntas, não mais

### Copy

**O curso é gravado ou ao vivo?**
> 100% ao vivo, nos fins de semana: 29 e 30/08, 12 e 13/09, 26 e 27/09, 03 e 04/10. Toda aula fica gravada e disponível por 12 meses.

**Preciso ter equipamento de laser?**
> Não para todos os módulos. Terapia Manual, Mindfulness e Estimulação Trigeminal não pedem equipamento. Laser e Neuromodulação, sim — e o Módulo Empresarial te ajuda a planejar esse investimento.

**Não sei se dá tempo na minha agenda.**
> São 4 fins de semana, e você não precisa assistir tudo ao vivo — a gravação fica 1 ano no ar.

**Como funciona a Mentoria de Primeiros Pacientes?**
> Você traz seus casos reais e eu ajudo na conduta, por 3 meses inclusos no pacote. Depois, quem quiser continuar segue por R$ 147/mês — você decide, sem cobrança automática.

**Posso comprar só um módulo?**
> Não nesta turma — os módulos saem só no pacote completo, porque o protocolo depende da sequência.

**Tem parcelamento?**
> Sim, em até 12x.

**E se eu não gostar?**
> Você tem garantia de 7 dias após o primeiro encontro.

---

## 14. CTA final

### Função
Última chance, para quem leu a página inteira mas não clicou antes.

### Estrutura técnica
- Fundo de cor diferente do resto da página (destaque visual)
- CTA grande, centralizado

### Copy

> **A Turma 4 do Zumbido na Prática está aberta.**
>
> Comece 29 de agosto com o protocolo que muda o que você faz na segunda-feira de manhã.
>
> [CTA: Quero minha vaga]
>
> 12x de R$ 291 — Lote atual válido até [data do lote vigente]
