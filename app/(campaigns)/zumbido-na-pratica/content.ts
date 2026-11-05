import type { ModuleItem } from "@/components/campaign/module-cards";
import type { FaqItem } from "@/components/campaign/faq-section";
import type { QuizOption } from "@/components/campaign/quiz/choice-screen";
import { blackNovemberOffer } from "@/lib/black-november";

export const heroContent = {
  headline: 'Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido',
  subheadline:
    "O protocolo completo de avaliação e tratamento do zumbido — Fotobiomodulação, Neuromodulação, Estimulação Vagal e mais — em 8 módulos, com 2 lives de tira-dúvidas. Pelo menor preço do ano.",
  socialProofLine: "Mais de 65 profissionais da saúde já passaram por essa formação",
  ctaLabel: "Quero entrar na Black",
  loteBadge: "BLACK NOVEMBER · ATÉ 30/11",
  microcopy: "Garantia de 7 dias · Acesso imediato · Oferta encerra em 30/11",
  price: blackNovemberOffer.price,
  anchorPrice: blackNovemberOffer.anchorPrice,
  installment: blackNovemberOffer.installment,
};

export const dorContent = {
  paragraphs: [
    "Você já teve esse paciente.",
    "Ele chega falando que o zumbido não deixa ele dormir. Você pede o exame. O exame vem normal.",
    'E aí você fala a frase que todo mundo fala: "não tem cura, vamos aprender a conviver."',
    "Não é mentira. Mas também não é resposta — é o jeito educado de dizer que você não sabe o que fazer com aquele paciente.",
    "Eu sei, porque eu também dizia isso.",
  ],
};

export const viradaContent = {
  title: "O zumbido não está no ouvido.",
  paragraphs: [
    "O ouvido pode ter sido o gatilho. Mas quem sustenta o zumbido, na maioria dos casos, é a via auditiva central — a parte do cérebro que aprendeu a amplificar um sinal que não deveria estar ali.",
    "É por isso que o exame vem normal. Você não está tratando o órgão errado — você está tratando o sintoma errado.",
    "Quando eu entendi isso, o tratamento mudou. Parei de tentar \"consertar o ouvido\" e passei a modular o sistema inteiro — com fotobiomodulação, neuromodulação e estimulação vagal, cada um agindo numa parte diferente desse circuito.",
    "É esse protocolo que eu ensino no Zumbido na Prática — e, até 30/11, ele está com condição de Black.",
  ],
};

export const paraQuemContent = {
  leftTitle: "É pra você se:",
  leftItems: [
    "Você atende ou pretende atender pacientes com zumbido",
    "Você já se sentiu sem resposta na frente de um paciente assim",
    'Você quer sair do "não tem cura" e ter conduta de verdade',
    "Você é fono, fisio, TO, dentista ou outro profissional da saúde que lida com esse sintoma",
  ],
  rightTitle: "Não é pra você se:",
  rightItems: [
    "Você busca só teoria acadêmica sobre zumbido, sem aplicação clínica",
    "Você não atende pacientes (o curso é 100% voltado à prática)",
    "Você espera aulas ao vivo toda semana — a Black é formato gravado + 2 lives de dúvidas",
  ],
};

export const transformacaoContent = {
  title: "Ao final da formação, você vai saber:",
  items: [
    "Avaliar o paciente com zumbido e escolher o protocolo certo para cada caso",
    "Aplicar Fotobiomodulação com indicação, dosagem e contraindicação claras",
    "Usar Neuromodulação e Neuromodulação Trigeminal em quem não responde às abordagens convencionais",
    "Aplicar Estimulação Vagal para modular a resposta do sistema nervoso ao zumbido",
    "Usar Treinamento Auditivo e Motricidade Orofacial dentro do plano terapêutico",
    "Conduzir o Aconselhamento: o que dizer, como dizer e como isso muda a adesão",
    "Tirar suas dúvidas direto comigo em 2 lives ao vivo",
  ],
};

// Pontuação de diagnóstico atribuída por resposta (a mais insegura = mais pontos),
// seguindo a regra descrita em pagina-captacao-quiz.md. A ordem das opções é a
// mesma do MD original.
export const modulosContent: ModuleItem[] = [
  {
    number: 1,
    title: "Avaliação",
    description: "Aprenda a avaliar o paciente com zumbido e escolher o protocolo adequado para cada caso.",
  },
  {
    number: 2,
    title: "Fotobiomodulação",
    description: "Entenda indicação, dosagem e contraindicações para aplicar fotobiomodulação com segurança.",
  },
  {
    number: 3,
    title: "Neuromodulação",
    description: "Use neuromodulação para ampliar as possibilidades de conduta nos casos que exigem mais recursos.",
  },
  {
    number: 4,
    title: "Neuromodulação Trigeminal",
    description: "Conheça a abordagem trigeminal e quando ela pode complementar o plano terapêutico.",
  },
  {
    number: 5,
    title: "Treinamento Auditivo e Zumbido",
    description: "Organize o treinamento auditivo dentro da conduta e ajude o paciente a lidar melhor com o zumbido.",
  },
  {
    number: 6,
    title: "Estimulação Vagal",
    description: "Aprenda como a estimulação vagal pode modular a resposta do sistema nervoso ao zumbido.",
  },
  {
    number: 7,
    title: "Motricidade Orofacial e Zumbido",
    description:
      "Inclua motricidade orofacial no plano terapêutico para os casos em que musculatura e articulações participam do quadro.",
  },
  {
    number: 8,
    title: "Aconselhamento",
    description: "Como conduzir a orientação do paciente com zumbido — o que dizer, como dizer, e como isso muda a adesão ao tratamento.",
  },
];

export const liveBonusContent = {
  title: "2 Lives ao vivo de tira-dúvidas",
  description:
    "Você assiste, aplica e leva suas dúvidas de caso direto pra mim, ao vivo, em dois encontros exclusivos para quem entrar na Black.",
  sessions: blackNovemberOffer.liveSessions,
};

export const quemEnsinaContent = {
  name: "Ana Luiza Caldas",
  bio: "Estudo o cérebro há 10 anos, com foco em como o sistema nervoso processa e mantém sintomas como o zumbido. Já formei mais de 65 profissionais da saúde através do Zumbido na Prática, em 3 turmas anteriores.\n\nEsta é uma condição especial de Black November, com o curso reformulado e atualizado em neuromodulação.",
  photoSrc: undefined as string | undefined,
};

export const provaSocialContent = {
  headline: "Mais de 65 profissionais já passaram pela formação. Veja o que mudou na prática delas:",
  videos: [
    { src: undefined as string | undefined, thumbnailAlt: "Depoimento 1" },
    { src: undefined as string | undefined, thumbnailAlt: "Depoimento 2" },
  ],
};

export const ofertaContent = {
  title: "O que está incluso:",
  items: [
    "8 módulos completos, com acesso imediato às aulas gravadas",
    "2 lives ao vivo de tira-dúvidas",
    `Acesso por ${blackNovemberOffer.accessMonths} meses às aulas`,
    "Garantia de 7 dias",
  ],
  anchorPrice: blackNovemberOffer.anchorPrice,
  price: blackNovemberOffer.price,
  installment: blackNovemberOffer.installment,
  savings: blackNovemberOffer.savings,
  closingLine: "Só até 30/11",
  ctaLabel: "Garantir minha vaga na Black",
};

export const garantiaContent = {
  title: "Garantia de 7 dias a partir da compra",
  description:
    "Entre, assista aos primeiros módulos e, se não for pra você, é só pedir reembolso dentro de 7 dias — sem burocracia.",
};

export const faqContent: FaqItem[] = [
  {
    question: "O curso é gravado ou ao vivo?",
    answer: "Os 8 módulos são gravados, com acesso imediato e ritmo livre. A Black também inclui 2 lives ao vivo de tira-dúvidas.",
  },
  {
    question: "Preciso ter equipamento de fotobiomodulação?",
    answer: "Não para todos os módulos. A necessidade de equipamento depende do protocolo e do caso; a formação explica indicações, dosagem e contraindicações.",
  },
  {
    question: "Não sei se dá tempo na minha agenda.",
    answer: `O conteúdo é gravado, fica disponível por ${blackNovemberOffer.accessMonths} meses e pode ser assistido no seu ritmo. As duas lives terão datas divulgadas assim que forem definidas.`,
  },
  {
    question: "Como funcionam as lives de tira-dúvidas?",
    answer: "São 2 encontros ao vivo exclusivos para quem entrar na Black. Você assiste, aplica e leva suas dúvidas de caso direto pra mim.",
  },
  {
    question: "Posso comprar só um módulo?",
    answer: "A condição Black é para o pacote completo com os 8 módulos e as 2 lives de tira-dúvidas.",
  },
  {
    question: "Tem parcelamento?",
    answer: `Sim. Você pode pagar em ${blackNovemberOffer.installment}.`,
  },
  {
    question: "E se eu não gostar?",
    answer: garantiaContent.description,
  },
  {
    question: "Até quando vale a Black?",
    answer: "Até 30/11 às 23:59, no horário de Fortaleza. Depois disso, o preço volta ao normal.",
  },
  {
    question: "O desconto vale para quem já fez turmas anteriores?",
    answer: "A condição para alunas anteriores deve ser confirmada antes da publicação da campanha.",
  },
];

export const ctaFinalContent = {
  title: "A Black November do Zumbido na Prática termina em 30/11.",
  subtitle: "Depois disso, o preço volta ao normal — e as lives de tira-dúvidas saem do pacote.",
  ctaLabel: "Garantir minha vaga na Black",
};

export const obrigadoContent = {
  confirmation: {
    title: "Sua vaga na Turma 4 está garantida.",
    body: "Bem-vinda, {nome}! Fico muito feliz de te ter nessa turma — principalmente sendo essa a primeira depois de um tempo parada.\n\nVocê vai receber um e-mail de confirmação em instantes com os dados de acesso.",
  },
  nextStep: {
    title: "Primeiro passo: entre no grupo da turma",
    body: "É lá que eu aviso sobre horário, link da aula ao vivo e materiais. Não perca esse passo.",
    ctaLabel: "Entrar no grupo da Turma 4",
  },
  timeline: {
    title: "O que acontece a partir de agora:",
    items: [
      { label: "Hoje", description: "você recebe o e-mail com acesso à área de membros" },
      { label: "Nos próximos dias", description: "materiais de apoio liberados aos poucos" },
      { label: "05 e 06/09", description: "primeiro encontro ao vivo — Introdução ao Zumbido + minha aula" },
      { label: "Encontros seguintes", description: "12 e 13/09, 19 e 20/09, 26 e 27/09" },
    ],
  },
  upsells: {
    title: "Antes de você sair: dois complementos que fazem sentido com o que você acabou de garantir",
    items: [
      {
        name: "Mindfulness",
        body: "Aprofunde as técnicas de regulação da atenção que reduzem o incômodo do zumbido — mentoria à parte do pacote.",
        price: "R$ 790",
        priceValue: 790,
        priceNote: "acesso imediato.",
        ctaLabel: "Quero adicionar Mindfulness",
        ctaHref: "https://pay.kiwify.com.br/jqFkpYE",
      },
      {
        name: "Supervisão (SuperZumbido)",
        body: "5 reuniões mensais de supervisão pra você tirar dúvidas de casos reais comigo, com frequência fixa.",
        price: "R$ 790",
        priceValue: 790,
        priceNote: "cobrança mensal, cancele quando quiser.",
        ctaLabel: "Quero entrar na Supervisão",
        ctaHref: "#checkout-pendente-supervisao",
      },
    ],
    buyBothLabel: "Quero os 2",
    declineLabel: "Não, obrigada, só o combo por enquanto",
  },
  share: {
    title: "Acabou de garantir sua vaga? Conta pra galera:",
    suggestedText: "Acabei de entrar na Turma 4 do Zumbido na Prática 🎧 #zumbidonapratica",
    ctaLabel: "Compartilhar nos Stories",
  },
};

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizContent = {
  cover: {
    headline:
      'Você sabe tratar zumbido de verdade — ou está só "aprendendo a conviver" junto com o paciente?',
    body: "Responda 5 perguntas rápidas e descubra em que nível está sua conduta clínica pra zumbido.\n\nLeva 2 minutos.",
    ctaLabel: "Começar",
  },
  questions: [
    {
      id: "frequencia",
      question: "Com que frequência chega paciente com zumbido no seu consultório?",
      options: [
        { label: "Quase todo mês", points: 0 },
        { label: "De vez em quando", points: 1 },
        { label: "Raramente, mas quando chega eu fico sem saber o que fazer", points: 3 },
        { label: "Ainda não atendo, mas quero me preparar", points: 2 },
      ],
    },
    {
      id: "explicacao",
      question: "Quando o exame do paciente vem normal, mas o zumbido continua, você sabe explicar por quê?",
      options: [
        { label: "Sim, sei explicar com segurança", points: 0 },
        { label: "Mais ou menos, mas não consigo explicar com clareza pro paciente", points: 2 },
        { label: "Não sei — e confesso que isso me incomoda", points: 3 },
      ],
    },
    {
      id: "criterio",
      question: "Você sabe quando indicar Laserterapia em vez de Neuromodulação para um caso de zumbido?",
      options: [
        { label: "Sim, tenho critério claro pra isso", points: 0 },
        { label: "Eu uso sempre a mesma abordagem, não importa o caso", points: 2 },
        { label: "Não sei diferenciar quando usar cada uma", points: 3 },
      ],
    },
    {
      id: "sentimento",
      question: "Como você se sente quando um paciente de zumbido volta e diz que não melhorou nada?",
      options: [
        { label: "Frustrada, sem saber o próximo passo", points: 3 },
        { label: "Incomodada, mas sigo o protocolo que conheço", points: 1 },
        { label: "Tranquila, sei ajustar a conduta", points: 0 },
      ],
    },
    {
      id: "intencao",
      question: "Se você tivesse um protocolo estruturado e testado pra zumbido, o que mudaria primeiro no seu consultório?",
      options: [
        { label: "Eu pararia de encaminhar tanto paciente pra outros profissionais", points: 2 },
        { label: "Eu cobraria mais pelo meu atendimento, porque teria mais segurança", points: 1 },
        { label: "Eu simplesmente dormiria mais tranquila sabendo o que fazer", points: 3 },
      ],
    },
  ] satisfies QuizQuestion[],
  results: {
    "ja-tem-base": {
      title: "{nome}, seu diagnóstico: você já tem uma base sólida em zumbido.",
      body: "O que pode fazer diferença agora não é aprender do zero, é adicionar abordagens que você provavelmente ainda não usa — como Neuromodulação e Laserpuntura — e ganhar mais critério pra escolher entre elas.",
    },
    "conduta-inconsistente": {
      title: "{nome}, seu diagnóstico: você já sabe o básico, mas ainda decide caso a caso, sem um protocolo fixo.",
      body: "Isso funciona até aparecer o paciente que não responde ao que você já conhece — e aí volta a insegurança. Vale fechar essa lacuna antes que ela custe um paciente insatisfeito.",
    },
    "no-improviso": {
      title: "{nome}, seu diagnóstico: você está no improviso com zumbido — e não está sozinha.",
      body: "A maioria das profissionais que responde esse quiz está exatamente onde você está: sem exame alterado pra guiar a conduta, sem critério claro entre as abordagens, e com aquela sensação de estar torcendo pro paciente melhorar sozinho. Isso tem solução — e não é estudar mais teoria, é ter protocolo.",
    },
  },
  resultCtaLabel: "Quero conhecer o protocolo — aula gratuita dia 18/08",
};
