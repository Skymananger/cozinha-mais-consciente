export type Category = 'panelas-e-saude' | 'contaminacao' | 'alimentacao-consciente' | 'dicas-da-cozinha';
export type ArticleType = 'PILLAR' | 'CLUSTER';
export type Universe = 'aluminio' | 'pfas' | 'metais-pesados' | 'nutricao' | 'consciencia';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel?: string;
  universe: Universe;
  type: ArticleType;
  publishedAt: string;
  readTime: number;
  excerpt: string;
  content: string;
  coverImage: string;
  coverAlt: string;
  ogImage?: string;
  metaTitle: string;
  metaDescription: string;
  status: 'A Publicar' | 'Em Produção' | 'Em Revisão' | 'Publicado';
  featured?: boolean;
}

export const categoryLabels: Record<Category, string> = {
  'panelas-e-saude': 'Panelas e Saúde',
  'contaminacao': 'Contaminação',
  'alimentacao-consciente': 'Alimentação Consciente',
  'dicas-da-cozinha': 'Dicas da Cozinha',
};

export const universeIcons: Record<Universe, string> = {
  aluminio: '🔵',
  pfas: '🔴',
  'metais-pesados': '🟠',
  nutricao: '🟢',
  consciencia: '🟣',
};

export const defaultArticles: Article[] = [
  // --- UNIVERSO 🔵 ALUMÍNIO ---
  {
    id: 'p1',
    slug: 'aluminio-na-cozinha-guia-completo',
    title: 'Alumínio na Cozinha: O Guia Completo que a Indústria Prefere que Você Não Leia',
    subtitle: 'A verdade técnica sobre a lixiviação de metais e os riscos acumulativos no dia a dia.',
    category: 'panelas-e-saude',
    universe: 'aluminio',
    type: 'PILLAR',
    publishedAt: '2026-03-16',
    readTime: 15,
    status: 'Publicado',
    featured: true,
    excerpt: 'O alumínio é onipresente, mas o que a ciência diz sobre seu uso em altas temperaturas e contato com ácidos?',
    coverImage: 'https://images.unsplash.com/photo-1584990379282-3590247513df?q=80&w=1200',
    coverAlt: 'Panelas de alumínio em uma cozinha',
    metaTitle: 'Alumínio na Cozinha: Guia Completo de Riscos e Saúde',
    metaDescription: 'Entenda os riscos do alumínio na cozinha. Guia técnico sobre lixiviação e segurança alimentar.',
    content: `
      <p>O alumínio é o terceiro elemento mais abundante na crosta terrestre e, nas últimas décadas, tornou-se o rei incontestável das cozinhas brasileiras. Leve, barato e excelente condutor de calor, ele parece o material perfeito. Mas o que acontece quando esse metal — um elemento neurotóxico conhecido — é submetido a altas temperaturas e entra em contato direto com o que você come?</p>

      <h2>A Ciência da Lixiviação: O Que Realmente Acontece?</h2>
      <p>Diferente de materiais inertes como o vidro ou a cerâmica de alta performance, o alumínio é um metal altamente reativo. Quando você cozinha, ocorre um fenômeno chamado <strong>lixiviação</strong>: partículas microscópicas do metal se desprendem da superfície da panela e migram para o alimento.</p>
      
      <p>Este processo não é uniforme. Ele é drasticamente acelerado por três fatores críticos:</p>
      <ul>
        <li><strong>Acidez:</strong> Molhos de tomate, limão, vinagre e frutas cítricas agem como solventes, "puxando" o alumínio para a comida.</li>
        <li><strong>Temperatura:</strong> Quanto mais quente a panela, maior a agitação molecular e a liberação de íons metálicos.</li>
        <li><strong>Tempo de Contato:</strong> Deixar a comida esfriar ou armazená-la na panela de alumínio multiplica a contaminação.</li>
      </ul>

      <div class="sabia-que">
        <h4>Sabia que?</h4>
        <p>Um estudo publicado no <em>Journal of Food Science</em> revelou que cozinhar molho de tomate em uma panela de alumínio pode aumentar o teor do metal no alimento em até <strong>500%</strong> em comparação ao cozimento em inox.</p>
      </div>

      <h2>Os Riscos Silenciosos da Bioacumulação</h2>
      <p>O grande perigo do alumínio não é uma intoxicação aguda (imediata), mas sim a <strong>bioacumulação</strong>. O corpo humano não tem uma função biológica para o alumínio; pelo contrário, ele compete com minerais essenciais como o cálcio e o magnésio.</p>
      
      <p>Ao longo de anos de exposição diária, o alumínio se deposita nos tecidos, com predileção por dois locais críticos:</p>
      <ol>
        <li><strong>O Sistema Nervoso Central:</strong> O alumínio consegue atravessar a barreira hematoencefálica. Pesquisas científicas de universidades renomadas vêm investigando há décadas a forte correlação entre altos níveis de alumínio no cérebro e o desenvolvimento de doenças neurodegenerativas como o Alzheimer.</li>
        <li><strong>O Sistema Ósseo:</strong> Ao "imitar" o cálcio, o alumínio se deposita nos ossos, podendo torná-los mais frágeis e interferindo na calcificação natural, o que é especialmente preocupante para crianças em fase de crescimento e idosos.</li>
      </ol>

      <h2>O Mito da Camada de Óxido</h2>
      <p>Muitas vezes ouvimos que "basta não dar brilho na panela" (não arear) para que uma camada de óxido proteja o alimento. Tecnicamente, o óxido de alumínio realmente reduz a lixiviação, mas essa proteção é <strong>ilusória</strong> no dia a dia. Qualquer raspagem com uma colher de metal ou o uso de alimentos ligeiramente ácidos rompe essa camada instantaneamente, expondo o metal "vivo" novamente.</p>

      <h2>Como se Proteger no Dia a Dia</h2>
      <p>Se você ainda utiliza panelas de alumínio, aqui estão as regras de segurança inegociáveis para minimizar os danos:</p>
      <ul>
        <li><strong>Nunca use utensílios de metal:</strong> Eles riscam a superfície e aumentam a liberação de partículas. Use silicone ou madeira.</li>
        <li><strong>Jamais guarde sobras na panela:</strong> Assim que terminar o cozimento, transfira o alimento para recipientes de vidro.</li>
        <li><strong>Evite o molho de tomate:</strong> Escolha panelas de inox ou cerâmica pura para preparos ácidos.</li>
        <li><strong>Substitua as panelas riscadas:</strong> Uma panela de alumínio com o fundo gasto ou riscado é uma fonte direta de contaminação pesada.</li>
      </ul>

      <h2>A Transição para uma Cozinha Segura</h2>
      <p>Escolher o que entra em contato com sua comida é uma das decisões de saúde mais potentes que você pode tomar. Embora existam opções no mercado, a ciência da inércia química é rigorosa: o <strong>Aço Inox 316L (cirúrgico)</strong> destaca-se como o padrão ouro de estabilidade, garantindo que o sabor e as propriedades do alimento permaneçam puras, sem a lixiviação de metais industriais.</p>
      
      <p>Outras alternativas como o vidro e a cerâmica pura representam avanços significativos em relação ao alumínio, mas exigem atenção à procedência quanto a pigmentos e aditivos. No Cozinha Mais Consciente, nossa missão é prover essa clareza técnica. Se você busca longevidade e leva a nutrição a sério, o primeiro passo é olhar para baixo — para o que está segurando sua refeição no fogo.</p>
    `,
  },
  {
    id: 'c1.1',
    slug: 'aluminio-reacao-alimentos-acidos',
    title: 'O que Acontece Quando Alumínio Encontra Tomate, Limão ou Vinagre',
    subtitle: 'A química da corrosão acelerada por ácidos e como ela termina no seu prato.',
    category: 'panelas-e-saude',
    universe: 'aluminio',
    type: 'CLUSTER',
    publishedAt: '2026-04-20',
    readTime: 8,
    status: 'Publicado',
    excerpt: 'Ácidos são catalisadores potentes para a migração de metais. Entenda como tomate, limão e vinagre corroem sua panela por dentro.',
    coverImage: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1200',
    coverAlt: 'Tomates frescos sendo cortados',
    metaTitle: 'Alumínio e Alimentos Ácidos: O Perigo Químico Invisível',
    metaDescription: 'Descubra por que alimentos ácidos aceleram a contaminação por alumínio e como proteger sua saúde na cozinha.',
    content: `
      <p>Se você já notou que sua panela de alumínio fica "mais clara" ou brilhante depois de cozinhar um molho de tomate, você presenciou uma reação química em tempo real. Infelizmente, esse brilho não é sinal de limpeza, mas sim de <strong>corrosão metálica</strong>.</p>

      <h2>O Ácido como Solvente</h2>
      <p>O alumínio é o que os químicos chamam de metal "anfótero", o que significa que ele reage tanto com substâncias básicas quanto ácidas. Quando você introduz alimentos com baixo pH (ácidos), como:</p>
      <ul>
        <li>Tomates e molhos prontos;</li>
        <li>Limão e sucos cítricos;</li>
        <li>Vinagre;</li>
        <li>Vinho branco (usado em reduções);</li>
      </ul>
      <p>Essas substâncias agem como agentes decapantes. Elas dissolvem a camada protetora de óxido de alumínio e começam a atacar o metal puro abaixo dela, transportando íons de alumínio diretamente para as fibras do alimento.</p>

      <div class="sabia-que">
        <h4>A Regra dos 15 Minutos</h4>
        <p>Testes laboratoriais indicam que a lixiviação de alumínio em meios ácidos triplica após apenas 15 minutos de ebulição. O cozimento lento (slow cooking) de molhos em panelas de alumínio é, tecnicamente, a forma mais eficiente de contaminar uma refeição.</p>
      </div>

      <h2>O Mal dos Metais no Paladar</h2>
      <p>Muitas pessoas relatam um "gosto metálico" em pratos preparados com muito molho de tomate em panelas de alumínio batido. Esse não é um efeito psicológico; é a percepção sensorial direta da alta concentração de metal no prato. O problema é que, com o tempo, o paladar se acostuma, mas o organismo continua bioacumulando o elemento.</p>

      <h2>Alternativas Estratégicas</h2>
      <p>Para não abrir mão dos seus pratos favoritos, a solução é trocar o **meio de contato**: </p>
      <ul>
        <li><strong>Cerámica Inerte ou Vidro:</strong> São os únicos 100% à prova de ácidos.</li>
        <li><strong>Aço Inox 316L (Cirúrgico):</strong> Desenvolvido justamente para resistir à corrosão em ambientes severos, é o substituto ideal para molhos de longa duração.</li>
      </ul>
      
      <p><strong>Dica de Ouro:</strong> Nunca use papel alumínio para embrulhar alimentos que contenham molho de tomate ou gotas de limão. A reação é ainda mais rápida devido à espessura fina da folha.</p>
    `,
  },
  {
    id: 'c1.2',
    slug: 'fontes-de-aluminio-no-dia-a-dia',
    title: 'Fermento em Pó, Embalagem, Desodorante: Você Consome Alumínio por Mais Caminhos do que Imagina',
    subtitle: 'A carga total de exposição: por que a panela pode ser o "ponto de transbordo".',
    category: 'panelas-e-saude',
    universe: 'aluminio',
    type: 'CLUSTER',
    publishedAt: '2026-04-27',
    readTime: 7,
    status: 'A Publicar',
    excerpt: 'Não é apenas a panela. Entenda a exposição cumulativa ao alumínio.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200',
    coverAlt: 'Produtos de higiene pessoal',
    metaTitle: 'Fontes de Alumínio no Dia a Dia: Exposição Tóxica',
    metaDescription: 'Além das panelas, onde o alumínio se esconde no seu cotidiano?',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c1.3',
    slug: 'panela-de-pressao-aluminio-risco',
    title: 'Panela de Pressão de Alumínio: o Risco Que Ninguém Calcula',
    subtitle: 'Pressão e calor: o combo que potencializa a migração metálica.',
    category: 'panelas-e-saude',
    universe: 'aluminio',
    type: 'CLUSTER',
    publishedAt: '2026-05-18',
    readTime: 8,
    status: 'A Publicar',
    excerpt: 'A física da pressão agindo sobre a porosidade do metal.',
    metaTitle: 'Risco da Panela de Pressão de Alumínio | Cozinha Consciente',
    metaDescription: 'Por que a pressão aumenta a lixiviação de alumínio nos alimentos.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c1.4',
    slug: 'experimento-caseiro-teste-panela-bicarbonato',
    title: 'Experimento Caseiro: Teste Sua Panela com Bicarbonato em 10 Minutos',
    subtitle: 'O teste sensorial que revela a reatividade do seu utensílio.',
    category: 'dicas-da-cozinha',
    universe: 'aluminio',
    type: 'CLUSTER',
    publishedAt: '2026-06-15',
    readTime: 6,
    status: 'A Publicar',
    excerpt: 'Aprenda a fazer o teste do bicarbonato e sinta o gosto da migração.',
    metaTitle: 'Teste do Bicarbonato em Panelas: Como Fazer',
    metaDescription: 'Guia prático para testar a qualidade e reatividade de suas panelas em casa.',
    content: 'Conteúdo em produção...',
  },

  // --- UNIVERSO 🔴 REVESTIMENTOS ANTIADERENTES + PFAS ---
  {
    id: 'p2',
    slug: 'revestimentos-antiaderentes-guia-completo',
    title: 'Revestimentos Antiaderentes: 50 Anos de Omissão e o que Isso Significa para a Sua Cozinha Hoje',
    subtitle: 'Do PFOA ao GenX: o ciclo de substituições da indústria química.',
    category: 'contaminacao',
    universe: 'pfas',
    type: 'PILLAR',
    publishedAt: '2026-03-23',
    readTime: 18,
    status: 'A Publicar',
    excerpt: 'Tudo sobre PFAS, PTFE e o histórico de segurança dos antiaderentes.',
    metaTitle: 'Antiaderentes: O Guia sobre PFAS e Saúde Capilar',
    metaDescription: 'Histórico e riscos dos revestimentos antiaderentes e compostos perfluorados.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c2.1',
    slug: 'compostos-perfluorados-panela-nova',
    title: 'Compostos Perfluorados: Sua Panela Nova Já Emite — Antes do Primeiro Arranhão',
    subtitle: 'A liberação de gases e partículas pelo simples aquecimento.',
    category: 'contaminacao',
    universe: 'pfas',
    type: 'CLUSTER',
    publishedAt: '2026-04-20',
    readTime: 8,
    status: 'A Publicar',
    excerpt: 'Mitos sobre "panela sem risco se não riscar" caem por terra com o calor.',
    metaTitle: 'Emissão de PFAS em Panelas Novas: O Que Você Precisa Saber',
    metaDescription: 'Saiba por que o calor, mesmo sem riscos, libera toxinas em antiaderentes.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c2.2',
    slug: 'air-fryer-revestimento-antiaderente-risco',
    title: 'Fritadeira a Ar com Revestimento Antiaderente: O Risco Que Ninguém Leu na Caixa',
    subtitle: 'Circulação forçada de ar quente e a exposição a micropartículas.',
    category: 'contaminacao',
    universe: 'pfas',
    type: 'CLUSTER',
    publishedAt: '2026-05-04',
    readTime: 9,
    status: 'A Publicar',
    excerpt: 'O perigo invisível do ar quente circulando sobre polímeros aquecidos.',
    metaTitle: 'Riscos da Air Fryer Antiaderente | Cozinha Consciente',
    metaDescription: 'O impacto do revestimento de air fryers na pureza do ar e do alimento.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c2.3',
    slug: 'historia-real-compostos-perfluorados',
    title: 'A História Real por Trás dos Compostos Perfluorados: Documentos Internos e o Caso que Virou Filme',
    subtitle: 'O dossiê jurídico que expôs décadas de omissão industrial.',
    category: 'contaminacao',
    universe: 'pfas',
    type: 'CLUSTER',
    publishedAt: '2026-05-11',
    readTime: 12,
    status: 'A Publicar',
    excerpt: 'A história de Robert Bilott vs. DuPont - fatos que moldaram a consciência atual.',
    metaTitle: 'PFAS: A História Real de Omissão Industrial',
    metaDescription: 'O caso jurídico real por trás do filme Dark Waters e os perigos do PFOA.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c2.4',
    slug: 'panela-arranhada-dupla-contaminacao',
    title: 'Panela Arranhada: Dupla Contaminação — Revestimento e Base',
    subtitle: 'Quando a barreira química falha e o metal base (alumínio) é exposto.',
    category: 'contaminacao',
    universe: 'pfas',
    type: 'CLUSTER',
    publishedAt: '2026-06-01',
    readTime: 7,
    status: 'A Publicar',
    excerpt: 'O risco exponencial de cozinhar em utensílios com revestimento danificado.',
    metaTitle: 'Perigos da Panela Antiaderente Arranhada',
    metaDescription: 'Entenda a dupla contaminação que ocorre quando o antiaderente risca.',
    content: 'Conteúdo em produção...',
  },

  // --- UNIVERSO 🟠 METAIS PESADOS ---
  {
    id: 'p3',
    slug: 'metais-pesados-comida-guia-completo',
    title: 'Metais Pesados na Sua Comida: Como Entram, Onde se Acumulam e Por Que Isso É Diferente',
    subtitle: 'Bioacumulação e os riscos da exposição crônica de baixa intensidade.',
    category: 'contaminacao',
    universe: 'metais-pesados',
    type: 'PILLAR',
    publishedAt: '2026-03-30',
    readTime: 16,
    status: 'A Publicar',
    excerpt: 'Chumbo, cádmio e níquel: o que você precisa saber sobre metais tóxicos.',
    metaTitle: 'Metais Pesados na Alimentação: Guia Completo',
    metaDescription: 'Como evitar o acúmulo de metais pesados através dos seus utensílios.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c3.1',
    slug: 'chumbo-cadmio-ceramica-esmaltada',
    title: 'Chumbo e Cádmio em Cerâmicas Esmaltadas: o Perigo Escondido na Panela Colorida',
    subtitle: 'A toxicidade dos pigmentos e esmaltes industriais.',
    category: 'contaminacao',
    universe: 'metais-pesados',
    type: 'CLUSTER',
    publishedAt: '2027-04-27',
    readTime: 8,
    status: 'A Publicar',
    excerpt: 'Panelas de barro e cerâmica podem esconder tinturas com metais pesados.',
    metaTitle: 'Chumbo e Cádmio em Panelas de Cerâmica',
    metaDescription: 'O risco dos esmaltes e pigmentos em utensílios de cerâmica coloridos.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c3.2',
    slug: 'inox-comum-vs-316l-niquel',
    title: 'Inox Comum vs. 316L: A Diferença que o Vendedor Não Explica — e que o Níquel Deixa no seu Prato',
    subtitle: 'Pureza cirúrgica vs. ligas comerciais: a importância do molibdênio.',
    category: 'panelas-e-saude',
    universe: 'metais-pesados',
    type: 'CLUSTER',
    publishedAt: '2026-05-11',
    readTime: 10,
    status: 'A Publicar',
    excerpt: 'Entenda por que o Inox 316L é o padrão ouro de inércia e segurança.',
    metaTitle: 'Inox 316L vs Inox 304/430: Guia Comparativo',
    metaDescription: 'A diferença técnica entre o aço cirúrgico e o inox comum na sua cozinha.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c3.3',
    slug: 'acumulo-metais-pesados-corpo',
    title: 'Como Metais Pesados se Acumulam no Corpo: O Que Acontece Após Anos de Exposição',
    subtitle: 'A fisiologia da intoxicação silenciosa e o papel dos utensílios.',
    category: 'panelas-e-saude',
    universe: 'metais-pesados',
    type: 'CLUSTER',
    publishedAt: '2026-05-25',
    readTime: 9,
    status: 'A Publicar',
    excerpt: 'Bioacumulação: o que o corpo não consegue eliminar e o que fazer.',
    metaTitle: 'Bioacumulação de Metais Pesados no Organismo',
    metaDescription: 'Os efeitos a longo prazo da exposição a metais através da culinária.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c3.4',
    slug: 'criancas-metais-pesados-vulnerabilidade',
    title: 'Crianças e Metais Pesados: Por Que São os Mais Vulneráveis e o que os Pais Podem Fazer Agora',
    subtitle: 'Desenvolvimento neural e a importância de utensílios sem interferência.',
    category: 'panelas-e-saude',
    universe: 'metais-pesados',
    type: 'CLUSTER',
    publishedAt: '2026-06-08',
    readTime: 11,
    status: 'A Publicar',
    excerpt: 'O impacto da toxicidade metálica nos primeiros anos de vida.',
    metaTitle: 'Proteja seus Filhos de Metais Pesados na Cozinha',
    metaDescription: 'Guia para pais sobre como reduzir a carga tóxica na alimentação infantil.',
    content: 'Conteúdo em produção...',
  },

  // --- UNIVERSO 🟢 NUTRIÇÃO + COZIMENTO ---
  {
    id: 'p4',
    slug: 'cozinhar-sem-destruir-nutrientes-guia',
    title: 'Cozinhar Sem Destruir: Como o Método, a Temperatura e o Utensílio Definem o Valor Nutricional',
    subtitle: 'A arte e a ciência de preservar o potencial vital do alimento.',
    category: 'alimentacao-consciente',
    universe: 'nutricao',
    type: 'PILLAR',
    publishedAt: '2026-04-06',
    readTime: 15,
    status: 'A Publicar',
    excerpt: 'Mantenha as vitaminas e minerais no prato, não na panela.',
    metaTitle: 'Como Preservar Nutrientes ao Cozinhar: Guia Completo',
    metaDescription: 'Dicas técnicas sobre temperatura e métodos para manter o valor nutricional.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c4.1',
    slug: 'vitaminas-que-morrem-no-fogão',
    title: 'Vitaminas que Morrem no Fogão: Quais São, em Qual Temperatura e Como Preservar',
    subtitle: 'O guia de termossensibilidade das vitaminas essenciais.',
    category: 'alimentacao-consciente',
    universe: 'nutricao',
    type: 'CLUSTER',
    publishedAt: '2026-05-04',
    readTime: 8,
    status: 'A Publicar',
    excerpt: 'C, B12, Ácido Fólico: saiba quais você está perdendo no preparo.',
    metaTitle: 'Vitaminas e Temperatura: Como Não Perder Nutrientes',
    metaDescription: 'O impacto do calor nas principais vitaminas e como cozinhá-las certo.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c4.2',
    slug: 'fogo-alto-reacao-quimica-alimentos',
    title: 'Fogo Alto: O que Acontece com Proteínas, Gorduras e Carboidratos Quando a Temperatura Passa do Limite',
    subtitle: 'Glicação, oxidação lipídica e toxicidade por superaquecimento.',
    category: 'dicas-da-cozinha',
    universe: 'nutricao',
    type: 'CLUSTER',
    publishedAt: '2026-05-25',
    readTime: 9,
    status: 'A Publicar',
    excerpt: 'O risco de queimar os alimentos e os subprodutos tóxicos gerados.',
    metaTitle: 'O Surgimento de Toxinas pelo Fogo Alto | Cozinha Consciente',
    metaDescription: 'Entenda os perigos de cozinhar em temperaturas excessivas.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c4.3',
    slug: 'metodos-cozimento-comparativo-nutrientes',
    title: 'Vapor, Pressão ou Forno: Qual Método Preserva Mais Nutrientes — Comparativo Honesto',
    subtitle: 'Avaliando o impacto de cada técnica na densidade nutricional.',
    category: 'alimentacao-consciente',
    universe: 'nutricao',
    type: 'CLUSTER',
    publishedAt: '2026-06-08',
    readTime: 9,
    status: 'A Publicar',
    excerpt: 'Qual a melhor forma de preparar seus vegetais e carnes?',
    metaTitle: 'Comparativo de Métodos de Cozimento e Nutrientes',
    metaDescription: 'Vapor vs Pressão vs Forno: Qual preserva melhor as vitaminas?',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c4.4',
    slug: 'experimento-bicarbonato-qualidade-panela',
    title: 'Experimento Caseiro: O que o Bicarbonato Revela Sobre a Qualidade do Utensílio',
    subtitle: 'Por que o sódio expõe as falhas de inércia do material.',
    category: 'dicas-da-cozinha',
    universe: 'nutricao',
    type: 'CLUSTER',
    publishedAt: '2026-06-15',
    readTime: 7,
    status: 'A Publicar',
    excerpt: 'O teste definitivo que você pode fazer hoje na sua cozinha.',
    metaTitle: 'A Ciência do Teste do Bicarbonato em Panelas',
    metaDescription: 'Por que o bicarbonato é a ferramenta ideal para testar migração metálica.',
    content: 'Conteúdo em produção...',
  },

  // --- UNIVERSO 🟣 CONSCIÊNCIA + DECISÃO ---
  {
    id: 'p5',
    slug: 'cozinha-consciente-guia-decisao',
    title: 'Cozinha Consciente: O Guia da Decisão Inteligente — Da Informação à Escolha por Utensílios Inertes',
    subtitle: 'Transformando conhecimento técnico em uma cozinha livre de interferências.',
    category: 'alimentacao-consciente',
    universe: 'consciencia',
    type: 'PILLAR',
    publishedAt: '2026-04-13',
    readTime: 20,
    status: 'A Publicar',
    excerpt: 'O manual definitivo para montar uma cozinha focada em saúde e longevidade.',
    metaTitle: 'Guia da Cozinha Consciente: Saúde e Utensílios',
    metaDescription: 'Aprenda a escolher utensílios que não interferem na sua saúde. Guia completo.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c5.1',
    slug: 'alzheimer-parkinson-utensilios-cozinha',
    title: 'Alzheimer, Parkinson e Cozinha: O que os Estudos Associam e o que Isso Significa',
    subtitle: 'Neurotoxicidade e a importância da proteção desde a cozinha.',
    category: 'panelas-e-saude',
    universe: 'consciencia',
    type: 'CLUSTER',
    publishedAt: '2026-05-18',
    readTime: 12,
    status: 'A Publicar',
    excerpt: 'Pesquisas sobre metais pesados e doenças neurodegenerativas.',
    metaTitle: 'Neurotoxicidade na Cozinha: Alumínio e Metais',
    metaDescription: 'O que as pesquisas dizem sobre a relação entre utensílios e saúde cerebral.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c5.2',
    slug: 'comparativo-materiais-panela-honesto',
    title: 'Todos os Materiais de Panela Avaliados: Cerâmica, Ferro, Vidro, Inox Comum e 316L',
    subtitle: 'Sem patrocínio e sem omissão: o veredito técnico sobre cada escolha.',
    category: 'panelas-e-saude',
    universe: 'consciencia',
    type: 'CLUSTER',
    publishedAt: '2026-06-01',
    readTime: 14,
    status: 'A Publicar',
    excerpt: 'O comparativo final para você decidir qual material entrará na sua casa.',
    metaTitle: 'Comparativo Honesto de Materiais de Panela',
    metaDescription: 'Análise técnica de todos os materiais do mercado: prós, contras e riscos.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c5.3',
    slug: '5-mudancas-cozinha-reducao-exposicao',
    title: 'As 5 Mudanças na Cozinha que Reduzem sua Exposição a Substâncias Indesejadas',
    subtitle: 'Dicas práticas de aplicação imediata para uma vida mais segura.',
    category: 'dicas-da-cozinha',
    universe: 'consciencia',
    type: 'CLUSTER',
    publishedAt: '2026-06-22',
    readTime: 8,
    status: 'A Publicar',
    excerpt: 'Pequenas atitudes que geram grandes resultados na carga tóxica diária.',
    metaTitle: '5 Passos para uma Cozinha Mais Segura Hoje',
    metaDescription: 'Mudanças simples e eficazes para reduzir a contaminação alimentar em casa.',
    content: 'Conteúdo em produção...',
  },
  {
    id: 'c5.4',
    slug: 'quanto-custa-cozinha-sem-interferencia',
    title: 'Quanto Custa Realmente uma Cozinha Sem Interferência? A Conta que a Indústria Nunca Fez',
    subtitle: 'Investimento em saúde vs. custo de manutenção da doença.',
    category: 'alimentacao-consciente',
    universe: 'consciencia',
    type: 'CLUSTER',
    publishedAt: '2026-06-22',
    readTime: 10,
    status: 'A Publicar',
    excerpt: 'Entenda os números por trás da durabilidade e da prevenção.',
    metaTitle: 'O Custo da Saúde na Cozinha: Vale o Investimento?',
    metaDescription: 'Uma análise financeira e de saúde sobre os utensílios de alta performance.',
    content: 'Conteúdo em produção...',
  },
];
