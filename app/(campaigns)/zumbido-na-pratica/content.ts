import type { ModuleItem } from "@/components/campaign/module-cards";
import type { FaqItem } from "@/components/campaign/faq-section";
import type { QuizOption } from "@/components/campaign/quiz/choice-screen";

export const heroContent = {
  headline: 'Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido',
  subheadline:
    "Aprenda o protocolo que eu uso pra tratar zumbido de verdade — Terapia Manual, Laserterapia, Neuromodulação e mais 4 abordagens, direto de quem estuda o cérebro por profissão.",
  socialProofLine: "Mais de 65 profissionais da saúde já passaram por essa formação",
  ctaLabel: "Quero minha vaga na Turma 4",
  loteBadge: "Últimas vagas — inscrições até 06/09",
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
    "Quando eu entendi isso, o tratamento mudou. Parei de tentar \"consertar o ouvido\" e passei a modular o sistema inteiro — com terapia manual, laser, neuromodulação e mindfulness, cada um agindo numa parte diferente desse circuito.",
    "É esse protocolo que eu ensino no Zumbido na Prática.",
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
    "Você já domina os 7 protocolos e busca apenas atualização pontual",
  ],
};

export const transformacaoContent = {
  title: "Ao final da formação, você vai saber:",
  items: [
    "Diferenciar os tipos de zumbido e escolher o protocolo certo pra cada caso",
    "Aplicar Terapia Manual, Laserterapia e Laserpuntura com indicação e contraindicação claras",
    "Usar Neuromodulação (TDS e vagal) em pacientes que não respondem às abordagens convencionais",
    'Conduzir um caso de Surdez Súbita com segurança, sem "torcer para o paciente melhorar sozinho"',
    "Estruturar seu atendimento de zumbido como serviço — como precificar, como montar pacote de sessões",
    "Continuar sendo acompanhada nos seus primeiros casos reais, depois do curso",
  ],
};

// Pontuação de diagnóstico atribuída por resposta (a mais insegura = mais pontos),
// seguindo a regra descrita em pagina-captacao-quiz.md. A ordem das opções é a
// mesma do MD original.
export const modulosContent: ModuleItem[] = [
  {
    number: 1,
    title: "Módulo empreendedor + tráfego",
    description: "Como precificar, montar pacote de sessões e atrair o paciente certo pro seu consultório.",
  },
  {
    number: 2,
    title: "Avaliação",
    description: "Protocolo completo de avaliação do paciente com zumbido, do zero.",
  },
  {
    number: 3,
    title: "Laserterapia + Laserpuntura",
    description: "Protocolo de aplicação, dosagem e frequência, combinando laser com pontos específicos de acupuntura para zumbido.",
  },
  {
    number: 4,
    title: "Neuromodulação TDCS",
    description: "Estimulação transcraniana por corrente contínua aplicada ao circuito neural do zumbido.",
  },
  {
    number: 5,
    title: "Neuromodulação vagal",
    description: "Estimulação do nervo vago para modular a resposta do sistema nervoso ao zumbido.",
  },
  {
    number: 6,
    title: "Neuromodulação trigeminal",
    description: "Estimulação trigeminal como abordagem complementar para casos que não respondem só às técnicas anteriores.",
  },
  {
    number: 7,
    title: "Terapia de motricidade",
    description:
      "Abordagem manual voltada à musculatura e articulações que influenciam o sistema auditivo — nenhum equipamento necessário.",
  },
  {
    number: 8,
    title: "Terapia de processamento cognitivo para zumbido",
    description: "Técnicas de reestruturação cognitiva para reduzir o incômodo do zumbido.",
  },
  {
    number: 9,
    title: "Mindfulness para zumbido. Como eu faço.",
    description:
      "Técnicas de regulação da atenção que reduzem o incômodo do zumbido mesmo quando o som em si não muda.",
  },
  {
    number: 10,
    title: "Aconselhamento: como eu faço.",
    description: "Como conduzir a orientação do paciente com zumbido — o que dizer, como dizer, e como isso muda a adesão ao tratamento.",
  },
  {
    number: 0,
    title: "Bônus — Mentoria de Primeiros Pacientes (3 meses)",
    description:
      "Depois do curso, você traz seus casos reais e eu te ajudo na conduta, por 3 meses. Quem quiser continuar depois, segue por R$ 147/mês — sem cobrança automática, você decide.",
    isBonus: true,
  },
];

export const quemEnsinaContent = {
  name: "Ana Luiza Caldas",
  bio: "Estudo o cérebro há 10 anos, com foco em como o sistema nervoso processa e mantém sintomas como o zumbido. Já formei mais de 65 profissionais da saúde através do Zumbido na Prática, em 3 turmas anteriores.\n\nEsta é a primeira turma depois de um tempo parada — usei essa pausa pra reformular o curso inteiro e trazer o que há de mais atual em neuromodulação para o tratamento do zumbido.",
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
    "10 módulos completos, 100% ao vivo (R$ 5.500 avulso — R$ 550 cada módulo individual)",
    "Gravação de todas as aulas por 12 meses",
    "Mentoria de Primeiros Pacientes — 3 meses inclusos",
    "Acesso ao grupo exclusivo da turma",
  ],
  closingLine: "Tudo isso por R$ 2.470",
};

export const garantiaContent = {
  title: "Garantia de 7 dias após o primeiro encontro",
  description:
    "Você assiste ao primeiro fim de semana de aula (05 e 06/09) inteiro. Se não for pra você, é só pedir reembolso até 12/09 — sem burocracia.",
};

export const faqContent: FaqItem[] = [
  {
    question: "O curso é gravado ou ao vivo?",
    answer:
      "100% ao vivo, nos fins de semana: 05 e 06/09, 12 e 13/09, 19 e 20/09, 26 e 27/09. Toda aula fica gravada e disponível por 12 meses.",
  },
  {
    question: "Preciso ter equipamento de laser?",
    answer:
      "Não para todos os módulos. Terapia Manual, Mindfulness e Estimulação Trigeminal não pedem equipamento. Laser e Neuromodulação, sim — e o Módulo Empresarial te ajuda a planejar esse investimento.",
  },
  {
    question: "Não sei se dá tempo na minha agenda.",
    answer: "São 4 fins de semana, e você não precisa assistir tudo ao vivo — a gravação fica 1 ano no ar.",
  },
  {
    question: "Como funciona a Mentoria de Primeiros Pacientes?",
    answer:
      "Você traz seus casos reais e eu ajudo na conduta, por 3 meses inclusos no pacote. Depois, quem quiser continuar segue por R$ 147/mês — você decide, sem cobrança automática.",
  },
  {
    question: "Posso comprar só um módulo?",
    answer:
      "Sim, os módulos também são vendidos avulsos, a R$ 550 cada. Mas o pacote completo (R$ 2.470) sai mais em conta se você quer o protocolo inteiro.",
  },
  {
    question: "Tem parcelamento?",
    answer: "Sim, em até 12x.",
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem garantia de 7 dias após o primeiro encontro.",
  },
];

export const ctaFinalContent = {
  title: "A Turma 4 do Zumbido na Prática está aberta.",
  subtitle: "Comece 05 de setembro com o protocolo que muda o que você faz na segunda-feira de manhã.",
  ctaLabel: "Quero minha vaga",
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
