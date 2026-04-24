const WHATSAPP_PHONE = '5511965698725';

const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, P&B Comunicação Visual! Cheguei aqui pelo site e gostaria de solicitar um orçamento de comunicação visual (adesivação de frota, fachadas, painéis, banners ou PDV). Podem me passar as informações?';

export function buildWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

export const siteData = {
  company: {
    name: 'P&B Comunicação Visual',
    cnpj: '06.554.319/0001-00',
    founded: 2002,
    description:
      'Desde 2002 desenvolvemos projetos de comunicação visual, impressão, produção e instalação para tornar marcas cada vez mais visíveis e próximas de seus clientes.',
    logoSrc: '/assets/logo.png',
  },

  contact: {
    address: 'Rua Antonio Raposo, 149, Lapa, São Paulo - SP',
    cep: 'CEP 05074-020',
    addressHint: 'Próximo à estação de Trem Lapa, travessa com a 12 de Outubro',
    phones: '(11) 3836-0196 / 3644-8907',
    phoneLink: 'tel:+551138360196',
    email: 'vendas1@pbcomunicacao.com.br',
    whatsappPhone: WHATSAPP_PHONE,
    whatsappMessage: DEFAULT_WHATSAPP_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(),
    location: {
      lat: -23.5213003,
      lng: -46.7062256,
      zoom: 16,
      placeId: 'osm-node-5184059577',
      osmPlaceId: 8563633,
      osmType: 'node',
      osmId: 5184059577,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-23.5213003,-46.7062256',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-23.5213003,-46.7062256',
      embedUrl:
        'https://www.google.com/maps?q=-23.5213003,-46.7062256&hl=pt-BR&z=16&output=embed',
    },
  },

  social: [
    {
      platform: 'Facebook',
      href: 'https://www.facebook.com/PBComunicacao/?locale=pt_BR',
      icon: 'facebook',
    },
    {
      platform: 'Instagram',
      href: 'https://www.instagram.com/pb.comunicacaovisual/',
      icon: 'instagram',
    },
  ],

  nav: {
    links: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Portfólio', href: '#portfolio' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contato', href: '#contato' },
    ],
    cta: { label: 'Solicite seu Orçamento' },
    mobileMenuCloseLabel: 'Fechar menu',
  },

  hero: {
    badge: 'Desde 2002 • Sinalização Corporativa Nacional',
    headline: 'Visibilidade Magnética',
    highlight: 'para Grandes Marcas',
    subheadline:
      'Projetos integrados de sinalização corporativa, produção e instalação em nível nacional. Excelência que transforma espaços e ativos em ferramentas de negócios.',
    ctas: [
      { text: 'Solicite seu Orçamento', variant: 'primary' },
      { text: 'Nossos Serviços', href: '#servicos', variant: 'secondary' },
    ],
    socialProof: {
      before: 'Projetos para',
      highlight: 'marcas de diferentes setores',
      after: 'com produção e instalação especializada',
    },
    video: {
      poster: '/assets/hero/hero-poster-1920.webp',
      posterSrcSet:
        '/assets/hero/hero-poster-640.webp 640w, /assets/hero/hero-poster-1024.webp 1024w, /assets/hero/hero-poster-1920.webp 1920w',
      sources: [{ src: '/assets/hero/hero.mp4', type: 'video/mp4' }],
    },
  },

  clients: {
    label: 'Corporações que confiam na P&B Comunicação Visual',
    logos: [
      'honda',
      'adidas',
      'DHL-1',
      'jbs-1',
      'swift-1',
      'shopee',
      'colgate',
      'vigor-1',
      'seara-1',
      'friboi-1',
      'gpa',
      'mapfre',
      'herbalife',
      'ferrari',
      'fiap',
      'bb',
      'tam',
    ],
  },

  whyUs: {
    label: 'Resultados Corporativos',
    headline: {
      before: 'Por que empresas de',
      accent: 'grande porte',
      after: 'escolhem a P&B',
    },
    subheadline:
      'Comunicação visual que reduz percepção de risco, aumenta tráfego e impõe autoridade de marca.',
    benefits: [
      {
        icon: 'eye',
        title: 'Exposição Massiva 24/7',
        description:
          'Sinalização que atua como vendedor silencioso ininterrupto. Seus ativos geram visibilidade todos os dias, em todas as rotas e pontos de venda.',
      },
      {
        icon: 'shield',
        title: 'Proteção e Valorização do Ativo',
        description:
          'Adesivação profissional preserva a pintura original contra UV e intempéries. Proteção que mantém o valor residual da sua frota e infraestrutura.',
      },
      {
        icon: 'expand',
        title: 'Padronização Visual Absoluta',
        description:
          'Unidade cromática perfeita em 5 ou 5.000 unidades. Consistência visual que fortalece o reconhecimento da marca em escala nacional.',
      },
    ],
    stats: [
      { value: '20+', label: 'Anos de Mercado' },
      { value: 'B2B', label: 'Projetos Corporativos' },
      { value: 'Nacional', label: 'Cobertura' },
      { value: '2002', label: 'Desde' },
    ],
  },

  process: {
    label: 'Nosso Processo',
    headline: {
      before: 'Do',
      accent: 'Briefing',
      after: 'à Instalação',
    },
    subheadline:
      'Três etapas que eliminam o caos logístico e transformam complexidade em tranquilidade.',
    steps: [
      {
        num: '01',
        icon: 'document',
        title: 'Imersão Técnica e Briefing',
        description:
          'Diagnóstico completo das necessidades do projeto. Análise de superfícies, ambientes, normas técnicas e alinhamento com o manual da marca do cliente.',
      },
      {
        num: '02',
        icon: 'diamond',
        title: 'Produção Industrial Rigorosa',
        description:
          'Impressão de alta resolução, corte a laser e acabamento em ambiente controlado. Controle de qualidade em cada etapa para garantir fidelidade cromática absoluta.',
      },
      {
        num: '03',
        icon: 'truck',
        title: 'Instalação Nacional Segura',
        description:
          'Equipes especializadas para instalação em todo o território brasileiro. Logística coordenada com mínima interferência na operação do cliente.',
      },
    ],
  },

  materials: {
    label: 'Especificações Técnicas',
    headline: {
      before: 'Materiais e',
      accent: 'Competências',
    },
    subheadline:
      'Robustez técnica ao serviço da visibilidade corporativa. Cada material escolhido para maximizar durabilidade e impacto visual.',
    items: [
      {
        title: 'Painéis em ACM',
        description:
          'Aluminum Composite Material de alta resistência. Fachadas arquitetônicas com acabamento premium e durabilidade superior.',
      },
      {
        title: 'Lona de Alta Performance',
        description:
          'Impressão digital em lona tensionada para fachadas, banners e coberturas de grande formato com proteção UV.',
      },
      {
        title: 'Adesivação Veicular',
        description:
          'Envelopamento profissional com vinil automotivo de última geração. Proteção UV com fidelidade cromática absoluta.',
      },
      {
        title: 'Acrílicos e Letras em Alto Relevo',
        description:
          'Corte a laser de precisão para letreiros iluminados e sinalização arquitetônica com presença noturna imponente.',
      },
      {
        title: 'Estruturas Metálicas',
        description:
          'Chassi em aço galvanizado para suporte de painéis e fachadas. Engenharia estrutural certificada para grandes dimensões.',
      },
      {
        title: 'Impressão Digital Grandes Formatos',
        description:
          'Impressão em alta resolução até 5 metros de largura. Cores vibrantes com garantia de durabilidade em ambiente externo.',
      },
    ],
  },

  services: {
    label: 'Nossos Serviços',
    headline: {
      before: 'Verticais de',
      accent: 'Negócios',
    },
    subheadline:
      'Cada vertical com estratégia de marketing orientada ao resultado corporativo do seu nicho.',
    ctaText: 'Ver Portfólio Completo',
    items: [
      {
        title: 'Adesivação e Envelopamento de Frotas',
        description: 'Transforme cada veículo em mídia de alta presença. Identidade visual aplicada com acabamento profissional e proteção física para frotas corporativas de escala nacional.',
        image: 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.10.jpeg',
        gallery: [
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.10.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.10-2.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.10-1.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.09.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-16.39.08.jpeg',
        ],
        category: 'Frota',
        metric: 'Redução expressiva do CPM frente à mídia paga',
        link: 'https://pbcomunicacao.com.br/adesivacaode-veiculos/',
      },
      {
        title: 'Fachadas e Painéis Comerciais',
        description: 'Sinalização que estabelece autoridade instantânea no ponto de venda. O vendedor silencioso que trabalha 24 horas por dia, elevando o tráfego e o valor percebido da marca.',
        image: 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-18.41.23-1.jpeg',
        gallery: [
          'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-18.41.23-1.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2025/02/9EA2613C-F6A0-4C42-A65B-E2987F2A80D1.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2025/02/1813B02E-9ECB-4E1D-9B0B-0A4B3D783D55.jpeg',
          'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_59a6070bae6840a29b755f557458ce26mv2-e1737739974876.webp',
          'https://pbcomunicacao.com.br/wp-content/uploads/2025/02/AFFB26AE-86B6-4E4B-B845-60D5B8BB8D2A.jpeg',
        ],
        specs: ['P.S', 'ACM', 'Lona', 'Vidro', 'Acrílico'],
        category: 'Fachada',
        metric: 'Aumento no tráfego orgânico físico (Footfall)',
        link: 'https://pbcomunicacao.com.br/paineis/',
      },
      {
        title: 'Banners, Backdrops e Estruturas Móveis',
        description: 'Execução impecável sob pressão para feiras e congressos corporativos. Acabamento perfeito que garante que sua marca seja protagonista em ambientes de alta disputa.',
        image: 'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_e9e253adc5614f1eabf46449d1a19ee1mv2.webp',
        gallery: [
          'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_e9e253adc5614f1eabf46449d1a19ee1mv2.webp',
          'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_c110c6a390aa4d24a8628416e1fedfa4mv2.webp',
          'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_b6dee2d47fdd45e8a62a39661b983a3emv2.webp',
          'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/5bee2c_a8b4bba10dbf46e1aa14b9756c7cb905mv2.webp',
          'https://pbcomunicacao.com.br/wp-content/uploads/2025/02/IMG_6201.jpeg',
        ],
        specs: ['Bastão de Madeira', 'Alumínio', 'Ilhós', 'Roll-up', 'Pedestal'],
        category: 'Evento',
        metric: 'Impacto e geração de Leads em Eventos B2B',
        link: 'https://pbcomunicacao.com.br/banners/',
      },
      {
        title: 'PDVs e Sinalização de Ponto de Venda',
        description: 'Domínio do comportamento do shopper. Materiais de PDV que impulsionam decisões instintivas e convertem no corredor — a última milha do marketing de varejo.',
        image: '/assets/portfolio/pdv.webp',
        gallery: [
          '/assets/portfolio/pdv.webp',
          '/assets/portfolio/veiculos.webp',
          '/assets/portfolio/banners.webp',
          '/assets/portfolio/paineis.webp',
        ],
        category: 'PDV',
        metric: 'Conversão no Ponto de Venda e Compras por Impulso',
        link: 'https://pbcomunicacao.com.br/pdvs-e-materiais-diversos/',
      },
    ],
  },

  faq: {
    label: 'Dúvidas Frequentes',
    headline: {
      before: 'Perguntas',
      accent: 'Frequentes',
    },
    subheadline:
      'Esclarecimento tático das objeções mais comuns antes do seu contato.',
    items: [
      {
        q: 'Vocês realizam instalações em outros estados?',
        a: 'Sim, atuamos em todo o território nacional. Possuímos equipes especializadas e logística coordenada para instalação em qualquer estado do Brasil, garantindo o mesmo padrão de qualidade.',
      },
      {
        q: 'Qual a quantidade mínima de fornecimento?',
        a: 'Produção mínima de 1 m². Atendemos desde projetos pontuais até grandes encomendas corporativas com milhares de unidades.',
      },
      {
        q: 'Vocês elaboram o design das artes gráficas?',
        a: 'Focamos na produção industrial de alta performance. Entretanto, auxiliamos na adequação e finalização de artes para garantir a melhor qualidade de impressão e acabamento.',
      },
      {
        q: 'Como funciona a política de entregas?',
        a: 'Entrega garantida para a capital acima de R$ 300,00. Para demais regiões, realizamos envio por transportadora com rastreamento. Instalações são orçadas separadamente conforme a localização.',
      },
      {
        q: 'Qual a vida útil dos adesivos veiculares?',
        a: 'Os adesivos automotivos de última geração que utilizamos possuem vida útil média de 5 a 7 anos, dependendo das condições de exposição. Todos contam com laminação UV para proteção extra.',
      },
      {
        q: 'Qual o prazo médio de produção?',
        a: 'Varia conforme a complexidade e volume do projeto. Projetos padrão são entregues entre 5 a 15 dias úteis. Projetos de grande escala corporativa possuem cronograma dedicado com acompanhamento em tempo real.',
      },
    ],
  },

  form: {
    id: 'contato',
    kicker: 'Fale com a P&B',
    headline: {
      before: 'Conte seu projeto em',
      accent: '60 segundos',
    },
    subheadline:
      'Responda em menos de um minuto. Enviamos sua mensagem direto ao WhatsApp do comercial — sem cadastro, sem cookies, sem rastreamento.',
    fields: {
      name: { label: 'Nome', placeholder: 'Como devemos te chamar?', required: true },
      company: { label: 'Empresa (opcional)', placeholder: 'Nome da sua empresa' },
      contact: {
        label: 'E-mail ou WhatsApp',
        placeholder: 'voce@empresa.com.br ou (11) 99999-9999',
        required: true,
      },
      message: {
        label: 'Conte sobre seu projeto',
        placeholder: 'Ex.: adesivação de 20 veículos, fachada em ACM, sinalização interna…',
        required: true,
      },
    },
    consent: {
      label:
        'Li e concordo em compartilhar estes dados para que a P&B entre em contato sobre meu orçamento.',
      required: true,
    },
    submit: 'Enviar pelo WhatsApp',
    submitSecondary: 'Prefiro enviar por e-mail',
    successMessage:
      'Tudo certo! Abrimos o WhatsApp com sua mensagem — confira e aperte enviar.',
    lgpd: {
      title: 'Privacidade e LGPD',
      bullets: [
        'Coletamos apenas o necessário para responder: nome, contato e descrição do projeto.',
        'Nunca pedimos CPF, RG, endereço residencial ou dados financeiros neste formulário.',
        'Os dados não saem do seu navegador: são enviados direto ao WhatsApp/e-mail do comercial.',
        'Você pode pedir correção ou exclusão a qualquer momento pelo e-mail do DPO.',
      ],
      dpoLabel: 'Encarregado de Dados (DPO):',
    },
  },

  ctaBanner: {
    headline: {
      before: 'Sua marca merece a mesma',
      accent: 'autoridade das maiores',
      lineBreak: true,
    },
    subheadline:
      'Transforme espaços e ativos em ferramentas de visibilidade corporativa. Solicite seu orçamento e inicie seu projeto hoje.',
    ctas: [
      { text: 'Solicite seu Orçamento', variant: 'primary' },
      { text: '(11) 3836-0196', variant: 'phone' },
    ],
    trustLine:
      'Atendimento corporativo • Orçamento sem compromisso • Resposta em até 24h',
  },

  footer: {
    description:
      'Desde 2002 desenvolvemos projetos de comunicação visual, impressão, produção e instalação para tornar marcas cada vez mais visíveis e próximas de seus clientes.',
    copyright: 'P&B Comunicação Visual. Todos os direitos reservados.',
    location: 'Lapa, São Paulo — SP • Desde 2002',
  },
};
