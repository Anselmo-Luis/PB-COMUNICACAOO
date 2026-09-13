import { buildWhatsAppLink } from '../utils/whatsapp';
import galleryImageRatios from './galleryImageRatios.json';

const WHATSAPP_PHONE = '5511965698725';

const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, P&B Comunicação Visual! Cheguei aqui pelo site e gostaria de solicitar um orçamento de comunicação visual (adesivação de veículos, adesivação geral, banner/lona ou PDV). Podem me passar as informações?';

function buildWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return buildWhatsAppLink(WHATSAPP_PHONE, message);
}

const FALLBACK_RATIO = 4 / 3;

const galleryImage = (folder, file, alt) => {
  const src = `/assets/gallery/${folder}/${file}.webp`;
  const meta = galleryImageRatios[src];

  return {
    src,
    alt,
    width: meta?.width ?? 800,
    height: meta?.height ?? 600,
    ratio: meta ? meta.width / meta.height : FALLBACK_RATIO,
  };
};

const project = (id, category, title, images) => ({ id, category, title, images });

export const siteData = {
  company: {
    name: 'P&B Comunicação Visual',
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
    whatsappUrl: buildWhatsAppUrl(),
    location: {
      lat: -23.5213003,
      lng: -46.7062256,
      zoom: 16,
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
    mobileMenuCloseLabel: 'Fechar menu',
  },

  hero: {
    headline: '24 anos.',
    highlight: 'Causando impacto.',
    intro: {
      mark: 'Somos',
      text: 'a P&B Comunicação Visual.',
    },
    subheadline: [
      'Desde 2002, tornamos marcas mais visíveis, próximas e admiradas.',
      'Entregamos comunicação visual completa: impressão, acabamento e instalação com padrão.',
      'Agilidade máxima e compromisso absoluto.',
    ],
    video: {
      poster: '/assets/hero/hero-van-decal-poster.jpg',
      posterSrcSet: '/assets/hero/hero-van-decal-poster.jpg',
      sources: [{ src: '/assets/hero/hero-van-decal.mp4', type: 'video/mp4' }],
    },
  },

  clients: {
    label: 'Clientes',
    logos: [
      { name: 'JBS', src: '/assets/clients/jbs-1.jpg' },
      { name: 'Swift', src: '/assets/clients/swift-1.jpg' },
      { name: 'Friboi', src: '/assets/clients/friboi-1.jpg' },
      { name: 'Seara', src: '/assets/clients/seara-1.jpg' },
      { name: 'Vigor', src: '/assets/clients/vigor-1.jpg' },
      { name: 'Mapfre', src: '/assets/clients/mapfre.jpg' },
      { name: 'Mahogany', src: '/assets/clients/mahogany.jpg' },
      { name: 'Açovisa', src: '/assets/clients/acovisa.jpg' },
      { name: 'Viveo', src: '/assets/clients/viveo.jpg' },
      { name: 'Hinode', src: '/assets/clients/hinode.jpg' },
      { name: 'Adias', src: '/assets/clients/adias.png' },
      { name: 'Auto Glass', src: '/assets/clients/auto-glass.jpg' },
      { name: 'Sabesp', src: '/assets/clients/sabesp.jpg' },
      { name: 'EDP Energia', src: '/assets/clients/edp.jpg' },
      { name: 'Sonda', src: '/assets/clients/sonda.png?v=gemini' },
    ],
  },

  whyUs: {
    label: 'Resultados',
    headline: {
      before: 'Por que empresas',
      accent: 'escolhem a P&B',
      after: '',
    },
    subheadline:
      'Projetos pensados para dar presença à marca, facilitar a operação e transformar cada ponto de contato em uma experiência consistente.',
    benefits: [
      {
        icon: 'eye',
        title: 'Presença que trabalha todos os dias',
        description:
          'Aplicamos a identidade da sua marca em veículos, ambientes e materiais para que ela seja reconhecida em cada rota, loja e ponto de venda.',
      },
      {
        icon: 'layers',
        title: 'Padronização em qualquer escala',
        description:
          'Do projeto pontual à operação nacional, mantemos acabamento, cor e aplicação alinhados ao padrão visual que a sua empresa precisa.',
      },
      {
        icon: 'timer',
        title: 'Agilidade que não deixa sua marca parada',
        description:
          'Campanha, inauguração ou troca de frota: sua marca precisa estar visível no momento certo. Entregamos com rapidez para você não perder oportunidade.',
      },
    ],
    stats: [
      { value: '24 anos', label: 'Construindo marcas visíveis' },
      { value: 'B2B + B2C', label: 'Um parceiro, dois mercados' },
      { value: 'Brasil inteiro', label: 'Instalação onde sua marca for' },
      { value: 'Ponta a ponta', label: 'Do briefing à instalação' },
    ],
  },

  process: {
    label: 'Nosso Processo',
    headline: {
      before: 'Do ',
      accent: 'Briefing',
      after: ' à Instalação',
    },
    subheadline:
      'Do primeiro alinhamento à instalação, cada etapa é conduzida com clareza, cuidado e padrão de entrega.',
    steps: [
      {
        num: '01',
        icon: 'clipboard',
        title: 'Analisamos seu projeto',
        description:
          'Levantamento técnico completo e alinhamento com o manual da sua marca para garantir fidelidade total ao padrão.',
      },
      {
        num: '02',
        icon: 'printer',
        title: 'Produzimos com rigor',
        description:
          'Impressão em alta resolução e acabamento, com controle de qualidade.',
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
    label: 'Materiais e aplicações',
    headline: {
      before: 'Materiais que dão forma',
      accent: 'à sua marca',
    },
    subheadline:
      'Escolhemos cada solução pela qualidade da aplicação, pela leitura da marca e pelo resultado no ambiente.',
    video: {
      label: 'Adesivação de frota',
      src: '/assets/materials/jbs-fazer-o-bem.mp4',
      poster: '/assets/materials/jbs-fazer-o-bem-poster.jpg',
      alt: 'Carreta JBS Fazer o Bem com adesivação completa de baú',
      width: 480,
      height: 848,
    },
    items: [
      {
        title: 'Adesivação de veículos',
        description: 'Adesivo de alta performance.',
        specs: ['Carros', 'Vans', 'Caminhões', 'Carretas', 'Ônibus', 'Frotas'],
        image: '/assets/materials/veiculos-seara.webp',
        alt: 'Veículo Seara adesivado',
      },
      {
        title: 'Painéis com e sem Estrutura',
        description:
          'Painéis para fachadas, ambientes internos e sinalização, com ou sem estrutura de fixação.',
        specs: ['P.S', 'ACM', 'Lona', 'Vidro', 'Acrílico'],
        image: '/assets/gallery/paineis/paineis-06.webp',
        alt: 'Painel corporativo em ambiente interno',
      },
      {
        title: 'Lona',
        description:
          'Impressão digital em lona tensionada para fachadas, banners e painéis.',
        specs: ['Bastão de madeira', 'Alumínio', 'Ilhós', 'Pedestais', 'Roll-up'],
        image: '/assets/materials/lona.webp',
        alt: 'Lona impressa em grande formato',
      },
      {
        title: 'Material Ponto de Venda',
        description:
          'Peças e aplicações que destacam produtos, ofertas e experiências no ponto de venda.',
        specs: [
          'Tag',
          'Totem',
          'Móbile',
          'Display',
          'Stopper',
          'Wobbler',
          'Letra bloco',
          'Faixa de gôndola',
          'Manta magnética',
        ],
        image: '/assets/materials/pdv.webp',
        alt: 'Material de comunicação em ponto de venda',
      },
      {
        title: 'Adesivação em geral',
        description:
          'Adesivação em geral, com verniz e laminado adequado para qualquer superfície lisa.',
        specs: ['Pisos', 'Vidros', 'Paredes', 'Madeiras', 'Elevadores', 'Geladeiras / Freezers'],
        image: '/assets/materials/adesivos-swift.webp',
        alt: 'Adesivação Swift Klabin',
      },
      {
        title: 'Impressão digital',
        descriptionLines: [
          'Impressão em alta resolução',
          'Cores vibrantes com garantia de durabilidade em ambiente externo.',
        ],
        image: '/assets/materials/impressao.webp',
        alt: 'Impressão digital em alta resolução',
      },
    ],
  },

  services: {
    label: 'Soluções P&B',
    headline: {
      before: 'Comunicação visual',
      accent: 'completa',
    },
    subheadline:
      'Do veículo ao ponto de venda, reunimos produção, acabamento e instalação para dar consistência à presença da sua marca.',
    ctaText: 'Ver projetos desta categoria',
    items: [
      {
        title: 'Adesivação de Veículos',
        description: 'Adesivação de carros, vans e frotas com aplicação precisa, acabamento limpo e identidade alinhada à sua marca.',
        image: '/assets/gallery/veiculos/veiculo-06.webp',
        gallery: [
          '/assets/gallery/veiculos/veiculo-02.webp',
          '/assets/gallery/veiculos/veiculo-22.webp',
          '/assets/gallery/veiculos/veiculo-06.webp',
          '/assets/gallery/frota/frota-02.webp',
          '/assets/gallery/frota/frota-10.webp',
        ],
        category: 'Adesivação de veículos',
        metric: 'Sua marca em movimento todos os dias',
        icon: 'vehicle',
      },
      {
        title: 'Adesivação Geral',
        description:
          'Adesivação em geral, com verniz e laminado adequado para qualquer superfície lisa: pisos, vidros, paredes, madeiras, elevadores e geladeiras/freezers.',
        image: '/assets/gallery/fachadas/swift-klabin-01.webp',
        gallery: [
          '/assets/gallery/fachadas/swift-klabin-01.webp',
          '/assets/gallery/paineis/paineis-02.webp',
          '/assets/gallery/paineis/painel-02.webp',
          '/assets/gallery/paineis/painel-03.webp',
          '/assets/gallery/paineis/paineis-18.webp',
          '/assets/gallery/banners/banners-05.webp',
          '/assets/gallery/banners/banners-06.webp',
          '/assets/gallery/totens/totens-02.webp',
          '/assets/gallery/fachadas/fachadas-06.webp',
        ],
        category: 'Adesivação geral',
        metric: 'Ambientes mais claros, consistentes e memoráveis',
        icon: 'general',
      },
      {
        title: 'Banner / Lona',
        description: 'Impressão de grande formato para campanhas, fachadas, eventos e comunicações que precisam aparecer.',
        image: '/assets/gallery/banners/banner-02.webp',
        gallery: [
          '/assets/gallery/banners/banner-01.webp',
          '/assets/gallery/banners/banner-03.webp',
          '/assets/gallery/banners/banner-06.webp',
          '/assets/gallery/banners/banner-07.webp',
          '/assets/gallery/banners/banner-10.webp',
        ],
        specs: ['Bastão de madeira', 'Alumínio', 'Ilhós', 'Pedestais', 'Roll-up'],
        category: 'Banner / Lona',
        metric: 'Comunicação de alto impacto em grande escala',
        icon: 'banner',
      },
      {
        title: 'PDVs e materiais diversos',
        description: 'Materiais para destacar produtos, orientar jornadas e deixar a experiência da marca mais presente no ponto de venda.',
        image: '/assets/gallery/paineis/painel-13.webp',
        gallery: [
          '/assets/gallery/paineis/paineis-05.webp',
          '/assets/gallery/paineis/paineis-07.webp',
          '/assets/gallery/paineis/paineis-10.webp',
          '/assets/gallery/paineis/painel-13.webp',
          '/assets/gallery/fachadas/fachadas-05.webp',
          '/assets/gallery/paineis/paineis-03.webp',
          '/assets/gallery/paineis/painel-11.webp',
          '/assets/gallery/banners/banners-01.webp',
          '/assets/gallery/banners/banners-04.webp',
        ],
        specs: ['PDV', 'Displays', 'Materiais promocionais'],
        category: 'PDVs e materiais diversos',
        metric: 'Mais presença no momento da decisão',
        icon: 'pdv',
      },
    ],
  },

  portfolio: {
    title: 'Portfólio',
    subheadline:
      'Trabalhos reais de adesivação, impressão e materiais que colocam marcas em movimento.',
    categories: [
      { id: 'vehicles', label: 'Adesivação de veículos' },
      { id: 'general', label: 'Adesivação geral' },
      { id: 'banner', label: 'Banner / Lona' },
      { id: 'pdv', label: 'PDVs e materiais diversos' },
      { id: 'producao', label: 'Produção', videoOnly: true },
    ],
    projects: [
      project('vehicle-lana-cozinha', 'vehicles', 'Lá na Cozinha', [
        galleryImage('veiculos', 'veiculo-01', 'Veículo Lá na Cozinha personalizado com aplicação gráfica'),
      ]),
      project('vehicle-louv-clean', 'vehicles', 'Louv Clean', [
        galleryImage('veiculos', 'veiculo-02', 'Veículo Louv Clean personalizado com aplicação gráfica'),
      ]),
      project('vehicle-instituto-taupet', 'vehicles', 'Instituto Taupet', [
        galleryImage('veiculos', 'veiculo-03', 'Van Instituto Taupet personalizada com identidade visual'),
      ]),
      project('vehicle-cef-distribuidora', 'vehicles', 'C&F Distribuidora', [
        galleryImage('veiculos', 'veiculo-04', 'Caminhão C&F Distribuidora com adesivação de alta performance'),
      ]),
      project('vehicle-cartao-todos', 'vehicles', 'Cartão de TODOS / Rio de Prêmios', [
        galleryImage('veiculos', 'veiculo-17', 'Veículo Cartão de TODOS adesivado'),
        galleryImage('veiculos', 'veiculo-20', 'Veículo Rio de Prêmios adesivado'),
      ]),
      project('vehicle-auto-glass', 'vehicles', 'Auto Glass', [
        galleryImage('veiculos', 'veiculo-11', 'Veículo Auto Glass adesivado em vista lateral'),
        galleryImage('veiculos', 'veiculo-12', 'Veículo Auto Glass adesivado em outro ângulo'),
      ]),
      project('vehicle-friboi', 'vehicles', 'Friboi', [
        galleryImage('veiculos', 'veiculo-06', 'Veículo Friboi adesivado em vista lateral'),
        galleryImage('veiculos', 'veiculo-07', 'Veículo Friboi adesivado em outro ângulo'),
        galleryImage('veiculos', 'veiculo-08', 'Detalhe da adesivação Friboi'),
      ]),
      project('vehicle-swift', 'vehicles', 'Swift', [
        galleryImage('veiculos', 'veiculo-09', 'Veículo Swift adesivado'),
        galleryImage('veiculos', 'veiculo-14', 'Veículo Swift e Degusta adesivado'),
        galleryImage('frota', 'frota-18', 'Veículo Swift de frota em campo'),
      ]),
      project('vehicle-attos-rh', 'vehicles', 'Attos RH', [
        galleryImage('veiculos', 'veiculo-10', 'Veículo Attos RH personalizado com identidade visual'),
      ]),
      project('vehicle-roadstar', 'vehicles', 'Roadstar', [
        galleryImage('veiculos', 'veiculo-05', 'Carro Roadstar com comunicação visual aplicada'),
      ]),
      project('vehicle-vigor', 'vehicles', 'Vigor', [
        galleryImage('veiculos', 'veiculo-15', 'Veículo Vigor adesivado'),
        galleryImage('frota', 'frota-05', 'Veículo Vigor de frota em campo'),
      ]),
      project('vehicle-sabesp-frota', 'vehicles', 'Sabesp', [
        galleryImage('frota', 'frota-15', 'Picape Sabesp adesivada em vista lateral'),
        galleryImage('frota', 'frota-13', 'Picape Sabesp adesivada em vista frontal'),
        galleryImage('frota', 'frota-17', 'Picape Sabesp adesivada em vista traseira'),
      ]),
      project('vehicle-jbs', 'vehicles', 'JBS', [
        galleryImage('frota', 'frota-03', 'Caminhão JBS adesivado'),
      ]),
      project('vehicle-seara-truck', 'vehicles', 'Seara', [
        galleryImage('veiculos', 'veiculo-22', 'Caminhão Seara adesivado'),
      ]),
      project('vehicle-nocarbon', 'vehicles', 'NoCarbon', [
        galleryImage('veiculos', 'veiculo-16', 'Veículo NoCarbon adesivado'),
        galleryImage('frota', 'frota-02', 'Caminhão NoCarbon adesivado'),
        galleryImage('frota', 'frota-04', 'Caminhão NoCarbon em outro ângulo'),
      ]),
      project('vehicle-seara', 'vehicles', 'Seara', [
        galleryImage('frota', 'frota-08', 'Veículo Seara adesivado'),
        galleryImage('frota', 'frota-12', 'Veículo Seara em outro ângulo'),
      ]),
      project('vehicle-torra', 'vehicles', 'Torra', [
        galleryImage('veiculos', 'veiculo-13', 'Veículo Torra adesivado'),
        galleryImage('frota', 'frota-11', 'Veículo Torra de frota em campo'),
      ]),
      project('vehicle-sabesp', 'vehicles', 'Sabesp', [
        galleryImage('veiculos', 'veiculo-18', 'Van Sabesp adesivada em vista lateral'),
        galleryImage('veiculos', 'veiculo-21', 'Van Sabesp adesivada em outro ângulo'),
        galleryImage('veiculos', 'veiculo-19', 'Van Sabesp adesivada em vista traseira'),
      ]),
      project('vehicle-uol', 'vehicles', 'UOL', [
        galleryImage('frota', 'frota-09', 'Veículo UOL adesivado'),
      ]),
      project('vehicle-edp', 'vehicles', 'EDP Energia', [
        galleryImage('frota', 'frota-10', 'Veículo EDP Energia adesivado'),
      ]),
      project('vehicle-correios', 'vehicles', 'Correios', [
        galleryImage('frota', 'frota-06', 'Van Correios adesivada com campanha "A vida segue"'),
      ]),
      project('vehicle-smart-fit', 'vehicles', 'Smart Fit', [
        galleryImage('frota', 'frota-16', 'Smart Truck Smart Fit adesivado'),
      ]),
      project('vehicle-jamtur', 'vehicles', 'Jamtur', [
        galleryImage('frota', 'frota-20', 'Ônibus Jamtur Viagens e Turismo adesivado'),
      ]),

      project('general-swift-klabin', 'general', 'Swift', [
        galleryImage('fachadas', 'fachadas-04', 'Fachada Swift Cambuci com comunicação visual'),
      ]),
      project('general-jbs-facade', 'general', 'JBS', [
        galleryImage('fachadas', 'fachadas-06', 'Fachada JBS com comunicação visual'),
      ]),
      project('general-jbs-mural', 'general', 'JBS', [
        galleryImage('paineis', 'painel-03', 'Mural JBS com arquitetura de marcas em parede'),
        galleryImage('paineis', 'paineis-13', 'Parede corporativa com adesivação de marcas JBS'),
      ]),
      project('general-jbs-parede', 'general', 'JBS', [
        galleryImage('paineis', 'painel-01', 'Adesivação de parede JBS em ambiente corporativo'),
      ]),
      project('general-vigor', 'general', 'Vigor', [
        galleryImage('paineis', 'paineis-01', 'Adesivação de parede Vigor VIV em ambiente corporativo'),
      ]),
      project('general-vigor-logo', 'general', 'Vigor', [
        galleryImage('paineis', 'paineis-02', 'Adesivação de parede com logotipo Vigor'),
      ]),
      project('general-delicia', 'general', 'Delícia', [
        galleryImage('paineis', 'paineis-04', 'Adesivação de parede Delícia em ambiente interno'),
      ]),
      project('general-lactalis', 'general', 'Lactalis', [
        galleryImage('paineis', 'paineis-08', 'Adesivação de parede Lactalis em sala corporativa'),
      ]),
      project('general-soul-brasileira', 'general', 'Soul Brasileira', [
        galleryImage('paineis', 'paineis-15', 'Adesivação de parede Soul Brasileira'),
      ]),
      project('general-bonafont', 'general', 'Bonafont', [
        galleryImage('paineis', 'painel-09', 'Fachada adesivada Bonafont'),
      ]),
      project('general-seara-marcas', 'general', 'Seara', [
        galleryImage('totens', 'totens-05', 'Totem de sinalização com marcas Seara'),
      ]),
      project('general-future-intelbras', 'general', 'Future Intelbras', [
        galleryImage('paineis', 'painel-14', 'Adesivação de parede Future Intelbras'),
      ]),
      project('general-parque-bruno-covas-acesso', 'general', 'Parque Bruno Covas', [
        galleryImage('totens', 'totens-03', 'Totem Santander Parque Bruno Covas de entrada de veículos'),
      ]),
      project('general-shopping-best-center', 'general', 'Best Center', [
        galleryImage('totens', 'totens-02', 'Totem de sinalização do shopping Best Center'),
      ]),
      project('general-sanfra-kids', 'general', 'Sanfra Kids', [
        galleryImage('paineis', 'paineis-09', 'Adesivação de parede Ludoteca Sanfra Kids em ambiente infantil'),
      ]),
      project('general-nescau', 'general', 'Nescau', [
        galleryImage('banners', 'banners-05', 'Adesivação em escada rolante Nescau'),
      ]),
      project('general-totens-diversos', 'general', 'Totens diversos', [
        galleryImage('paineis', 'paineis-14', 'Totens Seara e JBS em ambiente corporativo'),
      ]),
      project('general-parque-global', 'general', 'Parque Global', [
        galleryImage('totens', 'totens-04', 'Totem de sinalização Parque Global'),
      ]),
      project('general-parque-bruno-covas', 'general', 'Parque Bruno Covas', [
        galleryImage('totens', 'totens-01', 'Totem Santander Parque Bruno Covas de sinalização esportiva'),
        galleryImage('totens', 'totens-07', 'Totem Santander Parque Bruno Covas de entrada de veículos'),
      ]),
      project('general-mma-octagon', 'general', 'Krew Krew', [
        galleryImage('paineis', 'paineis-16', 'Adesivação de octógono de MMA Krew Krew'),
      ]),
      project('general-jbs-evento', 'general', 'JBS', [
        galleryImage('paineis', 'painel-06', 'Painel JBS para evento corporativo'),
      ]),
      project('general-hope', 'general', 'Hope', [
        galleryImage('paineis', 'paineis-11', 'Painel Hope em circulação de shopping'),
      ]),
      project('general-sonda-supermercados', 'general', 'Sonda Supermercados', [
        galleryImage('paineis', 'paineis-18', 'Adesivação em escada rolante Sonda Supermercados'),
      ]),
      project('general-prime-comfort', 'general', 'Prime Comfort', [
        galleryImage('paineis', 'painel-12', 'Fachada Prime Comfort com adesivação de parede'),
      ]),
      project('general-unhas-cariocas', 'general', 'Unhas Cariocas', [
        galleryImage('paineis', 'paineis-17', 'Adesivação Unhas Cariocas em portas de banheiro comercial'),
      ]),
      project('general-batavo', 'general', 'Batavo', [
        galleryImage('banners', 'banners-06', 'Adesivação de porta de elevador Batavo'),
      ]),
      project('general-gregario', 'general', 'Gregario', [
        galleryImage('paineis', 'painel-16', 'Painel Gregario Cycling em mídia externa'),
      ]),
      project('general-gregario-comemorativo', 'general', 'Gregario', [
        galleryImage('paineis', 'painel-05', 'Painel Gregario Cycling comemorativo'),
      ]),
      project('general-jbs-paineis', 'general', 'JBS', [
        galleryImage('paineis', 'paineis-12', 'Painel corporativo JBS em recepção'),
      ]),
      project('general-bis', 'general', 'BIS', [
        galleryImage('paineis', 'paineis-19', 'Adesivação de piso BIS em corredor de supermercado'),
      ]),
      project('general-jbs-65-anos', 'general', 'JBS', [
        galleryImage('paineis', 'painel-10', 'Painel JBS 65 anos'),
      ]),

      project('banner-contax-nespresso', 'banner', 'Contax / Nespresso', [
        galleryImage('banners', 'banner-01', 'Banner Training Day Contax e Nespresso'),
      ]),
      project('banner-brinde-a-vida', 'banner', 'Brinde à Vida', [
        galleryImage('banners', 'banner-02', 'Banner Brinde à vida'),
      ]),
      project('banner-korin', 'banner', 'Korin', [
        galleryImage('banners', 'banner-03', 'Banner Korin Agricultura Natural'),
      ]),
      project('banner-la-fleur-lepine', 'banner', 'La Fleur / L’Epine', [
        galleryImage('banners', 'banner-04', 'Banner La Fleur e L’Epine'),
      ]),
      project('banner-feira-carandai', 'banner', 'Feira de Comida Carandaí', [
        galleryImage('banners', 'banner-08', 'Banner Feira de Comida Carandaí'),
      ]),
      project('banner-backdrop-corporativo', 'banner', 'Backdrop corporativo', [
        galleryImage('banners', 'banner-05', 'Backdrop com logos corporativos'),
      ]),
      project('banner-seara-gourmet', 'banner', 'Seara Gourmet', [
        galleryImage('banners', 'banner-10', 'Banner Seara Gourmet'),
      ]),
      project('banner-big-x-picanha', 'banner', 'Big X Picanha', [
        galleryImage('banners', 'banner-06', 'Banner Big X Picanha'),
      ]),
      project('banner-santander', 'banner', 'Santander', [
        galleryImage('paineis', 'painel-04', 'Painel Santander em mídia externa'),
      ]),
      project('banner-jabra', 'banner', 'Jabra Evolve', [
        galleryImage('banners', 'banner-09', 'Banner Jabra Evolve'),
      ]),
      project('banner-swift-carrefour', 'banner', 'Swift', [
        galleryImage('paineis', 'painel-15', 'Painel Swift reinauguração Carrefour'),
      ]),
      project('banner-palmolive', 'banner', 'Palmolive Amazônia', [
        galleryImage('banners', 'banner-07', 'Banner Palmolive Amazônia'),
      ]),
      project('banner-santander-bruno-covas', 'banner', 'Santander', [
        galleryImage('totens', 'totens-06', 'Painel Santander Parque Bruno Covas com início das obras'),
      ]),
      project('banner-media-externa', 'banner', 'Painel em mídia externa', [
        galleryImage('paineis', 'painel-08', 'Painel em mídia externa'),
      ]),

      project('pdv-mahogany', 'pdv', 'Mahogany', [
        galleryImage('fachadas', 'fachadas-05', 'Vitrine Mahogany em shopping'),
      ]),
      project('pdv-prudential', 'pdv', 'Prudential', [
        galleryImage('paineis', 'paineis-07', 'Material Prudential em ponto de venda'),
      ]),
      project('pdv-samsung', 'pdv', 'Samsung', [
        galleryImage('paineis', 'painel-13', 'Material Samsung em ponto de venda'),
      ]),
      project('pdv-hinode', 'pdv', 'Hinode', [
        galleryImage('paineis', 'paineis-05', 'Material Hinode em ponto de venda'),
        galleryImage('paineis', 'paineis-10', 'Aplicação Hinode em ponto de venda'),
      ]),
      project('pdv-materials', 'pdv', 'Materiais diversos', [
        galleryImage('paineis', 'paineis-03', 'Mural corporativo em ponto de venda'),
        galleryImage('banners', 'banners-01', 'Cenografia promocional em ponto de venda'),
      ]),
      project('pdv-vb-salao-beleza', 'pdv', 'VB Salão de Beleza', [
        galleryImage('paineis', 'painel-11', 'Painel luminoso VB Salão de Beleza'),
      ]),
      project('pdv-emily-in-paris', 'pdv', 'Emily in Paris', [
        galleryImage('banners', 'banners-04', 'Display promocional Emily in Paris em ponto de venda'),
      ]),
    ],
    videos: [
      {
        id: 'production-printing-vinyl',
        src: '/assets/gallery/producao/producao-impressao-vinil-verde.mp4',
        poster: '/assets/gallery/producao/producao-impressao-vinil-verde-poster.jpg',
        alt: 'Impressora digital em funcionamento produzindo lona',
      },
      {
        id: 'production-printing-seara',
        src: '/assets/gallery/producao/producao-impressao-seara.mp4',
        poster: '/assets/gallery/producao/producao-impressao-seara-poster.jpg',
        alt: 'Impressão digital colorida em produção',
      },
      {
        id: 'production-printing-medalhista',
        src: '/assets/gallery/producao/producao-impressao-medalhista.mp4',
        poster: '/assets/gallery/producao/producao-impressao-medalhista-poster.jpg',
        alt: 'Impressão digital de banner em produção',
      },
      {
        id: 'production-wall-forest',
        src: '/assets/gallery/producao/producao-adesivacao-parede-floresta.mp4',
        poster: '/assets/gallery/producao/producao-adesivacao-parede-floresta-poster.jpg',
        alt: 'Adesivação de parede com paisagem de floresta',
      },
      {
        id: 'production-wall-city',
        src: '/assets/gallery/producao/producao-adesivacao-parede-cidade.mp4',
        poster: '/assets/gallery/producao/producao-adesivacao-parede-cidade-poster.jpg',
        alt: 'Adesivação de parede com paisagem urbana',
      },
      {
        id: 'production-wall-office',
        src: '/assets/gallery/producao/producao-adesivacao-parede-escritorio.mp4',
        poster: '/assets/gallery/producao/producao-adesivacao-parede-escritorio-poster.jpg',
        alt: 'Adesivação de parede em ambiente de escritório',
      },
      {
        id: 'production-facade',
        src: '/assets/gallery/producao/producao-fachada-pb.mp4',
        poster: '/assets/gallery/producao/producao-fachada-pb-poster.jpg',
        alt: 'Fachada da P&B Comunicação Visual',
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
        a: 'Focamos na produção com controle de qualidade. Também auxiliamos na adequação e finalização das artes para garantir a melhor qualidade de impressão e acabamento.',
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
    copyright: 'P&B Comunicação Visual. Todos os direitos reservados.',
    location: 'Lapa, São Paulo — SP • Desde 2002',
  },
};
