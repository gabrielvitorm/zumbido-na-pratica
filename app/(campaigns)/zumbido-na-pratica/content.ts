import type { ModuleItem } from "@/components/campaign/module-accordion";
import type { FaqItem } from "@/components/campaign/faq-section";
import type { QuizOption } from "@/components/campaign/quiz/choice-screen";

export const heroContent = {
  headline: 'Pare de dizer "não tem cura, vamos aprender a conviver" pro seu paciente com zumbido',
  subheadline:
    "Aprenda o protocolo que eu uso pra tratar zumbido de verdade — Terapia Manual, Laserterapia, Neuromodulação e mais 4 abordagens, direto de quem estuda o cérebro por profissão.",
  socialProofLine: "Mais de 65 profissionais da saúde já passaram por essa formação",
  ctaLabel: "Quero minha vaga na Turma 4",
  loteBadge: "Lote 1 até 13/08",
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
  videoSrc: undefined as string | undefined,
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
    title: "Mindfulness",
    description:
      "Técnicas de regulação da atenção que reduzem o incômodo do zumbido mesmo quando o som em si não muda.",
  },
  {
    number: 2,
    title: "Terapia Manual",
    description:
      "Abordagem manual voltada à musculatura e articulações que influenciam o sistema auditivo — nenhum equipamento necessário.",
  },
  {
    number: 3,
    title: "Laserterapia",
    description: "Protocolo de aplicação, dosagem e frequência para casos indicados.",
  },
  {
    number: 4,
    title: "Laserpuntura",
    description: "Pontos e protocolo específicos para zumbido, combinando laser com abordagem de acupuntura.",
  },
  {
    number: 5,
    title: "Neuromodulação (TDS e vagal)",
    description:
      "Conteúdo novo desta turma. Técnicas de estimulação que atuam diretamente no circuito neural responsável por manter o zumbido.",
  },
  {
    number: 6,
    title: "Surdez Súbita (nome a confirmar)",
    description: "Conduta diante de um caso de surdez súbita — o que fazer, quando encaminhar, o que não pode esperar.",
  },
  {
    number: 7,
    title: "PAC e Estimulação Trigeminal",
    description: "Abordagens complementares para casos que não respondem só às técnicas anteriores.",
  },
  {
    number: 0,
    title: "Bônus — Mentoria de Primeiros Pacientes (3 meses)",
    description:
      "Depois do curso, você traz seus casos reais e eu te ajudo na conduta, por 3 meses. Quem quiser continuar depois, segue por R$ 147/mês — sem cobrança automática, você decide.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Bônus — Módulo Empresarial",
    description:
      "Como precificar, montar pacote de sessões e estruturar o atendimento de zumbido como serviço no seu consultório.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Bônus — Mini Curso de Tráfego",
    description: "Como atrair o paciente certo pro seu consultório — de nada adianta o protocolo sem gente pra aplicar nele.",
    isBonus: true,
  },
  {
    number: 0,
    title: "Upsell — Módulo de Avaliação (R$ 700)",
    description:
      "Protocolo completo de avaliação do paciente com zumbido, do zero. Oferecido no checkout, não incluso no pacote.",
    isUpsell: true,
  },
];

export const quemEnsinaContent = {
  name: "[Nome]",
  bio: "Estudo o cérebro há [X anos], com foco em como o sistema nervoso processa e mantém sintomas como o zumbido. Já formei mais de 65 profissionais da saúde através do Zumbido na Prática, em 3 turmas anteriores.\n\nEsta é a primeira turma depois de um tempo parada — usei essa pausa pra reformular o curso inteiro e trazer o que há de mais atual em neuromodulação para o tratamento do zumbido.",
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
    "7 módulos completos, 100% ao vivo (R$ 3.500 avulso — não disponível nesta turma)",
    "Gravação de todas as aulas por 12 meses",
    "Mentoria de Primeiros Pacientes — 3 meses inclusos",
    "Módulo Empresarial — bônus",
    "Mini Curso de Tráfego — bônus",
    "Acesso ao grupo exclusivo da turma",
  ],
  closingLine: "Tudo isso por R$ 3.200 no Lote 1 (depois R$ 3.500)",
};

export const garantiaContent = {
  title: "Garantia de 7 dias após o primeiro encontro",
  description:
    "Você assiste ao primeiro fim de semana de aula (29 e 30/08) inteiro. Se não for pra você, é só pedir reembolso até 05/09 — sem burocracia.",
};

export const faqContent: FaqItem[] = [
  {
    question: "O curso é gravado ou ao vivo?",
    answer:
      "100% ao vivo, nos fins de semana: 29 e 30/08, 12 e 13/09, 26 e 27/09, 03 e 04/10. Toda aula fica gravada e disponível por 12 meses.",
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
    answer: "Não nesta turma — os módulos saem só no pacote completo, porque o protocolo depende da sequência.",
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
  subtitle: "Comece 29 de agosto com o protocolo que muda o que você faz na segunda-feira de manhã.",
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
      { label: "29 e 30/08", description: "primeiro encontro ao vivo — Introdução ao Zumbido + minha aula" },
      { label: "Encontros seguintes", description: "12 e 13/09, 26 e 27/09, 03 e 04/10" },
    ],
  },
  upsell: {
    title: "Antes de você sair: um complemento que faz sentido com o que você acabou de garantir",
    body: "O curso te dá o protocolo de tratamento. O Módulo de Avaliação te dá o protocolo de diagnóstico — como avaliar o paciente com zumbido do zero, antes de decidir qual dos 7 módulos aplicar.",
    price: "R$ 700",
    priceNote: "acesso imediato, junto com o resto do curso.",
    acceptLabel: "Quero adicionar o Módulo de Avaliação",
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
