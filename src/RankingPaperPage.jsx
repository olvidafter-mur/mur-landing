import {
  ArrowLeft,
  BadgeCheck,
  BookOpenText,
  Brain,
  Database,
  FileText,
  GitBranch,
  LockKeyhole,
  Scale,
  ShieldAlert,
  Sigma,
  TimerReset,
} from 'lucide-react'

const paper = {
  es: {
    badge: 'Documento tecnico interno',
    title: 'MUR Private Ranking Algorithm',
    subtitle:
      'Un paper operativo para explicar como MUR calcula una puntuacion privada de reputacion, actividad y confianza por usuario.',
    version: 'Version 2 - escala Fibonacci-inspirada',
    updated: 'Actualizado: 8 de julio de 2026',
    back: 'Volver a MUR',
    abstractTitle: 'Resumen',
    abstract:
      'MUR necesita ordenar contenido hiperlocal sin convertir el producto en una carrera publica de popularidad. Para eso calculamos un ranking interno, privado y no visible, que resume actividad reciente, historial, calidad de interacciones, diversidad de audiencia, confianza, monetizacion futura y penalizaciones de seguridad. El resultado se guarda en user_internal_rankings.normalized_score con rango 0 a 100 y solo debe ser usado por backend, funciones seguras o procesos con service_role.',
    navTitle: 'Indice',
    sourceTitle: 'Inspiracion de plataformas reales',
    sourceIntro:
      'Las redes sociales modernas no usan un contador lineal unico. Separan inventario, senales, predicciones, seguridad y reglas de diversidad. Esta version de MUR toma ese criterio, pero lo adapta a una red hiperlocal donde los posts expiran a las 24 horas.',
    modelTitle: 'Modelo conceptual',
    modelIntro:
      'La puntuacion de usuario no decide sola que post se ve. Es una senal de reputacion del autor que despues puede combinarse con distancia, frescura, categoria, afinidad del viewer y calidad propia del post.',
    formulaTitle: 'Formula general',
    formula:
      'normalized_score = clamp((activity + author_quality + community + consistency + trust + monetization - moderation_penalty) * boost_multiplier, 0, 100)',
    weightsTitle: 'Pesos numericos',
    weightsIntro:
      'La escala usa saltos Fibonacci-inspirados para expresar jerarquia de importancia: 3/5 para senales livianas, 8/13 para senales medias, 21/34 para senales fuertes y 55/89 para penalizaciones criticas. No es Fibonacci puro por evento; es una escala de techos y severidades.',
    dataTitle: 'Fuentes de datos internas',
    examplesTitle: 'Casos de uso calculados',
    safetyTitle: 'Privacidad y seguridad',
    lifecycleTitle: 'Ciclo de vida de posts de 24 horas',
    implementationTitle: 'Implementacion actual',
    futureTitle: 'Como se conecta con relevancia de posts',
    referencesTitle: 'Referencias externas',
    glossaryTitle: 'Glosario corto',
  },
  en: {
    badge: 'Internal technical document',
    title: 'MUR Private Ranking Algorithm',
    subtitle:
      'An operational paper explaining how MUR computes a private user score for reputation, activity, and trust.',
    version: 'Version 2 - Fibonacci-inspired scale',
    updated: 'Updated: July 8, 2026',
    back: 'Back to MUR',
    abstractTitle: 'Abstract',
    abstract:
      'MUR needs to rank hyperlocal content without turning the product into a public popularity race. We compute an internal, private, non-visible ranking that summarizes recent activity, history, interaction quality, audience diversity, trust, future monetization, and safety penalties. The result is stored in user_internal_rankings.normalized_score from 0 to 100 and should only be used by backend services, secure functions, or service_role processes.',
    navTitle: 'Contents',
    sourceTitle: 'Real-platform inspiration',
    sourceIntro:
      'Modern social networks do not use one linear counter. They separate inventory, signals, predictions, safety, and diversity rules. This MUR version borrows that design, but adapts it to a hyperlocal network where posts expire after 24 hours.',
    modelTitle: 'Conceptual model',
    modelIntro:
      'The user score does not decide alone which post appears. It is an author reputation signal that can later be combined with distance, freshness, category, viewer affinity, and post-level quality.',
    formulaTitle: 'General formula',
    formula:
      'normalized_score = clamp((activity + author_quality + community + consistency + trust + monetization - moderation_penalty) * boost_multiplier, 0, 100)',
    weightsTitle: 'Numeric weights',
    weightsIntro:
      'The scale uses Fibonacci-inspired jumps to express hierarchy: 3/5 for light signals, 8/13 for medium signals, 21/34 for strong signals, and 55/89 for critical penalties. It is not pure Fibonacci per event; it is a scale for caps and severities.',
    dataTitle: 'Internal data sources',
    examplesTitle: 'Calculated use cases',
    safetyTitle: 'Privacy and safety',
    lifecycleTitle: '24-hour post lifecycle',
    implementationTitle: 'Current implementation',
    futureTitle: 'How it connects to post relevance',
    referencesTitle: 'External references',
    glossaryTitle: 'Short glossary',
  },
}

const sections = [
  ['abstract', 'Resumen'],
  ['sources', 'Inspiracion'],
  ['model', 'Modelo'],
  ['weights', 'Pesos'],
  ['data', 'Datos'],
  ['examples', 'Ejemplos'],
  ['safety', 'Seguridad'],
  ['implementation', 'Implementacion'],
  ['future', 'Uso futuro'],
]

const platformNotes = [
  {
    name: 'TikTok',
    point:
      'Declara tres grandes familias de senales: interacciones del usuario, informacion del contenido e informacion del usuario. Tambien indica que las interacciones suelen pesar mas.',
    url: 'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content',
  },
  {
    name: 'YouTube',
    point:
      'Separa personalizacion y performance del contenido, optimizando por satisfaccion de largo plazo, no solo por clicks.',
    url: 'https://support.google.com/youtube/answer/16533387?hl=en',
  },
  {
    name: 'Meta/Facebook',
    point:
      'Describe un pipeline de inventario, senales, predicciones y score final; tambien usa procesos de integridad para bajar contenido problematico.',
    url: 'https://transparency.meta.com/features/ranking-and-content/',
  },
  {
    name: 'LinkedIn',
    point:
      'Explica ranking secuencial: las interacciones pasadas forman una trayectoria, no eventos aislados.',
    url: 'https://www.linkedin.com/blog/engineering/feed/engineering-the-next-generation-of-linkedins-feed',
  },
  {
    name: 'X/Twitter',
    point:
      'Su paper open-source muestra pesos muy distintos por accion: like bajo, respuesta profunda alta, feedback negativo y reportes extremadamente altos en negativo.',
    url: 'https://raw.githubusercontent.com/twitter/the-algorithm-ml/main/projects/home/recap/README.md',
  },
]

const componentCards = [
  {
    icon: TimerReset,
    title: 'Activity score',
    cap: 'max 34',
    body:
      'Premia actividad real. Un post activo suma fuerte porque en MUR el contenido vive poco. El historial suma menos y con logaritmo para evitar farming.',
  },
  {
    icon: Brain,
    title: 'Author quality',
    cap: 'max 29',
    body:
      'Mide si otros reaccionan al autor. Comentarios recibidos pesan mucho mas que likes porque implican esfuerzo y conversacion.',
  },
  {
    icon: GitBranch,
    title: 'Community',
    cap: 'max 18',
    body:
      'Valora diversidad de audiencia y participacion. No alcanza con recibir 100 likes de un patron repetido; importa que haya personas distintas.',
  },
  {
    icon: BadgeCheck,
    title: 'Trust',
    cap: 'max 13',
    body:
      'Incluye verificacion interna y edad de cuenta. Es una senal estable, no una senal de viralidad.',
  },
  {
    icon: Scale,
    title: 'Monetization',
    cap: 'configurable',
    body:
      'Permite boosts futuros: business, vip, subscription o super user. Vive en user_rank_boosts y no requiere cambiar la formula central.',
  },
  {
    icon: ShieldAlert,
    title: 'Moderation penalty',
    cap: 'max -89',
    body:
      'Reportes y bloqueos pesan fuerte. En ranking social, una senal negativa seria debe poder compensar muchas senales positivas livianas.',
  },
]

const weights = [
  ['Post activo', '+5 por post activo', '13', 'Senal fuerte por disponibilidad actual.'],
  ['Post reciente', '+3 por post 7d, +1 por post 30d', '13', 'Momentum de publicacion. Hoy casi todo cae dentro de 24h, pero queda preparado para historicos.'],
  ['Historial de posts', 'ln(1 + lifetime_posts) * 1.7', '8', 'Reputacion productiva acumulada, con retornos decrecientes.'],
  ['Like recibido', 'ln(1 + likes activos) * 2.4 + ln(1 + likes historicos) * 0.75', '8', 'Aporta, pero no puede dominar.'],
  ['Comentario recibido', 'ln(1 + comments activos) * 6 + ln(1 + comments 30d) * 3', '21', 'Conversacion real; mucho mas valioso que un like.'],
  ['Diversidad de audiencia', 'ln(1 + likers unicos) * 2.4 + ln(1 + commenters unicos) * 3.8', '13', 'Premia alcance distribuido, no interacciones repetidas.'],
  ['Participacion dada', 'ln(1 + likes dados) * 0.35 + ln(1 + comments dados) * 1.8', '5', 'Evita que likear mucho infle el score. Comentar ayuda mas.'],
  ['Consistencia', 'ln(1 + lifetime_posts) * 1.2 + dias activos', '5', 'Premia habito sin convertirlo en spam.'],
  ['Perfil verificado', '+8', '8', 'Confianza interna.'],
  ['Edad de cuenta', 'hasta +5 en 180 dias', '5', 'Madurez progresiva.'],
  ['Reporte reciente', '-21 por reporte 90d', '-89 total', 'Castigo fuerte y fresco.'],
  ['Reporte persistente', '-8 por reporte historico persistido', '-89 total', 'No desaparece cuando el post expira.'],
  ['Bloqueo recibido', '-13 por bloqueo', '-89 total', 'Senal negativa social fuerte.'],
]

const dataSources = [
  ['public.posts', 'posts_total, posts_7d, posts_30d, active_post_days_30d', 'Fuente de actividad viva. Los posts se borran por cascada a las 24h.'],
  ['public.profile_activity_stats', 'lifetime_posts_total, lifetime_likes_received_total', 'Contadores historicos publicos ya existentes; evitan amnesia del ranking.'],
  ['public.post_likes', 'likes_received_total, likes_given_total, unique_likers_90d', 'Likes activos y diversidad de likers.'],
  ['public.post_comments', 'comments_received_total, comments_given_total, unique_commenters_90d', 'Conversacion activa y participacion.'],
  ['public.post_reports', 'reports_90d', 'Reportes recientes aun vinculados a posts activos.'],
  ['public.user_rank_moderation_stats', 'reports_received_count', 'Contador privado persistente de reportes recibidos.'],
  ['public.user_blocks', 'blocked_by_count', 'Senal negativa de relacion social.'],
  ['public.user_rank_boosts', 'score_boost, multiplier, boost_type', 'Canal para business, vip, subscription o boosts manuales.'],
  ['public.profiles', 'is_verified, created_at', 'Confianza y edad de cuenta.'],
]

const examples = [
  {
    title: 'Usuario nuevo, activo y sano',
    inputs: ['2 posts activos', '3 likes recibidos', '1 comentario recibido', '0 reportes', 'cuenta nueva'],
    result:
      'El score sube rapido por actividad actual: 2 posts activos aportan 10 puntos antes de caps. Si ademas recibe comentarios, author_quality empieza a pesar. Sigue lejos de 100 porque no tiene historial ni diversidad.',
    interpretation:
      'Buen caso para discovery local: la app puede mostrar sus posts si estan cerca, pero todavia no lo trata como autor confiable de largo plazo.',
  },
  {
    title: 'Vecino valioso y consistente',
    inputs: ['1 post activo', '60 posts historicos', '40 likes historicos', '8 comentarios activos', '12 commenters unicos', 'sin reportes'],
    result:
      'Actividad actual suma poco pero suficiente; el historial suma con logaritmo; los comentarios y diversidad empujan fuerte. Puede quedar entre 55 y 80 segun antiguedad/verificacion.',
    interpretation:
      'Autor que probablemente merece prioridad cuando varios posts compiten por la misma zona.',
  },
  {
    title: 'Usuario que farmea likes',
    inputs: ['0 posts activos', '300 likes dados', '5 likes recibidos', '0 comentarios', 'sin diversidad'],
    result:
      'Los likes dados usan ln() * 0.35 y estan dentro de participation cap 5. Puede sumar algo por participar, pero no gana ranking real.',
    interpretation:
      'Evita que tocar like muchas veces compita contra publicar contenido util o generar conversaciones.',
  },
  {
    title: 'Autor reportado o bloqueado',
    inputs: ['3 posts activos', '20 likes recibidos', '2 reportes recientes', '1 bloqueo recibido'],
    result:
      'Los posts y likes suman, pero 2 reportes recientes restan 42 y el bloqueo resta 13, con penalizacion total cap 89. El score puede caer a 0.',
    interpretation:
      'Una cuenta con senales negativas serias no debe ganar distribucion por tener actividad alta.',
  },
  {
    title: 'Futuro comercio con subscription',
    inputs: ['rank sano', 'boost_type = business', 'score_boost = 10', 'multiplier = 1.25'],
    result:
      'El boost suma monetization_score y luego aplica multiplier. Si el usuario tiene mala moderacion, la penalizacion se resta antes del multiplicador.',
    interpretation:
      'La monetizacion aumenta relevancia, pero no deberia comprar impunidad frente a reportes o bloqueos.',
  },
]

const safetyNotes = [
  'El ranking es privado: no se muestra como estrellas, nivel, reputacion publica ni insignia.',
  'Las tablas nuevas revocan acceso a public, anon y authenticated; solo service_role puede leer o escribir.',
  'Los reportes persistentes viven fuera de post_reports para no desaparecer cuando un post expira.',
  'Los boosts son trazables por boost_type, reason, metadata, starts_at y ends_at.',
  'El score debe ser usado como senal secundaria de ranking, no como unica verdad.',
]

const implementationNotes = [
  ['Migration', 'supabase/migrations/20260708130000_create_internal_user_rankings.sql'],
  ['Snapshot privado', 'public.user_internal_rankings'],
  ['Funcion calculadora', 'public.calculate_user_internal_rank(_user_id uuid)'],
  ['Refresh individual', 'public.refresh_user_internal_rank(_user_id uuid)'],
  ['Refresh masivo', 'public.refresh_all_user_internal_ranks(_limit_count integer default 1000)'],
  ['Boosts futuros', 'public.user_rank_boosts'],
  ['Moderacion persistente', 'public.user_rank_moderation_stats'],
]

const references = [
  ['TikTok: How TikTok recommends content', 'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content'],
  ['YouTube: Recommendation system', 'https://support.google.com/youtube/answer/16533387?hl=en'],
  ['Meta: Facebook Feed ranking', 'https://transparency.meta.com/features/ranking-and-content/'],
  ['LinkedIn Engineering: Next generation Feed', 'https://www.linkedin.com/blog/engineering/feed/engineering-the-next-generation-of-linkedins-feed'],
  ['X/Twitter: Heavy Ranker README', 'https://raw.githubusercontent.com/twitter/the-algorithm-ml/main/projects/home/recap/README.md'],
]

function PaperSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-current/10 py-10">
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-amber">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function InlineCode({ children }) {
  return (
    <code className="rounded-md border border-current/10 bg-current/[0.04] px-1.5 py-0.5 font-mono text-[0.92em]">
      {children}
    </code>
  )
}

function RankingPaperPage({ language = 'es', styles }) {
  const t = paper[language] ?? paper.es

  return (
    <article className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-bold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.back}
        </a>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-[0.16em] ${styles.legalSoft}`}>
              <BookOpenText aria-hidden="true" className="h-4 w-4 text-brand-amber" />
              {t.badge}
            </div>
            <h1 className={`mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl ${styles.text}`}>
              {t.title}
            </h1>
            <p className={`mt-5 max-w-3xl text-lg font-semibold leading-8 ${styles.legalMuted}`}>
              {t.subtitle}
            </p>
            <div className={`mt-6 flex flex-wrap gap-3 text-sm font-bold ${styles.legalMuted}`}>
              <span className={`rounded-lg border px-3 py-2 ${styles.legalSoft}`}>{t.version}</span>
              <span className={`rounded-lg border px-3 py-2 ${styles.legalSoft}`}>{t.updated}</span>
            </div>
          </div>

          <nav className={`rounded-lg border p-4 ${styles.surface}`}>
            <p className={`text-sm font-black ${styles.text}`}>{t.navTitle}</p>
            <div className="mt-3 grid gap-2">
              {sections.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`rounded-md px-2 py-1.5 text-sm font-semibold transition ${styles.navTextNarrow}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <div className={`mt-10 rounded-lg border p-6 sm:p-8 ${styles.surface}`}>
          <PaperSection id="abstract" eyebrow="00" title={t.abstractTitle}>
            <p className={`max-w-4xl text-base font-semibold leading-8 ${styles.legalMuted}`}>
              {t.abstract}
            </p>
            <div className={`mt-6 rounded-lg border p-4 font-mono text-sm leading-7 ${styles.legalSoft}`}>
              <Sigma aria-hidden="true" className="mb-3 h-5 w-5 text-brand-amber" />
              {t.formula}
            </div>
          </PaperSection>

          <PaperSection id="sources" eyebrow="01" title={t.sourceTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              {t.sourceIntro}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {platformNotes.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-lg border p-4 transition hover:border-brand-amber/60 ${styles.softSurface}`}
                >
                  <h3 className={`text-lg font-black ${styles.text}`}>{item.name}</h3>
                  <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>
                    {item.point}
                  </p>
                </a>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="model" eyebrow="02" title={t.modelTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              {t.modelIntro}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {componentCards.map(({ icon: Icon, title, cap, body }) => (
                <div key={title} className={`rounded-lg border p-5 ${styles.softSurface}`}>
                  <div className="flex items-center justify-between gap-3">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand-amber" />
                    <span className={`rounded-md border px-2 py-1 text-xs font-black ${styles.legalSoft}`}>{cap}</span>
                  </div>
                  <h3 className={`mt-4 text-lg font-black ${styles.text}`}>{title}</h3>
                  <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{body}</p>
                </div>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="weights" eyebrow="03" title={t.weightsTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              {t.weightsIntro}
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
                <thead>
                  <tr className={`border-b ${styles.legalBorder}`}>
                    <th className="py-3 pr-4 font-black">Variable</th>
                    <th className="py-3 pr-4 font-black">Peso</th>
                    <th className="py-3 pr-4 font-black">Tope</th>
                    <th className="py-3 font-black">Razon</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map(([name, weight, cap, reason]) => (
                    <tr key={name} className={`border-b ${styles.legalBorder}`}>
                      <td className="py-4 pr-4 font-black">{name}</td>
                      <td className="py-4 pr-4 font-mono text-xs">{weight}</td>
                      <td className="py-4 pr-4 font-mono text-xs">{cap}</td>
                      <td className={`py-4 font-semibold leading-6 ${styles.legalMuted}`}>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PaperSection>

          <PaperSection id="data" eyebrow="04" title={t.dataTitle}>
            <div className="grid gap-3">
              {dataSources.map(([source, fields, purpose]) => (
                <div key={source} className={`grid gap-3 rounded-lg border p-4 md:grid-cols-[14rem_1fr_1.2fr] ${styles.softSurface}`}>
                  <div className="flex items-center gap-2 font-mono text-sm font-black">
                    <Database aria-hidden="true" className="h-4 w-4 text-brand-amber" />
                    {source}
                  </div>
                  <div className="font-mono text-xs leading-6">{fields}</div>
                  <div className={`text-sm font-semibold leading-6 ${styles.legalMuted}`}>{purpose}</div>
                </div>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="examples" eyebrow="05" title={t.examplesTitle}>
            <div className="grid gap-5">
              {examples.map((example, index) => (
                <div key={example.title} className={`rounded-lg border p-5 ${styles.softSurface}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-amber text-sm font-black text-brand-ink">
                      {index + 1}
                    </span>
                    <h3 className={`text-xl font-black ${styles.text}`}>{example.title}</h3>
                  </div>
                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.1fr_1.1fr]">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-amber">Inputs</p>
                      <ul className={`mt-2 grid gap-1 text-sm font-semibold leading-6 ${styles.legalMuted}`}>
                        {example.inputs.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-amber">Resultado</p>
                      <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{example.result}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-amber">Lectura de producto</p>
                      <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{example.interpretation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="safety" eyebrow="06" title={t.safetyTitle}>
            <div className="grid gap-3 md:grid-cols-2">
              {safetyNotes.map((note) => (
                <div key={note} className={`flex gap-3 rounded-lg border p-4 ${styles.softSurface}`}>
                  <LockKeyhole aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
                  <p className={`text-sm font-semibold leading-6 ${styles.legalMuted}`}>{note}</p>
                </div>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="lifecycle" eyebrow="07" title={t.lifecycleTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              En MUR los posts expiran y se eliminan. Por eso el algoritmo separa dos mundos: <InlineCode>posts_total</InlineCode>, <InlineCode>likes_received_total</InlineCode> y <InlineCode>comments_received_total</InlineCode> describen el presente; <InlineCode>profile_activity_stats</InlineCode> y <InlineCode>user_rank_moderation_stats</InlineCode> conservan senales historicas compactas. Esto evita que una cuenta valiosa vuelva a cero cada dia y tambien evita que un reporte serio desaparezca junto con el post.
            </p>
          </PaperSection>

          <PaperSection id="implementation" eyebrow="08" title={t.implementationTitle}>
            <div className="grid gap-3">
              {implementationNotes.map(([label, value]) => (
                <div key={label} className={`grid gap-2 rounded-lg border p-4 md:grid-cols-[14rem_1fr] ${styles.softSurface}`}>
                  <div className="flex items-center gap-2 text-sm font-black">
                    <FileText aria-hidden="true" className="h-4 w-4 text-brand-amber" />
                    {label}
                  </div>
                  <div className="font-mono text-xs leading-6">{value}</div>
                </div>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="future" eyebrow="09" title={t.futureTitle}>
            <div className={`rounded-lg border p-5 ${styles.softSurface}`}>
              <p className={`text-sm font-semibold leading-7 ${styles.legalMuted}`}>
                En una version futura del feed/mapa, el score de autor puede entrar como multiplicador moderado, por ejemplo:
              </p>
              <pre className={`mt-4 overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-6 ${styles.legalSoft}`}>
{`post_relevance =
  freshness_score * 0.30 +
  distance_score * 0.25 +
  category_affinity * 0.15 +
  post_engagement_quality * 0.15 +
  author_private_rank * 0.15`}
              </pre>
              <p className={`mt-4 text-sm font-semibold leading-7 ${styles.legalMuted}`}>
                La recomendacion es no dejar que <InlineCode>author_private_rank</InlineCode> pase de 15% a 25% del score de un post. MUR es hiperlocal: distancia, frescura y categoria deben seguir teniendo mucho peso. El ranking privado sirve para desempatar y proteger calidad, no para crear celebridades globales.
              </p>
            </div>
          </PaperSection>

          <PaperSection id="references" eyebrow="10" title={t.referencesTitle}>
            <div className="grid gap-2">
              {references.map(([label, url]) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-lg border p-3 text-sm font-bold transition hover:border-brand-amber/60 ${styles.softSurface}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </PaperSection>
        </div>
      </div>
    </article>
  )
}

export default RankingPaperPage
