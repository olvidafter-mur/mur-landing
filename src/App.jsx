import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Compass,
  FileText,
  Globe2,
  AtSign,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  X,
} from 'lucide-react'

import NetworkBackground from './components/NetworkBackground'

const BRAND = {
  name: 'Mur',
  supportEmail: 'olvidaftech.mur@gmail.com',
  instagramHandle: '@mur.app',
  instagramUrl: 'https://www.instagram.com/mur.app/',
}

const LANGUAGES = ['es', 'en']
const THEMES = ['dark', 'light']

const THEME = {
  dark: {
    marketingPage: 'bg-brand-blue text-brand-cream-light',
    legalPage: 'bg-brand-blue-deep text-brand-cream-light',
    nav: 'border-brand-cream/15 bg-brand-blue/80 backdrop-blur-xl',
    navNarrow: 'border-brand-cream/15 bg-brand-blue-deep',
    navText: 'text-brand-cream/80 hover:text-brand-cream-light',
    navTextNarrow: 'text-brand-cream/80 hover:text-brand-cream-light',
    navLink: 'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light hover:border-accent/70 hover:bg-brand-cream/10 hover:text-white',
    navLinkNarrow: 'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light hover:border-accent/70 hover:bg-brand-cream/10 hover:text-white',
    logoText: 'text-brand-orange',
    text: 'text-brand-cream-light',
    muted: 'text-brand-cream/85',
    border: 'border-brand-cream/15',
    surface: 'border-brand-cream/15 bg-surface-strong/85 shadow-soft backdrop-blur-md',
    softSurface: 'border-brand-cream/15 bg-surface/75 backdrop-blur-md',
    insetSurface: 'border-brand-cream/15 bg-brand-blue/70',
    legalBorder: 'border-brand-cream/15',
    legalMuted: 'text-brand-cream/85',
    legalSoft: 'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light',
    primaryButton: 'bg-brand-cream text-brand-blue hover:bg-brand-cream-light',
    activeControl: 'border-accent bg-accent text-brand-blue',
    inactiveControl: 'border-brand-cream/15 bg-transparent text-brand-cream/80 hover:text-brand-cream-light',
    legalDivide: 'divide-brand-cream/15',
  },
  light: {
    marketingPage: 'bg-brand-cream-light text-brand-blue-deep',
    legalPage: 'bg-brand-cream-light text-brand-blue-deep',
    nav: 'border-brand-blue/10 bg-brand-cream-light/90 backdrop-blur-xl',
    navNarrow: 'border-brand-blue/10 bg-brand-cream-light',
    navText: 'text-brand-blue/75 hover:text-brand-blue-deep',
    navTextNarrow: 'text-brand-blue/75 hover:text-brand-blue-deep',
    navLink: 'border-brand-blue/10 bg-white/60 text-brand-blue/80 shadow-sm hover:border-accent/70 hover:bg-brand-cream hover:text-brand-blue-deep',
    navLinkNarrow: 'border-brand-blue/10 bg-white/60 text-brand-blue/80 hover:border-accent/70 hover:bg-brand-cream hover:text-brand-blue-deep',
    logoText: 'text-brand-blue-deep',
    text: 'text-brand-blue-deep',
    muted: 'text-brand-blue/75',
    border: 'border-brand-blue/10',
    surface: 'border-brand-blue/10 bg-white/70 shadow-[0_18px_60px_rgba(22,22,34,0.08)] backdrop-blur-sm',
    softSurface: 'border-brand-blue/10 bg-white/65',
    insetSurface: 'border-brand-blue/10 bg-white/55',
    legalBorder: 'border-brand-blue/10',
    legalMuted: 'text-brand-blue/75',
    legalSoft: 'border-brand-blue/10 bg-white/65 text-brand-blue-deep',
    primaryButton: 'bg-brand-blue text-brand-cream-light hover:bg-brand-blue-deep',
    activeControl: 'border-brand-blue bg-brand-blue text-brand-cream-light',
    inactiveControl: 'border-brand-blue/10 bg-transparent text-brand-blue/70 hover:text-brand-blue-deep',
    legalDivide: 'divide-brand-blue/10',
  },
}

const CONTENT = {
  es: {
    locale: 'es-AR',
    nav: {
      menu: 'Menú',
      privacy: 'Política de privacidad',
      terms: 'Términos del servicio',
      deleteAccount: 'Eliminar cuenta y datos',
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
      privacy: 'Política de privacidad',
      terms: 'Términos',
      deleteAccount: 'Eliminar cuenta y datos',
      email: 'Email',
    },
    home: {
      title: 'Mur',
      comingSoon: 'Muy pronto',
      subtitle: 'El mundo está conectado. Tu barrio también debería estarlo.',
      body:
        'Publica posts visibles en tu zona, explora actividad en el mapa, comenta con personas cercanas y recibe alertas filtradas por las categorias que te importan.',
      socialLabel: 'Seguinos para novedades',
      featuresLabel: 'Que podes hacer',
      featuresTitle: 'Una app para descubrir, publicar y cuidar tu zona',
      featuresBody:
        'Mur esta pensada para contenido inmediato y local: menos ruido, mas contexto y controles claros para participar con seguridad.',
      stepsLabel: 'Flujo simple',
      stepsTitle: 'De tu ubicacion al feed en pocos pasos',
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
    terms: {
      back: 'Volver',
      effective: 'Vigente desde el 4 de junio de 2026',
      title: 'Términos del servicio',
      intro:
        'Estos términos regulan el uso de Mur, una app de comunidad local para publicar, descubrir y comentar contenido cercano. Al usar Mur, aceptas participar de forma responsable y respetar estas reglas.',
      sections: [
        {
          title: 'Uso de la app',
          body:
            'Mur está pensada para personas de 18 años o más. Debes usar la app de forma legal, segura y respetuosa, sin publicar contenido falso, abusivo, discriminatorio, violento, sexualmente explícito, ilegal o que vulnere derechos de terceros.',
        },
        {
          title: 'Contenido publicado',
          body:
            'Eres responsable por el contenido que publicas, incluyendo textos, imágenes, audio, encuestas y ubicaciones compartidas. Al publicar, nos autorizas a mostrar ese contenido dentro de Mur para operar la app y sus funciones.',
        },
        {
          title: 'Ubicación y actividad cercana',
          body:
            'Mur usa ubicación para mostrar contenido cercano y permitir publicaciones locales. Compartir la ubicación exacta en un post es opcional. No uses la ubicación o actividad de otros usuarios para acosar, seguir o dañar a ninguna persona.',
        },
        {
          title: 'Moderación y seguridad',
          body:
            'Podemos revisar, ocultar o eliminar contenido, limitar funciones o suspender cuentas cuando detectemos abuso, riesgos de seguridad, incumplimientos legales o violaciones de estos términos.',
        },
        {
          title: 'Cuenta y eliminación',
          body:
            'Puedes cerrar sesión o eliminar tu cuenta desde la app. La eliminación de cuenta borra los datos asociados según se describe en la política de privacidad y en la página pública de eliminación de cuenta.',
        },
        {
          title: 'Cambios del servicio',
          body:
            'Mur puede cambiar, pausar o dejar de ofrecer funciones para mejorar el servicio, cumplir requisitos legales o proteger a la comunidad. Si los términos cambian de forma relevante, actualizaremos esta página.',
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
    resetPassword: {
      back: 'Volver',
      badge: 'Seguridad de la cuenta',
      title: 'Abrir Mur para cambiar tu contrasena',
      intro:
        'Estamos abriendo la app para que puedas elegir una nueva contrasena de forma segura.',
      button: 'Abrir Mur',
      fallback:
        'Si la app no se abre automaticamente, toca el boton. Este enlace solo es valido por un tiempo limitado.',
      invalid:
        'El enlace de recuperacion no es valido o ya no contiene la informacion necesaria. Vuelve a solicitar un nuevo email desde la app.',
    },
  },
  en: {
    locale: 'en-US',
    nav: {
      menu: 'Menu',
      privacy: 'Privacy policy',
      terms: 'Terms of service',
      deleteAccount: 'Delete account and data',
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
      terms: 'Terms',
      deleteAccount: 'Delete account and data',
      email: 'Email',
    },
    home: {
      title: 'Mur',
      comingSoon: 'Coming soon',
      subtitle: 'The world is connected. Your neighborhood should be too.',
      body:
        'Publish posts visible in your area, explore activity on the map, comment with nearby people, and receive alerts filtered by the categories you care about.',
      socialLabel: 'Follow us for updates',
      featuresLabel: 'What you can do',
      featuresTitle: 'An app to discover, publish, and protect your area',
      featuresBody:
        'Mur is built for immediate local content: less noise, more context, and clear controls to participate safely.',
      stepsLabel: 'Simple flow',
      stepsTitle: 'From your location to the feed in a few steps',
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
    terms: {
      back: 'Back',
      effective: 'Effective June 4, 2026',
      title: 'Terms of Service',
      intro:
        'These terms govern your use of Mur, a local community app for publishing, discovering, and commenting on nearby content. By using Mur, you agree to participate responsibly and follow these rules.',
      sections: [
        {
          title: 'Use of the app',
          body:
            'Mur is intended for people who are 18 or older. You must use the app legally, safely, and respectfully, without publishing false, abusive, discriminatory, violent, sexually explicit, illegal, or rights-infringing content.',
        },
        {
          title: 'Published content',
          body:
            'You are responsible for the content you publish, including text, images, audio, polls, and shared locations. By publishing content, you authorize us to display it inside Mur to operate the app and its features.',
        },
        {
          title: 'Location and nearby activity',
          body:
            'Mur uses location to show nearby content and support local posts. Sharing an exact location on a post is optional. Do not use another user’s location or activity to harass, track, or harm anyone.',
        },
        {
          title: 'Moderation and safety',
          body:
            'We may review, hide, or remove content, limit features, or suspend accounts when we detect abuse, safety risks, legal issues, or violations of these terms.',
        },
        {
          title: 'Account and deletion',
          body:
            'You can sign out or delete your account from inside the app. Account deletion removes associated data as described in the privacy policy and public account deletion page.',
        },
        {
          title: 'Service changes',
          body:
            'Mur may change, pause, or discontinue features to improve the service, comply with legal requirements, or protect the community. If these terms materially change, we will update this page.',
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
    resetPassword: {
      back: 'Back',
      badge: 'Account security',
      title: 'Open Mur to change your password',
      intro:
        'We are opening the app so you can choose a new password securely.',
      button: 'Open Mur',
      fallback:
        'If the app does not open automatically, tap the button. This link is only valid for a limited time.',
      invalid:
        'This recovery link is invalid or no longer contains the required information. Please request a new email from the app.',
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

function PreferenceControls({ language, setLanguage, theme, setTheme, t, styles, compact = false }) {
  const nextLanguage = language === 'es' ? 'en' : 'es'
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const ThemeIcon = theme === 'dark' ? Moon : Sun

  if (compact) {
    return (
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          aria-label={`${t.controls.language}: ${language.toUpperCase()}`}
          onClick={() => setLanguage(nextLanguage)}
          className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition ${styles.insetSurface}`}
        >
          <Globe2 aria-hidden="true" className={`h-4 w-4 ${styles.muted}`} />
          {language.toUpperCase()}
        </button>

        <button
          type="button"
          aria-label={`${t.controls.theme}: ${t.controls[theme]}`}
          onClick={() => setTheme(nextTheme)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold transition ${styles.insetSurface}`}
        >
          <ThemeIcon aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    )
  }

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

function HeaderMenu({ t, styles, narrow = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const itemStyle = narrow ? styles.navLinkNarrow : styles.navLink
  const panelStyle = narrow ? styles.legalSoft : styles.surface
  const links = [
    { href: '/privacy', label: t.nav.privacy, icon: FileText },
    { href: '/terms', label: t.nav.terms, icon: ShieldCheck },
    { href: '/delete-account', label: t.nav.deleteAccount, icon: Trash2 },
    { href: BRAND.instagramUrl, label: BRAND.instagramHandle, icon: AtSign, external: true },
  ]

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-label={t.nav.menu}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${styles.insetSurface}`}
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Menu aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{t.nav.menu}</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-1.5rem))] rounded-lg border p-2 ${panelStyle}`}>
          <div className="grid gap-2">
            {links.map(({ href, label, icon: Icon, external }) => (
              <a
                key={href}
                className={`flex min-h-11 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${itemStyle}`}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
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

function MarketingShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()
  const mailto = `mailto:${BRAND.supportEmail}`

  return (
    <main className={`relative min-h-screen overflow-hidden ${styles.marketingPage}`}>
      <NetworkBackground theme={theme} />

      <div className="relative z-10">
        <nav className={`sticky top-0 z-50 border-b ${styles.nav}`}>
          <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
            <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label={BRAND.name}>
              <img src="/logo.png" alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
              <span className={`text-lg font-bold ${styles.logoText}`}>MUR</span>
            </a>
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <div className="lg:hidden">
                <PreferenceControls
                  compact
                  language={language}
                  setLanguage={setLanguage}
                  theme={theme}
                  setTheme={setTheme}
                  t={t}
                  styles={styles}
                />
              </div>
              <div className="hidden lg:block">
                <PreferenceControls
                  language={language}
                  setLanguage={setLanguage}
                  theme={theme}
                  setTheme={setTheme}
                  t={t}
                  styles={styles}
                />
              </div>
              <HeaderMenu t={t} styles={styles} />
            </div>
          </div>
        </nav>

        {children}

        <footer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className={`mx-auto flex max-w-6xl flex-col gap-3 text-sm ${styles.muted} sm:flex-row sm:items-center sm:justify-between`}>
            <span>© {currentYear} {BRAND.name}. {t.footer.tagline}</span>
            <div className="flex flex-wrap gap-4">
              <a className={`transition ${styles.navText}`} href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
                {BRAND.instagramHandle}
              </a>
              <a className={`transition ${styles.navText}`} href={mailto}>
                {t.footer.email}
              </a>
              <a className={`transition ${styles.navText}`} href="/privacy">
                {t.footer.privacy}
              </a>
              <a className={`transition ${styles.navText}`} href="/terms">
                {t.footer.terms}
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
  const mailto = `mailto:${BRAND.supportEmail}`

  return (
    <main className={`min-h-screen ${styles.legalPage}`}>
      <nav className={`border-b ${styles.navNarrow}`}>
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label={BRAND.name}>
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span className={`text-base font-bold ${styles.text}`}>MUR</span>
          </a>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div className="lg:hidden">
              <PreferenceControls
                compact
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                t={t}
                styles={styles}
              />
            </div>
            <div className="hidden lg:block">
              <PreferenceControls
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                t={t}
                styles={styles}
              />
            </div>
            <HeaderMenu t={t} styles={styles} narrow />
          </div>
        </div>
      </nav>

      {children}

      <footer className={`border-t px-4 py-8 sm:px-6 lg:px-8 ${styles.navNarrow}`}>
        <div className={`mx-auto flex max-w-5xl flex-col gap-3 text-sm ${styles.legalMuted} sm:flex-row sm:items-center sm:justify-between`}>
          <span>© {currentYear} {BRAND.name}.</span>
          <div className="flex flex-wrap gap-4">
            <a className={`transition ${styles.navTextNarrow}`} href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
              {BRAND.instagramHandle}
            </a>
            <a className={`transition ${styles.navTextNarrow}`} href={mailto}>
              {t.footer.email}
            </a>
            <a className={`transition ${styles.navTextNarrow}`} href="/privacy">
              {t.footer.privacy}
            </a>
            <a className={`transition ${styles.navTextNarrow}`} href="/terms">
              {t.footer.terms}
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
          <motion.div
            variants={heroItem}
            className="mt-6 inline-flex items-center rounded-full border border-accent/70 bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-accent"
          >
            {t.home.comingSoon}
          </motion.div>
          <motion.p
            variants={heroItem}
            className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${styles.muted}`}
          >
            {t.home.body}
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
            aria-label={t.home.socialLabel}
          >
            <a
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${styles.navLink}`}
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <AtSign aria-hidden="true" className="h-4 w-4 text-accent" />
              {BRAND.instagramHandle}
            </a>
            <a
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${styles.navLink}`}
              href={`mailto:${BRAND.supportEmail}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
              {BRAND.supportEmail}
            </a>
          </motion.div>
        </motion.div>
      </section>

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

function LegalPage({ content, styles }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {content.back}
        </a>
        <div className={`mt-8 border-b pb-8 ${styles.legalBorder}`}>
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${styles.legalSoft}`}>
            <FileText aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className={`mt-6 text-sm font-semibold uppercase tracking-wide ${styles.legalMuted}`}>
            {content.effective}
          </p>
          <h1 className={`mt-3 text-4xl font-bold tracking-tight ${styles.text}`}>
            {content.title}
          </h1>
          <p className={`mt-5 text-base leading-7 ${styles.legalMuted}`}>
            {content.intro}
          </p>
        </div>

        <div className={`divide-y ${styles.legalDivide}`}>
          {content.sections.map((section) => (
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

function ResetPasswordBridgePage({ t, styles }) {
  const searchParams = new URLSearchParams(window.location.search)
  const tokenHash = searchParams.get('token_hash') ?? ''
  const type = searchParams.get('type') ?? 'recovery'
  const appUrl = tokenHash
    ? `myapp://reset-password?token_hash=${encodeURIComponent(tokenHash)}&type=${encodeURIComponent(type)}`
    : ''

  useEffect(() => {
    if (!appUrl) return undefined

    const timer = window.setTimeout(() => {
      window.location.href = appUrl
    }, 400)

    return () => window.clearTimeout(timer)
  }, [appUrl])

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.resetPassword.back}
        </a>

        <div className={`mt-8 rounded-lg border p-8 text-center ${styles.surface}`}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <KeyRound aria-hidden="true" className="h-6 w-6" />
          </div>
          <p className={`mt-6 text-sm font-semibold uppercase tracking-wide ${styles.legalMuted}`}>
            {t.resetPassword.badge}
          </p>
          <h1 className={`mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight ${styles.text}`}>
            {t.resetPassword.title}
          </h1>
          <p className={`mx-auto mt-5 max-w-xl text-base leading-7 ${styles.legalMuted}`}>
            {appUrl ? t.resetPassword.intro : t.resetPassword.invalid}
          </p>

          {appUrl ? (
            <>
              <a
                href={appUrl}
                className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-bold transition ${styles.primaryButton}`}
              >
                {t.resetPassword.button}
              </a>
              <p className={`mx-auto mt-5 max-w-lg text-sm leading-6 ${styles.legalMuted}`}>
                {t.resetPassword.fallback}
              </p>
            </>
          ) : null}
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
  const isTerms = path === '/terms' || path === '/terms-of-service'
  const isDeleteAccount = path === '/delete-account'
  const isResetPassword = path === '/reset-password'
  const t = CONTENT[language]
  const styles = THEME[theme]

  useEffect(() => {
    window.localStorage.setItem('mur-language', language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('mur-theme', theme)
    document.documentElement.dataset.theme = theme
    document.body.style.backgroundColor = theme === 'dark' ? '#161622' : '#f3e8d7'
  }, [theme])

  if (isPrivacy || isTerms || isDeleteAccount || isResetPassword) {
    return (
      <LegalShell
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        t={t}
        styles={styles}
      >
        {isPrivacy ? <LegalPage content={t.legal} styles={styles} /> : null}
        {isTerms ? <LegalPage content={t.terms} styles={styles} /> : null}
        {isDeleteAccount ? <DeleteAccountPage t={t} styles={styles} /> : null}
        {isResetPassword ? <ResetPasswordBridgePage t={t} styles={styles} /> : null}
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
