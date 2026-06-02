import { useEffect, useState } from 'react'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Compass,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Moon,
  Rocket,
  ShieldCheck,
  Sun,
  Trash2,
} from 'lucide-react'

import NetworkBackground from './components/NetworkBackground'

const BRAND = {
  name: 'Mur',
  supportEmail: 'support@olvidafter.com',
  launchDeadline: '2026-06-07T23:59:59-03:00',
}

const LANGUAGES = ['es', 'en']
const THEMES = ['dark', 'light']

const THEME = {
  dark: {
    marketingPage: 'bg-bg-primary text-text-main',
    legalPage: 'bg-[#111827] text-[#f9fafb]',
    nav: 'border-white/10 bg-surface/75 backdrop-blur-xl',
    navNarrow: 'border-[#374151] bg-[#111827]',
    navText: 'text-text-muted hover:text-text-main',
    navTextNarrow: 'text-[#d1d5db] hover:text-white',
    logoText: 'text-accent',
    text: 'text-text-main',
    muted: 'text-text-muted',
    border: 'border-white/10',
    surface: 'border-white/10 bg-surface-strong/80 shadow-soft backdrop-blur-md',
    softSurface: 'border-white/10 bg-surface/70 backdrop-blur-md',
    insetSurface: 'border-white/10 bg-[#161622]/70',
    flipClock: 'mur-flip-clock-dark',
    legalBorder: 'border-[#374151]',
    legalMuted: 'text-[#d1d5db]',
    legalSoft: 'border-[#374151] bg-[#111827] text-[#f9fafb]',
    primaryButton: 'bg-accent text-[#161622] hover:brightness-110',
    activeControl: 'border-accent bg-accent text-[#161622]',
    inactiveControl: 'border-white/10 bg-transparent text-text-muted hover:text-text-main',
    legalDivide: 'divide-[#374151]',
  },
  light: {
    marketingPage: 'bg-[#f8fafc] text-[#111827]',
    legalPage: 'bg-[#f8fafc] text-[#111827]',
    nav: 'border-[#e5e7eb] bg-white/90 backdrop-blur-xl',
    navNarrow: 'border-[#e5e7eb] bg-white',
    navText: 'text-[#4b5563] hover:text-[#111827]',
    navTextNarrow: 'text-[#4b5563] hover:text-[#111827]',
    logoText: 'text-[#111827]',
    text: 'text-[#111827]',
    muted: 'text-[#4b5563]',
    border: 'border-[#e5e7eb]',
    surface: 'border-[#e5e7eb] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]',
    softSurface: 'border-[#e5e7eb] bg-white',
    insetSurface: 'border-[#e5e7eb] bg-[#f8fafc]',
    flipClock: 'mur-flip-clock-light',
    legalBorder: 'border-[#e5e7eb]',
    legalMuted: 'text-[#4b5563]',
    legalSoft: 'border-[#e5e7eb] bg-white text-[#111827]',
    primaryButton: 'bg-[#111827] text-white hover:bg-[#1f2937]',
    activeControl: 'border-[#111827] bg-[#111827] text-white',
    inactiveControl: 'border-[#d1d5db] bg-transparent text-[#4b5563] hover:text-[#111827]',
    legalDivide: 'divide-[#e5e7eb]',
  },
}

const CONTENT = {
  es: {
    locale: 'es-AR',
    nav: {
      launch: 'Lanzamiento',
      privacy: 'Privacidad',
      deleteAccount: 'Eliminar cuenta',
    },
    controls: {
      language: 'Idioma',
      theme: 'Tema',
      spanish: 'ES',
      english: 'EN',
      light: 'Claro',
      dark: 'Oscuro',
    },
    footer: {
      tagline: 'Comunidad cerca tuyo.',
      privacy: 'Politica de privacidad',
      deleteAccount: 'Eliminar cuenta',
    },
    home: {
      title: 'Mur',
      subtitle: 'De que sirve estar conectado con todo el mundo si no sabes que pasa cerca tuyo?',
      body:
        'Publica posts visibles en tu zona, explora actividad en el mapa, comenta con personas cercanas y recibe alertas filtradas por las categorias que te importan.',
      featuresLabel: 'Que podes hacer',
      featuresTitle: 'Una app para descubrir, publicar y cuidar tu zona',
      featuresBody:
        'Mur esta pensada para contenido inmediato y local: menos ruido, mas contexto y controles claros para participar con seguridad.',
      stepsLabel: 'Flujo simple',
      stepsTitle: 'De tu ubicacion al feed en pocos pasos',
    },
    countdown: {
      title: 'Lanzamiento',
      units: ['dias', 'horas', 'minutos', 'segundos'],
    },
    features: [
      {
        title: 'Feed cercano',
        description:
          'Publica y lee posts visibles para personas cerca tuyo, con categorias para filtrar lo que importa en tu zona.',
      },
      {
        title: 'Mapa de actividad',
        description:
          'Explora posts que comparten ubicacion exacta de forma opcional y abre el punto en Maps cuando necesites contexto.',
      },
      {
        title: 'Alertas por categoria',
        description:
          'Activa notificaciones cercanas y elige que categorias pueden avisarte para evitar ruido innecesario.',
      },
      {
        title: 'Controles de seguridad',
        description:
          'Reporta posts, bloquea usuarios y elimina tu cuenta y datos desde la app cuando lo necesites.',
      },
    ],
    steps: [
      {
        title: 'Descubri lo que pasa cerca',
        body:
          'El feed se ordena alrededor de tu ubicacion y muestra actividad reciente de tu zona.',
      },
      {
        title: 'Publica con contexto',
        body:
          'Crea un post, elige una categoria y decide si queres compartir el punto exacto.',
      },
      {
        title: 'Conversa sin salir del barrio',
        body:
          'Comenta, da like, comparte posts y abre perfiles publicos de personas cercanas.',
      },
    ],
    legal: {
      back: 'Volver',
      effective: 'Vigente desde el 2 de junio de 2026',
      title: 'Politica de privacidad',
      intro:
        'Mur es una app de comunidad local. Esta politica explica que datos de la app recopilamos, por que los usamos y como los usuarios pueden eliminar su cuenta y datos asociados.',
      sections: [
        {
          title: 'Datos que recopilamos',
          body:
            'Mur puede recopilar email, nombre de usuario, perfil publico, posts, comentarios, likes, reportes, bloqueos, preferencias, tokens de notificaciones y ubicacion usada para mostrar contenido cercano.',
        },
        {
          title: 'Uso de ubicacion',
          body:
            'La ubicacion se usa para mostrar posts cercanos, publicar contenido en tu zona y enviar alertas cercanas opcionales. Compartir la ubicacion exacta de un post es opcional.',
        },
        {
          title: 'Seguridad y moderacion',
          body:
            'Los reportes y bloqueos ayudan a revisar contenido inseguro, reducir abuso y mejorar la seguridad de la comunidad.',
        },
        {
          title: 'Eliminacion de cuenta',
          body:
            'Los usuarios pueden eliminar su cuenta desde la app entrando a Perfil, luego Cuenta, y tocando Eliminar cuenta. Tambien pueden solicitar eliminacion desde la pagina publica de eliminacion de cuenta.',
        },
      ],
    },
    deleteAccount: {
      badge: 'Cuenta y eliminacion de datos',
      title: 'Elimina tu cuenta de Mur',
      intro:
        'Para eliminar tu cuenta desde la app, abri Mur, entra a Perfil, luego Cuenta, y toca Eliminar cuenta.',
      deletedTitle: 'Que se elimina',
      deletedBody:
        'La eliminacion borra tu perfil, posts, comentarios, likes, tokens de notificaciones, ubicacion cercana usada para alertas, reportes y registros de bloqueo asociados a tu cuenta.',
      noAccessTitle: 'Si ya no tenes acceso a la app',
      noAccessBody:
        'Escribinos desde el email asociado a tu cuenta y pedinos la eliminacion de cuenta y datos. Usamos ese email para verificar la titularidad antes de procesar la solicitud.',
      mailSubject: 'Solicitud de eliminacion de cuenta Mur',
    },
  },
  en: {
    locale: 'en-US',
    nav: {
      launch: 'Launch',
      privacy: 'Privacy',
      deleteAccount: 'Delete account',
    },
    controls: {
      language: 'Language',
      theme: 'Theme',
      spanish: 'ES',
      english: 'EN',
      light: 'Light',
      dark: 'Dark',
    },
    footer: {
      tagline: 'Community close to you.',
      privacy: 'Privacy policy',
      deleteAccount: 'Delete account',
    },
    home: {
      title: 'Mur',
      subtitle: 'What is the point of being connected to the whole world if you do not know what is happening nearby?',
      body:
        'Publish posts visible in your area, explore activity on the map, comment with nearby people, and receive alerts filtered by the categories you care about.',
      featuresLabel: 'What you can do',
      featuresTitle: 'An app to discover, publish, and protect your area',
      featuresBody:
        'Mur is built for immediate local content: less noise, more context, and clear controls to participate safely.',
      stepsLabel: 'Simple flow',
      stepsTitle: 'From your location to the feed in a few steps',
    },
    countdown: {
      title: 'Launch',
      units: ['days', 'hours', 'minutes', 'seconds'],
    },
    features: [
      {
        title: 'Nearby feed',
        description:
          'Publish and read posts visible to people near you, with categories to filter what matters in your area.',
      },
      {
        title: 'Activity map',
        description:
          'Explore posts that optionally share an exact location and open the point in Maps when you need context.',
      },
      {
        title: 'Category alerts',
        description:
          'Turn on nearby notifications and choose which categories can alert you so you avoid unnecessary noise.',
      },
      {
        title: 'Safety controls',
        description:
          'Report posts, block users, and delete your account and data from inside the app when you need to.',
      },
    ],
    steps: [
      {
        title: 'Discover what is nearby',
        body:
          'The feed is organized around your location and shows recent activity in your area.',
      },
      {
        title: 'Publish with context',
        body:
          'Create a post, choose a category, and decide whether to share the exact point.',
      },
      {
        title: 'Talk without leaving the neighborhood',
        body:
          'Comment, like, share posts, and open public profiles from people nearby.',
      },
    ],
    legal: {
      back: 'Back',
      effective: 'Effective June 2, 2026',
      title: 'Privacy Policy',
      intro:
        'Mur is a local community app. This policy explains what app data we collect, why we use it, and how users can delete their account and associated data.',
      sections: [
        {
          title: 'Data we collect',
          body:
            'Mur may collect your email, username, public profile, posts, comments, likes, reports, blocks, preferences, notification tokens, and location used to show nearby content.',
        },
        {
          title: 'How location is used',
          body:
            'Location is used to show nearby posts, publish content in your area, and send optional nearby alerts. Sharing an exact post location is optional.',
        },
        {
          title: 'Safety and moderation',
          body:
            'Reports and blocks help us review unsafe content, reduce abuse, and improve community safety.',
        },
        {
          title: 'Account deletion',
          body:
            'Users can delete their account from the app by opening Profile, then Account, and tapping Delete account. They can also request deletion from the public account deletion page.',
        },
      ],
    },
    deleteAccount: {
      badge: 'Account and data deletion',
      title: 'Delete your Mur account',
      intro:
        'To delete your account from the app, open Mur, go to Profile, then Account, and tap Delete account.',
      deletedTitle: 'What gets deleted',
      deletedBody:
        'Deletion removes your profile, posts, comments, likes, notification tokens, nearby location data used for alerts, reports, and block records associated with your account.',
      noAccessTitle: 'If you no longer have access to the app',
      noAccessBody:
        'Email us from the address associated with your account and request account and data deletion. We use that email to verify ownership before processing the request.',
      mailSubject: 'Mur account deletion request',
    },
  },
}

const springTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
}

const featureGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

const featureItem = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
}

const featureIcons = [Compass, MapPin, Bell, ShieldCheck]

const getStoredPreference = (key, allowed, fallback) => {
  if (typeof window === 'undefined') return fallback

  const stored = window.localStorage.getItem(key)
  return allowed.includes(stored) ? stored : fallback
}

function PreferenceControls({ language, setLanguage, theme, setTheme, t, styles }) {
  const nextLanguage = language === 'es' ? 'en' : 'es'
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        aria-label={t.controls.language}
        onClick={() => setLanguage(nextLanguage)}
        className={`inline-flex items-center rounded-full border p-1 text-xs font-bold transition ${styles.insetSurface}`}
      >
        <Globe2 aria-hidden="true" className={`ml-2 mr-1 h-4 w-4 ${styles.muted}`} />
        <span
          className={`inline-flex min-w-[46px] justify-center rounded-full px-3 py-1.5 transition ${
            language === 'en' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          EN
        </span>
        <span
          className={`inline-flex min-w-[46px] justify-center rounded-full px-3 py-1.5 transition ${
            language === 'es' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          ES
        </span>
      </button>

      <button
        type="button"
        aria-label={t.controls.theme}
        onClick={() => setTheme(nextTheme)}
        className={`inline-flex items-center rounded-full border p-1 text-xs font-bold transition ${styles.insetSurface}`}
      >
        <span
          className={`inline-flex min-w-[86px] items-center justify-center gap-1 rounded-full px-3 py-1.5 transition ${
            theme === 'dark' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          <Moon aria-hidden="true" className="h-3.5 w-3.5" />
          {t.controls.dark}
        </span>
        <span
          className={`inline-flex min-w-[86px] items-center justify-center gap-1 rounded-full px-3 py-1.5 transition ${
            theme === 'light' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          <Sun aria-hidden="true" className="h-3.5 w-3.5" />
          {t.controls.light}
        </span>
      </button>
    </div>
  )
}

function FeatureCard({ id, title, description, icon: Icon, styles }) {
  return (
    <motion.article
      id={id}
      variants={featureItem}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`scroll-mt-24 rounded-lg border p-6 ${styles.surface}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className={`mt-6 text-xl font-semibold ${styles.text}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>{description}</p>
    </motion.article>
  )
}

function TypewriterText({ text }) {
  const [visibleLength, setVisibleLength] = useState(0)

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (shouldReduceMotion) {
      setVisibleLength(text.length)
      return undefined
    }

    let currentLength = 0
    let timer

    setVisibleLength(0)

    const typeNextCharacter = () => {
      currentLength += 1
      setVisibleLength(currentLength)

      if (currentLength >= text.length) return

      const currentCharacter = text[currentLength - 1]
      const delay = /[?.!]/.test(currentCharacter) ? 170 : currentCharacter === ' ' ? 28 : 42

      timer = window.setTimeout(typeNextCharacter, delay)
    }

    timer = window.setTimeout(typeNextCharacter, 320)

    return () => window.clearTimeout(timer)
  }, [text])

  return (
    <span className="typewriter-text" aria-hidden="true">
      <span className="typewriter-measure">{text}</span>
      <span className="typewriter-line">
        {text.slice(0, visibleLength)}
        <span className="typewriter-caret" />
      </span>
    </span>
  )
}

function LaunchCountdown({ t, styles }) {
  return (
    <section id="countdown" className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className={`mx-auto max-w-5xl rounded-lg border px-5 py-8 text-center ${styles.surface}`}>
        <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          <Rocket aria-hidden="true" className="h-4 w-4" />
          {t.countdown.title}
        </div>

        <div className="mt-8 flex justify-center overflow-x-auto px-1 pb-6 pt-1">
          <FlipClockCountdown
            to={new Date(BRAND.launchDeadline).getTime()}
            labels={t.countdown.units}
            className={`mur-flip-clock ${styles.flipClock}`}
            duration={0.75}
            hideOnComplete={false}
            stopOnHiddenVisibility
            spacing={{
              clock: 'clamp(0.35rem, 2vw, 1.1rem)',
              digitBlock: 'clamp(0.18rem, 0.8vw, 0.38rem)',
            }}
            digitBlockStyle={{
              width: 'clamp(2rem, 7vw, 4.25rem)',
              height: 'clamp(3.15rem, 10vw, 6.6rem)',
              borderRadius: '0.5rem',
              fontSize: 'clamp(1.9rem, 6vw, 4.5rem)',
            }}
            labelStyle={{
              fontSize: '0.72rem',
              color: 'currentColor',
            }}
            dividerStyle={{
              height: '2px',
            }}
            separatorStyle={{
              size: 'clamp(0.22rem, 0.8vw, 0.36rem)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

function MarketingShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()

  return (
    <main className={`relative min-h-screen overflow-hidden ${styles.marketingPage}`}>
      <NetworkBackground theme={theme} />

      <div className="relative z-10">
        <nav className={`sticky top-0 z-50 border-b ${styles.nav}`}>
          <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <a href="/" className="flex items-center gap-3" aria-label={BRAND.name}>
              <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
              <span className={`text-lg font-bold ${styles.logoText}`}>MUR</span>
            </a>
            <div className="flex flex-col gap-3 lg:items-end">
              <div className={`flex flex-wrap items-center gap-4 text-sm ${styles.navText}`}>
                <a className="transition" href="#countdown">
                  {t.nav.launch}
                </a>
                <a className="transition" href="/privacy">
                  {t.nav.privacy}
                </a>
                <a className="transition" href="/delete-account">
                  {t.nav.deleteAccount}
                </a>
              </div>
              <PreferenceControls
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                t={t}
                styles={styles}
              />
            </div>
          </div>
        </nav>

        {children}

        <footer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className={`mx-auto flex max-w-6xl flex-col gap-3 text-sm ${styles.muted} sm:flex-row sm:items-center sm:justify-between`}>
            <span>© {currentYear} {BRAND.name}. {t.footer.tagline}</span>
            <div className="flex gap-4">
              <a className={`transition ${styles.navText}`} href="/privacy">
                {t.footer.privacy}
              </a>
              <a className={`transition ${styles.navText}`} href="/delete-account">
                {t.footer.deleteAccount}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

function LegalShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()

  return (
    <main className={`min-h-screen ${styles.legalPage}`}>
      <nav className={`border-b ${styles.navNarrow}`}>
        <div className="mx-auto flex min-h-16 max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label={BRAND.name}>
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span className={`text-base font-bold ${styles.text}`}>MUR</span>
          </a>
          <div className="flex flex-col gap-3 md:items-end">
            <div className={`flex items-center gap-4 text-sm ${styles.navTextNarrow}`}>
              <a className="transition" href="/privacy">
                {t.nav.privacy}
              </a>
              <a className="transition" href="/delete-account">
                {t.nav.deleteAccount}
              </a>
            </div>
            <PreferenceControls
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
              t={t}
              styles={styles}
            />
          </div>
        </div>
      </nav>

      {children}

      <footer className={`border-t px-4 py-8 sm:px-6 lg:px-8 ${styles.navNarrow}`}>
        <div className={`mx-auto flex max-w-5xl flex-col gap-3 text-sm ${styles.legalMuted} sm:flex-row sm:items-center sm:justify-between`}>
          <span>© {currentYear} {BRAND.name}.</span>
          <div className="flex gap-4">
            <a className={`transition ${styles.navTextNarrow}`} href="/privacy">
              {t.footer.privacy}
            </a>
            <a className={`transition ${styles.navTextNarrow}`} href="/delete-account">
              {t.footer.deleteAccount}
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function HomePage({ t, styles }) {
  return (
    <>
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={heroItem}
            className="flex justify-center"
          >
            <img
              src="/logo.png"
              alt={t.home.title}
              className="h-40 w-40 object-contain sm:h-52 sm:w-52 lg:h-64 lg:w-64"
            />
          </motion.h1>
          <motion.p
            variants={heroItem}
            className={`mx-auto mt-7 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${styles.text}`}
          >
            <span className="sr-only">{t.home.subtitle}</span>
            <TypewriterText text={t.home.subtitle} />
          </motion.p>
          <motion.p
            variants={heroItem}
            className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${styles.muted}`}
          >
            {t.home.body}
          </motion.p>
        </motion.div>
      </section>

      <LaunchCountdown t={t} styles={styles} />

      <section id="features" className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">
              {t.home.featuresLabel}
            </p>
            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${styles.text}`}>
              {t.home.featuresTitle}
            </h2>
            <p className={`mt-4 text-base leading-7 ${styles.muted}`}>
              {t.home.featuresBody}
            </p>
          </div>

          <motion.div
            variants={featureGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {t.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                id={`feature-${index}`}
                icon={featureIcons[index]}
                title={feature.title}
                description={feature.description}
                styles={styles}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">
              {t.home.stepsLabel}
            </p>
            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${styles.text}`}>
              {t.home.stepsTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.steps.map((step, index) => (
              <article
                key={step.title}
                className={`rounded-lg border p-6 ${styles.surface}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                  {index + 1}
                </div>
                <h3 className={`mt-5 text-xl font-semibold ${styles.text}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function LegalPage({ t, styles }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.legal.back}
        </a>
        <div className={`mt-8 border-b pb-8 ${styles.legalBorder}`}>
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${styles.legalSoft}`}>
            <FileText aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className={`mt-6 text-sm font-semibold uppercase tracking-wide ${styles.legalMuted}`}>
            {t.legal.effective}
          </p>
          <h1 className={`mt-3 text-4xl font-bold tracking-tight ${styles.text}`}>
            {t.legal.title}
          </h1>
          <p className={`mt-5 text-base leading-7 ${styles.legalMuted}`}>
            {t.legal.intro}
          </p>
        </div>

        <div className={`divide-y ${styles.legalDivide}`}>
          {t.legal.sections.map((section) => (
            <article key={section.title} className="py-8">
              <h2 className={`text-xl font-semibold ${styles.text}`}>
                {section.title}
              </h2>
              <p className={`mt-3 text-sm leading-6 ${styles.legalMuted}`}>
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeleteAccountPage({ t, styles }) {
  const mailto = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
    t.deleteAccount.mailSubject,
  )}`

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.legal.back}
        </a>
        <div className={`mt-8 border-b pb-8 ${styles.legalBorder}`}>
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${styles.legalSoft}`}>
            <Trash2 aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className={`mt-6 text-sm font-semibold uppercase tracking-wide ${styles.legalMuted}`}>
            {t.deleteAccount.badge}
          </p>
          <h1 className={`mt-3 text-4xl font-bold tracking-tight ${styles.text}`}>
            {t.deleteAccount.title}
          </h1>
          <p className={`mt-5 text-base leading-7 ${styles.legalMuted}`}>
            {t.deleteAccount.intro}
          </p>
        </div>

        <div className={`divide-y ${styles.legalDivide}`}>
          <article className="py-8">
            <h2 className={`text-xl font-semibold ${styles.text}`}>
              {t.deleteAccount.deletedTitle}
            </h2>
            <p className={`mt-3 text-sm leading-6 ${styles.legalMuted}`}>
              {t.deleteAccount.deletedBody}
            </p>
          </article>

          <article className="py-8">
            <h2 className={`text-xl font-semibold ${styles.text}`}>
              {t.deleteAccount.noAccessTitle}
            </h2>
            <p className={`mt-3 text-sm leading-6 ${styles.legalMuted}`}>
              {t.deleteAccount.noAccessBody}
            </p>
            <a
              href={mailto}
              className={`mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${styles.primaryButton}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {BRAND.supportEmail}
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [language, setLanguage] = useState(() =>
    getStoredPreference('mur-language', LANGUAGES, 'es'),
  )
  const [theme, setTheme] = useState(() =>
    getStoredPreference('mur-theme', THEMES, 'dark'),
  )
  const path = window.location.pathname
  const isPrivacy = path === '/privacy' || path === '/privacy-policy'
  const isDeleteAccount = path === '/delete-account'
  const t = CONTENT[language]
  const styles = THEME[theme]

  useEffect(() => {
    window.localStorage.setItem('mur-language', language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('mur-theme', theme)
    document.documentElement.dataset.theme = theme
    document.body.style.backgroundColor = theme === 'dark' ? '#111827' : '#f8fafc'
  }, [theme])

  if (isPrivacy || isDeleteAccount) {
    return (
      <LegalShell
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        t={t}
        styles={styles}
      >
        {isPrivacy ? <LegalPage t={t} styles={styles} /> : null}
        {isDeleteAccount ? <DeleteAccountPage t={t} styles={styles} /> : null}
      </LegalShell>
    )
  }

  return (
    <MarketingShell
      language={language}
      setLanguage={setLanguage}
      theme={theme}
      setTheme={setTheme}
      t={t}
      styles={styles}
    >
      <HomePage t={t} styles={styles} />
    </MarketingShell>
  )
}

export default App
