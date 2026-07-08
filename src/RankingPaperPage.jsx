import {
  ArrowLeft,
  BadgeCheck,
  BookOpenText,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react'

const GUIDE = {
  es: {
    badge: 'Guia operativa',
    title: 'Como funciona la relevancia en MUR',
    subtitle:
      'Una guia simple para equipos, devs, comercios y partners que quieren entender que mejora la visibilidad dentro de MUR sin exponer reglas internas sensibles.',
    updated: 'Actualizado: 8 de julio de 2026',
    back: 'Volver a MUR',
    navTitle: 'Indice',
    introTitle: 'Idea principal',
    intro:
      'MUR prioriza contenido cercano, util, actual y confiable. La relevancia no es un premio publico ni un numero visible: es una senal interna que ayuda a ordenar mejor la experiencia. El objetivo es que una persona vea primero lo que probablemente le sirve en su zona, no simplemente lo que mas ruido hace.',
    privacyNote:
      'Esta guia explica criterios de producto y buenas practicas. No publica reglas exactas, valores internos, estructuras tecnicas ni criterios sensibles de seguridad.',
    signalsTitle: 'Senales que ayudan',
    signalsIntro:
      'Las senales se agrupan por comportamiento. Algunas indican actividad, otras utilidad, otras confianza y otras seguridad. Ninguna senal por si sola garantiza visibilidad.',
    improveTitle: 'Como mejorar tu relevancia',
    avoidTitle: 'Que puede bajar la relevancia',
    examplesTitle: 'Casos practicos',
    audienceTitle: 'Guia por tipo de equipo',
    devTitle: 'Notas para devs',
    lifecycleTitle: 'Publicaciones de corta duracion',
    lifecycle:
      'MUR trabaja con contenido local de vida corta. Publicar algo util en el momento correcto pesa mas que acumular actividad vieja. La consistencia ayuda, pero el contenido vencido deja de competir como contenido activo.',
    closingTitle: 'Regla de oro',
    closing:
      'Para subir relevancia en MUR: publica cosas utiles, en la categoria correcta, con contexto claro, responde cuando la gente interactua y evita conductas que generen reportes o bloqueos.',
  },
  en: {
    badge: 'Operational guide',
    title: 'How relevance works in MUR',
    subtitle:
      'A simple guide for teams, developers, businesses, and partners who want to understand what improves visibility inside MUR without exposing sensitive internal rules.',
    updated: 'Updated: July 8, 2026',
    back: 'Back to MUR',
    navTitle: 'Contents',
    introTitle: 'Core idea',
    intro:
      'MUR prioritizes nearby, useful, current, and trustworthy content. Relevance is not a public badge or a visible number: it is an internal signal that helps order the experience. The goal is for people to see what is probably useful in their area first, not simply what makes the most noise.',
    privacyNote:
      'This guide explains product criteria and best practices. It does not publish exact rules, internal values, technical structures, or sensitive safety criteria.',
    signalsTitle: 'Signals that help',
    signalsIntro:
      'Signals are grouped by behavior. Some indicate activity, others usefulness, others trust, and others safety. No single signal guarantees visibility by itself.',
    improveTitle: 'How to improve relevance',
    avoidTitle: 'What can reduce relevance',
    examplesTitle: 'Practical cases',
    audienceTitle: 'Guide by team type',
    devTitle: 'Developer notes',
    lifecycleTitle: 'Short-lived posts',
    lifecycle:
      'MUR works with short-lived local content. Posting something useful at the right moment matters more than accumulating old activity. Consistency helps, but expired content no longer competes as active content.',
    closingTitle: 'Golden rule',
    closing:
      'To improve relevance in MUR: publish useful things, choose the right category, add clear context, reply when people interact, and avoid behavior that creates reports or blocks.',
  },
}

const navItems = [
  ['intro', 'Idea'],
  ['signals', 'Senales'],
  ['improve', 'Mejorar'],
  ['avoid', 'Evitar'],
  ['examples', 'Casos'],
  ['audience', 'Equipos'],
  ['devs', 'Devs'],
]

const helpfulSignals = [
  {
    icon: Clock3,
    title: 'Actividad actual',
    impact: 'Alto',
    body:
      'Publicar contenido reciente y vigente ayuda mas que tener actividad antigua. En MUR importa lo que esta pasando ahora cerca de alguien.',
  },
  {
    icon: MessageCircle,
    title: 'Conversacion real',
    impact: 'Alto',
    body:
      'Responder preguntas, recibir comentarios utiles y sostener conversaciones claras suele indicar que el contenido aporta valor.',
  },
  {
    icon: Users,
    title: 'Interaccion de personas distintas',
    impact: 'Medio alto',
    body:
      'Es mejor recibir participacion distribuida de varias personas que muchas acciones repetidas desde el mismo patron.',
  },
  {
    icon: BadgeCheck,
    title: 'Confianza del perfil',
    impact: 'Medio',
    body:
      'Un perfil claro, consistente y verificable ayuda a que MUR entienda que hay una identidad confiable detras del contenido.',
  },
  {
    icon: Store,
    title: 'Categoria y contexto correctos',
    impact: 'Medio',
    body:
      'Elegir bien la categoria, explicar que pasa y ubicar el contenido en el contexto adecuado mejora la experiencia de quienes lo ven.',
  },
  {
    icon: Sparkles,
    title: 'Calidad sostenida',
    impact: 'Medio',
    body:
      'La constancia importa, pero no como spam. Es mejor publicar menos y mejor que publicar mucho contenido repetido.',
  },
]

const improveItems = [
  'Publica cuando la informacion sea actual y util para una zona concreta.',
  'Usa una categoria precisa: alerta, comercio, mascota, ayuda, consulta u otra categoria relevante.',
  'Agrega contexto: que paso, donde aproximadamente, desde cuando y que accion esperas.',
  'Responde comentarios cuando alguien pide mas informacion.',
  'Evita republicar lo mismo muchas veces en poco tiempo.',
  'Completa el perfil de forma clara si representas un comercio, equipo o proyecto.',
  'Para comercios: comunica promos, novedades o avisos reales, no mensajes genericos permanentes.',
  'Para equipos de marketing: mide calidad de respuesta, no solo cantidad de publicaciones.',
]

const avoidItems = [
  'Contenido falso, confuso, exagerado o sin contexto local.',
  'Publicaciones repetidas que parezcan spam.',
  'Usar categorias incorrectas para ganar atencion.',
  'Prometer beneficios, descuentos o informacion que despues no se cumple.',
  'Ignorar preguntas importantes de la comunidad.',
  'Recibir reportes frecuentes por contenido molesto, inseguro o abusivo.',
  'Generar bloqueos por insistencia, acoso, venta agresiva o mensajes fuera de lugar.',
]

const examples = [
  {
    title: 'Comercio local que quiere mejorar visibilidad',
    do:
      'Publica una promo real, con horario, zona, categoria comercio y respuesta rapida a consultas.',
    why:
      'MUR puede entender mejor que el contenido es actual, claro y util para personas cercanas.',
  },
  {
    title: 'Vecino que reporta un problema urgente',
    do:
      'Publica una alerta clara, sin exagerar, con referencia aproximada y actualizacion si cambia la situacion.',
    why:
      'Las alertas utiles y recientes tienen mas valor cuando ayudan a tomar decisiones en el momento.',
  },
  {
    title: 'Equipo de marketing de una marca',
    do:
      'Planifica contenido por zona, evita repetir el mismo texto y responde dudas con informacion concreta.',
    why:
      'La relevancia mejora cuando el contenido se siente local y accionable, no como publicidad generica.',
  },
  {
    title: 'Cuenta con mucha actividad pero baja calidad',
    do:
      'Reducir frecuencia, mejorar contexto, usar categorias correctas y revisar que no haya quejas repetidas.',
    why:
      'Publicar mucho no compensa si el contenido genera reportes, bloqueos o baja utilidad.',
  },
]

const audienceGuides = [
  {
    icon: Store,
    title: 'Comercios y partners',
    body:
      'Prioricen avisos reales, horarios, disponibilidad, zona y respuesta rapida. Una publicacion comercial debe ayudar a decidir, no solo interrumpir.',
  },
  {
    icon: Users,
    title: 'Marketing y operaciones',
    body:
      'Trabajen por zonas y momentos. MUR es local: el mismo mensaje no deberia repetirse igual para todos los barrios.',
  },
  {
    icon: TrendingUp,
    title: 'Producto y growth',
    body:
      'Midan retencion de conversaciones, reportes, bloqueos, calidad de respuestas y recurrencia sana. No optimicen solo por volumen.',
  },
  {
    icon: CheckCircle2,
    title: 'Moderacion',
    body:
      'Las senales negativas son parte central de la calidad. Una cuenta con buena actividad pero mala convivencia no deberia ganar distribucion.',
  },
]

const devNotes = [
  'Tratar la relevancia como una senal de apoyo, no como el unico criterio de ordenamiento.',
  'Combinar relevancia con cercania, frescura, categoria, idioma/contexto y seguridad.',
  'No mostrar valores exactos al usuario final.',
  'No construir features que permitan adivinar reglas internas por prueba y error.',
  'Mantener logs, paneles internos y herramientas de analisis fuera de la landing publica.',
  'Cuando se agreguen planes comerciales o membresias, deben mejorar visibilidad solo dentro de limites sanos de calidad y seguridad.',
]

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-current/10 py-10">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-amber">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function ImpactPill({ children, styles }) {
  return (
    <span className={`rounded-md border px-2 py-1 text-xs font-black ${styles.legalSoft}`}>
      {children}
    </span>
  )
}

function RankingPaperPage({ language = 'es', styles }) {
  const t = GUIDE[language] ?? GUIDE.es

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
            <div className={`mt-6 inline-flex rounded-lg border px-3 py-2 text-sm font-bold ${styles.legalSoft}`}>
              {t.updated}
            </div>
          </div>

          <nav className={`rounded-lg border p-4 ${styles.surface}`}>
            <p className={`text-sm font-black ${styles.text}`}>{t.navTitle}</p>
            <div className="mt-3 grid gap-2">
              {navItems.map(([id, label]) => (
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
          <Section id="intro" eyebrow="01" title={t.introTitle}>
            <p className={`max-w-4xl text-base font-semibold leading-8 ${styles.legalMuted}`}>
              {t.intro}
            </p>
            <div className={`mt-6 flex gap-3 rounded-lg border p-4 ${styles.legalSoft}`}>
              <ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
              <p className={`text-sm font-bold leading-6 ${styles.legalMuted}`}>
                {t.privacyNote}
              </p>
            </div>
          </Section>

          <Section id="signals" eyebrow="02" title={t.signalsTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              {t.signalsIntro}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {helpfulSignals.map(({ icon: Icon, title, impact, body }) => (
                <div key={title} className={`rounded-lg border p-5 ${styles.softSurface}`}>
                  <div className="flex items-center justify-between gap-3">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand-amber" />
                    <ImpactPill styles={styles}>{impact}</ImpactPill>
                  </div>
                  <h3 className={`mt-4 text-lg font-black ${styles.text}`}>{title}</h3>
                  <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="improve" eyebrow="03" title={t.improveTitle}>
            <div className="grid gap-3 md:grid-cols-2">
              {improveItems.map((item) => (
                <div key={item} className={`flex gap-3 rounded-lg border p-4 ${styles.softSurface}`}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
                  <p className={`text-sm font-semibold leading-6 ${styles.legalMuted}`}>{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="avoid" eyebrow="04" title={t.avoidTitle}>
            <div className="grid gap-3 md:grid-cols-2">
              {avoidItems.map((item) => (
                <div key={item} className={`flex gap-3 rounded-lg border p-4 ${styles.softSurface}`}>
                  <ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
                  <p className={`text-sm font-semibold leading-6 ${styles.legalMuted}`}>{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="examples" eyebrow="05" title={t.examplesTitle}>
            <div className="grid gap-5">
              {examples.map((example, index) => (
                <div key={example.title} className={`rounded-lg border p-5 ${styles.softSurface}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-amber text-sm font-black text-brand-ink">
                      {index + 1}
                    </span>
                    <h3 className={`text-xl font-black ${styles.text}`}>{example.title}</h3>
                  </div>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-amber">Hacer</p>
                      <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{example.do}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-amber">Por que ayuda</p>
                      <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{example.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="audience" eyebrow="06" title={t.audienceTitle}>
            <div className="grid gap-4 md:grid-cols-2">
              {audienceGuides.map(({ icon: Icon, title, body }) => (
                <div key={title} className={`rounded-lg border p-5 ${styles.softSurface}`}>
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-amber" />
                  <h3 className={`mt-4 text-lg font-black ${styles.text}`}>{title}</h3>
                  <p className={`mt-2 text-sm font-semibold leading-6 ${styles.legalMuted}`}>{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="devs" eyebrow="07" title={t.devTitle}>
            <div className="grid gap-3">
              {devNotes.map((item) => (
                <div key={item} className={`flex gap-3 rounded-lg border p-4 ${styles.softSurface}`}>
                  <TrendingUp aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
                  <p className={`text-sm font-semibold leading-6 ${styles.legalMuted}`}>{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="lifecycle" eyebrow="08" title={t.lifecycleTitle}>
            <p className={`max-w-4xl text-sm font-semibold leading-7 ${styles.legalMuted}`}>
              {t.lifecycle}
            </p>
          </Section>

          <Section id="closing" eyebrow="09" title={t.closingTitle}>
            <div className={`rounded-lg border p-5 ${styles.legalSoft}`}>
              <p className={`text-base font-black leading-8 ${styles.text}`}>
                {t.closing}
              </p>
            </div>
          </Section>
        </div>
      </div>
    </article>
  )
}

export default RankingPaperPage
