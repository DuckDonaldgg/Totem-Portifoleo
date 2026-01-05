import type { PortfolioItem } from '@/ai/flows/recommend-related-content';

export type PhotoItem = { url: string; hint: string; legend?: string };

export type MediaQueueItem =
  | { type: 'video'; id: string; objectFit?: 'cover' | 'contain'; metadata?: Record<string, any> }
  | { type: 'photos'; items: PhotoItem[]; objectFit?: 'cover' | 'contain'; metadata?: Record<string, any> };

export const mediaQueue: MediaQueueItem[] = [
  {
    type: 'photos',
    items: [
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/working-hard-to-finish-the-high-speed_t20_dpNYG3-large.jpg', hint: 'Construção de estradas', legend: 'Desenvolvimento de infraestrutura alinhado com padrões de engenharia de ponta.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/brandon-wong-263455-unsplash-scaled.jpg', hint: 'Estruturas', legend: 'Soluções estruturais robustas para desafios industriais complexos.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/warehouse-storage-distribution-goods-industry-stock-shelf-industrial-storehouse-business-depot-rack_t20_RzWeaX.jpg', hint: 'Armazenamento e distribuição', legend: 'Logística otimizada e sistemas de armazenamento para máxima eficiência.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/large-oil-refinery-plant-by-the-river_t20_Nx0WJE-Large.jpg', hint: 'Refinaria de petróleo', legend: 'Tecnologias avançadas para o setor de refino de óleo e gás.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/windmills-on-the-road-while-driving-in-the-mountains-a-windmill-is-a-type-of-working-engine-it_t20_OxlVPb.jpg', hint: 'Turbinas eólicas', legend: 'Soluções de energia sustentável impulsionando um futuro mais verde.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/belfast-harbour-we-build-some-of-the-worlds-largest-structures-even-if-you-dont-agree-with-mining_t20_e8L9wm.jpg', hint: 'Plataformas de petróleo', legend: 'Excelência em engenharia offshore para ambientes extremos.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/quimica.jpeg', hint: 'laboratório de química', legend: 'Análise de precisão e inovações em processamento químico.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0004_maquinas-industriais-usadas-wfa-1.jpg', hint: 'maquinário industrial', legend: 'Maquinário de alto desempenho para automação industrial.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0008_alimenticia2-scaled-1.jpg', hint: 'indústria alimentícia', legend: 'Estabelecendo padrões em segurança e eficiência no processamento de alimentos.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0007_automitivo-scaled-1.jpg', hint: 'fabricação automotiva', legend: 'Acelerando o crescimento no setor de fabricação automotiva.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0006_embalagens.jpg', hint: 'embalagens', legend: 'Soluções inovadoras de embalagem para as necessidades do consumidor moderno.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0003_metalurgica4-scaled-1.jpg', hint: 'metalurgia', legend: 'Expertise metalúrgica para componentes duráveis e confiáveis.' },
      { url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0002_oleo-e-gas.jpg', hint: 'indústria de óleo e gás', legend: 'Serviços abrangentes para toda a cadeia de valor de óleo e gás.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2025/12/Captura-de-tela-2025-12-19-165630.png', hint: 'interface de painel 1', legend: 'Visualização de dados em tempo real para tomada de decisão informada.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2025/12/Captura-de-tela-2025-12-19-165715.png', hint: 'interface de painel 2', legend: 'Painéis interativos adaptados às métricas do seu negócio.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2025/12/Captura-de-tela-2025-12-19-165743.png', hint: 'interface de painel 3', legend: 'Integração contínua de fontes de dados díspares.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2025/12/Sem-titulo-1.png', hint: 'visualização de gráficos', legend: 'Análise avançada identificando tendências e oportunidades.' },
      { url: 'http://protaquions.com.br/wp-content/uploads/2022/02/papelecelulose.jpg', hint: 'indústria de papel e celulose', legend: 'Processos eficientes para a indústria de papel e celulose.' },
    ],

    metadata: { theme: 'Industrial Sectors', tags: ['industry', 'machinery', 'production'] },
  },
  {
    type: 'video',
    id: '0qhEbi5jlMw',
    metadata: { title: 'Industrial Automation Showcase', tags: ['industrial', 'automation', 'robotics'] },
  },
];

export const allPortfolioItems: PortfolioItem[] = [
  // Videos from queue
  { type: 'video', url: 'https://youtu.be/0qhEbi5jlMw', metadata: { title: 'Industrial Automation Showcase', tags: ['industrial', 'automation', 'robotics'], category: 'Technology' } },
  // Other videos
  { type: 'video', url: 'https://www.youtube.com/watch?v=rokGy0huYEA', metadata: { tags: ['music', 'lofi', 'relaxing'], category: 'Music' } },
  { type: 'video', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A', metadata: { tags: ['nature', 'drone', '4k'], category: 'Nature' } },
  { type: 'video', url: 'https://www.youtube.com/watch?v=3g33_wH_9so', metadata: { tags: ['abstract', 'visuals', 'cgi'], category: 'Animation' } },
  { type: 'video', url: 'https://www.youtube.com/watch?v=khen_Lk3pL8', metadata: { tags: ['cyberpunk', 'city', 'night'], category: 'Sci-Fi' } },

  // Photos from queue
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0000_quimica-1-scaled-1.jpg', metadata: { tags: ['chemistry', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0004_maquinas-industriais-usadas-wfa-1.jpg', metadata: { tags: ['machinery', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0008_alimenticia2-scaled-1.jpg', metadata: { tags: ['food industry', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0007_automitivo-scaled-1.jpg', metadata: { tags: ['automotive', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0006_embalagens.jpg', metadata: { tags: ['packaging', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0003_metalurgica4-scaled-1.jpg', metadata: { tags: ['metallurgy', 'industrial'], category: 'Industry' } },
  { type: 'photo', url: 'https://protaquions.com.br/wp-content/uploads/2022/06/0002_oleo-e-gas.jpg', metadata: { tags: ['oil and gas', 'industrial'], category: 'Industry' } },

  // Other photos
  { type: 'photo', url: 'https://picsum.photos/seed/101/1920/1080', metadata: { tags: ['landscape', 'mountains', 'forest'], category: 'Nature' } },
  { type: 'photo', url: 'https://picsum.photos/seed/102/1920/1080', metadata: { tags: ['nature', 'lake', 'serene'], category: 'Nature' } },
  { type: 'photo', url: 'https://picsum.photos/seed/103/1920/1080', metadata: { tags: ['woods', 'path', 'autumn'], category: 'Nature' } },
  { type: 'photo', url: 'https://picsum.photos/seed/201/1920/1080', metadata: { tags: ['cityscape', 'urban', 'night'], category: 'Urban' } },
  { type: 'photo', url: 'https://picsum.photos/seed/202/1920/1080', metadata: { tags: ['architecture', 'skyscraper', 'modern'], category: 'Urban' } },
  { type: 'photo', url: 'https://picsum.photos/seed/203/1920/1080', metadata: { tags: ['street', 'people', 'city life'], category: 'Urban' } },
  { type: 'photo', url: 'https://picsum.photos/seed/301/1920/1080', metadata: { tags: ['food', 'dining', 'cuisine'], category: 'Lifestyle' } },
  { type: 'photo', url: 'https://picsum.photos/seed/401/1920/1080', metadata: { tags: ['galaxy', 'stars', 'space'], category: 'Science' } },
  { type: 'photo', url: 'https://picsum.photos/seed/501/1920/1080', metadata: { tags: ['ocean', 'beach', 'sunset'], category: 'Nature' } },
];
