import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Clock3,
  Compass,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  Users,
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
      eyebrow: 'Red social hiperlocal para conversaciones cercanas',
      title: 'Mur',
      subtitle: 'Lo que pasa cerca, contado por quienes estan cerca.',
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
      badge: 'Disponible proximamente',
      title: 'Estamos descontando hasta la apertura de Mur',
      deadline: 'Fecha techo: domingo 7 de junio de 2026, 23:59:59.',
      seconds: 'Segundos restantes',
      units: ['dias', 'horas', 'min', 'seg'],
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
      eyebrow: 'Hyperlocal social network for nearby conversations',
      title: 'Mur',
      subtitle: 'What is happening nearby, told by people nearby.',
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
      badge: 'Available soon',
      title: 'We are counting down to Mur opening',
      deadline: 'Deadline: Sunday, June 7, 2026, 23:59:59.',
      seconds: 'Seconds remaining',
      units: ['days', 'hours', 'min', 'sec'],
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

const getCountdown = () => {
  const deadline = new Date(BRAND.launchDeadline).getTime()
  const remainingMs = Math.max(0, deadline - Date.now())
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { totalSeconds, days, hours, minutes, seconds }
}

const formatNumber = (value, locale) => new Intl.NumberFormat(locale).format(value)
const padTime = (value) => String(value).padStart(2, '0')

function PreferenceControls({ language, setLanguage, theme, setTheme, t, styles }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <div
        aria-label={t.controls.language}
        className={`inline-flex items-center gap-2 rounded-lg border px-2 py-1 ${styles.insetSurface}`}
      >
        <Globe2 aria-hidden="true" className={`h-4 w-4 ${styles.muted}`} />
        <span className={`hidden text-xs font-semibold sm:inline ${styles.muted}`}>
          {t.controls.language}
        </span>
        {LANGUAGES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={`min-w-[48px] rounded-md px-3 py-1.5 text-center text-xs font-bold transition ${
              language === option ? styles.activeControl : styles.inactiveControl
            }`}
          >
            {option === 'es' ? t.controls.spanish : t.controls.english}
          </button>
        ))}
      </div>

      <div
        aria-label={t.controls.theme}
        className={`inline-flex items-center gap-2 rounded-lg border px-2 py-1 ${styles.insetSurface}`}
      >
        <span className={`hidden text-xs font-semibold sm:inline ${styles.muted}`}>
          {t.controls.theme}
        </span>
        {THEMES.map((option) => {
          const Icon = option === 'dark' ? Moon : Sun
          return (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className={`inline-flex min-w-[84px] items-center justify-center gap-1 rounded-md px-3 py-1.5 text-xs font-bold transition ${
                theme === option ? styles.activeControl : styles.inactiveControl
              }`}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              {option === 'dark' ? t.controls.dark : t.controls.light}
            </button>
          )
        })}
      </div>
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

function LaunchCountdown({ t, styles }) {
  const [timeLeft, setTimeLeft] = useState(getCountdown)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getCountdown())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = t.countdown.units.map((label, index) => ({
    label,
    value: [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index],
  }))

  return (
    <section id="countdown" className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className={`mx-auto max-w-6xl border-y py-8 ${styles.border}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${styles.softSurface} ${styles.muted}`}>
              <Clock3 aria-hidden="true" className="h-4 w-4 text-accent" />
              {t.countdown.badge}
            </div>
            <h2 className={`mt-5 text-3xl font-bold sm:text-4xl ${styles.text}`}>
              {t.countdown.title}
            </h2>
            <p className={`mt-4 max-w-2xl text-base leading-7 ${styles.muted}`}>
              {t.countdown.deadline}
            </p>
          </div>

          <div className={`rounded-lg border p-5 ${styles.surface}`}>
            <p className="text-sm font-semibold uppercase text-accent">
              {t.countdown.seconds}
            </p>
            <div className={`mt-3 font-mono text-5xl font-bold leading-none sm:text-6xl ${styles.text}`}>
              {formatNumber(timeLeft.totalSeconds, t.locale)}
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className={`rounded-lg border p-3 text-center ${styles.insetSurface}`}
                >
                  <div className={`font-mono text-2xl font-bold ${styles.text}`}>
                    {padTime(unit.value)}
                  </div>
                  <div className={`mt-1 text-xs uppercase ${styles.muted}`}>
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketingShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()

  return (
    <main className={`relative min-h-screen overflow-hidden ${styles.marketingPage}`}>
      {theme === 'dark' ? <NetworkBackground /> : null}

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
          <motion.div
            variants={heroItem}
            className={`mx-auto inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${styles.softSurface} ${styles.muted}`}
          >
            <Users aria-hidden="true" className="h-4 w-4 text-accent" />
            {t.home.eyebrow}
          </motion.div>

          <motion.h1
            variants={heroItem}
            className={`mt-7 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl ${styles.text}`}
          >
            {t.home.title}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className={`mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl ${styles.text}`}
          >
            {t.home.subtitle}
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
