import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Clock3,
  Compass,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react'

import NetworkBackground from './components/NetworkBackground'

const SUPPORT_EMAIL = 'support@olvidafter.com'
const LAUNCH_DEADLINE = '2026-06-07T23:59:59-03:00'

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

const features = [
  {
    id: 'feed',
    title: 'Feed cercano',
    description:
      'Publica y lee posts visibles para personas cerca tuyo, con categorias para filtrar lo que importa en tu zona.',
    icon: Compass,
  },
  {
    id: 'mapa',
    title: 'Mapa de actividad',
    description:
      'Explora posts que comparten ubicacion exacta de forma opcional y abre el punto en Maps cuando necesites contexto.',
    icon: MapPin,
  },
  {
    id: 'alertas',
    title: 'Alertas por categoria',
    description:
      'Activa notificaciones cercanas y elige que categorias pueden avisarte para evitar ruido innecesario.',
    icon: Bell,
  },
  {
    id: 'seguridad',
    title: 'Controles de seguridad',
    description:
      'Reporta posts, bloquea usuarios y elimina tu cuenta y datos desde la app cuando lo necesites.',
    icon: ShieldCheck,
  },
]

const productSteps = [
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
]

const privacySections = [
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
      'Los usuarios pueden eliminar su cuenta desde la app en Profile > Account > Delete account. Tambien pueden solicitar eliminacion desde la pagina publica de eliminacion de cuenta.',
  },
]

function FeatureCard({ id, title, description, icon: Icon }) {
  return (
    <motion.article
      id={id}
      variants={featureItem}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="scroll-mt-24 rounded-lg border border-white/10 bg-surface-strong/80 p-6 shadow-soft backdrop-blur-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-text-main">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-text-muted">{description}</p>
    </motion.article>
  )
}

const getCountdown = () => {
  const deadline = new Date(LAUNCH_DEADLINE).getTime()
  const remainingMs = Math.max(0, deadline - Date.now())
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { totalSeconds, days, hours, minutes, seconds }
}

const formatNumber = (value) => new Intl.NumberFormat('es-AR').format(value)
const padTime = (value) => String(value).padStart(2, '0')

function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState(getCountdown)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getCountdown())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { label: 'dias', value: timeLeft.days },
    { label: 'horas', value: timeLeft.hours },
    { label: 'min', value: timeLeft.minutes },
    { label: 'seg', value: timeLeft.seconds },
  ]

  return (
    <section id="countdown" className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-6xl border-y border-white/10 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface/70 px-3 py-2 text-sm font-medium text-text-muted backdrop-blur-md">
              <Clock3 aria-hidden="true" className="h-4 w-4 text-accent" />
              Disponible proximamente
            </div>
            <h2 className="mt-5 text-3xl font-bold text-text-main sm:text-4xl">
              Estamos descontando hasta la apertura de Mur
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
              Fecha techo: domingo 7 de junio de 2026, 23:59:59.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-surface-strong/80 p-5 shadow-soft backdrop-blur-md">
            <p className="text-sm font-semibold uppercase text-accent">
              Segundos restantes
            </p>
            <div className="mt-3 font-mono text-5xl font-bold leading-none text-text-main sm:text-6xl">
              {formatNumber(timeLeft.totalSeconds)}
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-lg border border-white/10 bg-[#161622]/70 p-3 text-center"
                >
                  <div className="font-mono text-2xl font-bold text-text-main">
                    {padTime(unit.value)}
                  </div>
                  <div className="mt-1 text-xs uppercase text-text-muted">
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

function MarketingShell({ children }) {
  const currentYear = new Date().getFullYear()

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-text-main">
      <NetworkBackground />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-surface/65 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-3" aria-label="Mur">
              <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold text-accent">MUR</span>
            </a>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <a className="transition hover:text-text-main" href="#countdown">
                Lanzamiento
              </a>
              <a className="transition hover:text-text-main" href="/privacy">
                Privacy
              </a>
              <a className="transition hover:text-text-main" href="/delete-account">
                Delete account
              </a>
            </div>
          </div>
        </nav>

        {children}

        <footer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© {currentYear} Mur. Comunidad cerca tuyo.</span>
            <div className="flex gap-4">
              <a className="transition hover:text-text-main" href="/privacy">
                Privacy policy
              </a>
              <a className="transition hover:text-text-main" href="/delete-account">
                Delete account
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

function LegalShell({ children }) {
  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <nav className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Mur">
            <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
            <span className="text-base font-bold text-[#111827]">MUR</span>
          </a>
          <div className="flex items-center gap-4 text-sm text-[#4b5563]">
            <a className="transition hover:text-[#111827]" href="/privacy">
              Privacy
            </a>
            <a
              className="transition hover:text-[#111827]"
              href="/delete-account"
            >
              Delete account
            </a>
          </div>
        </div>
      </nav>

      {children}

      <footer className="border-t border-[#e5e7eb] bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} Mur.</span>
          <div className="flex gap-4">
            <a className="transition hover:text-[#111827]" href="/privacy">
              Privacy policy
            </a>
            <a className="transition hover:text-[#111827]" href="/delete-account">
              Delete account
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function HomePage() {
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
            className="mx-auto inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface/70 px-3 py-2 text-sm font-medium text-text-muted backdrop-blur-md"
          >
            <Users aria-hidden="true" className="h-4 w-4 text-accent" />
            Red social hiperlocal para conversaciones cercanas
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-7 text-4xl font-bold leading-[1.08] text-text-main sm:text-5xl lg:text-6xl"
          >
            Mur
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-tight text-text-main sm:text-3xl"
          >
            Lo que pasa cerca, contado por quienes estan cerca.
          </motion.p>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg"
          >
            Publica posts visibles en tu zona, explora actividad en el mapa,
            comenta con personas cercanas y recibe alertas filtradas por las
            categorias que te importan.
          </motion.p>
        </motion.div>
      </section>

      <LaunchCountdown />

      <section id="features" className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">
              Que podes hacer
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text-main sm:text-4xl">
              Una app para descubrir, publicar y cuidar tu zona
            </h2>
            <p className="mt-4 text-base leading-7 text-text-muted">
              Mur esta pensada para contenido inmediato y local: menos ruido,
              mas contexto y controles claros para participar con seguridad.
            </p>
          </div>

          <motion.div
            variants={featureGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">
              Flujo simple
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text-main sm:text-4xl">
              De tu ubicacion al feed en pocos pasos
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {productSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-white/10 bg-surface-strong/80 p-6 shadow-soft backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-text-main">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">
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

function LegalPage() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#374151] transition hover:text-[#111827]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Volver
        </a>
        <div className="mt-8 border-b border-[#e5e7eb] pb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#111827]">
            <FileText aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#6b7280]">
            Vigente desde el 2 de junio de 2026
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#111827]">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base leading-7 text-[#374151]">
            Mur es una app de comunidad local. Esta politica explica que datos
            de la app recopilamos, por que los usamos y como los usuarios
            pueden eliminar su cuenta y datos asociados.
          </p>
        </div>

        <div className="divide-y divide-[#e5e7eb]">
          {privacySections.map((section) => (
            <article
              key={section.title}
              className="py-8"
            >
              <h2 className="text-xl font-semibold text-[#111827]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#374151]">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeleteAccountPage() {
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=Mur account deletion request`

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#374151] transition hover:text-[#111827]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Volver
        </a>
        <div className="mt-8 border-b border-[#e5e7eb] pb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#111827]">
            <Trash2 aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#6b7280]">
            Account and data deletion
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#111827]">
            Delete your Mur account
          </h1>
          <p className="mt-5 text-base leading-7 text-[#374151]">
            Para eliminar tu cuenta desde la app, abri Mur y entra a:
            Profile &gt; Account &gt; Delete account.
          </p>
        </div>

        <div className="divide-y divide-[#e5e7eb]">
          <article className="py-8">
            <h2 className="text-xl font-semibold text-[#111827]">
              Que se elimina
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#374151]">
              La eliminacion borra tu perfil, posts, comentarios, likes, tokens
              de notificaciones, ubicacion cercana usada para alertas, reportes
              y registros de bloqueo asociados a tu cuenta.
            </p>
          </article>

          <article className="py-8">
            <h2 className="text-xl font-semibold text-[#111827]">
              Si ya no tenes acceso a la app
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#374151]">
              Escribinos desde el email asociado a tu cuenta y pedinos la
              eliminacion de cuenta y datos. Usamos ese email para verificar la
              titularidad antes de procesar la solicitud.
            </p>
            <a
              href={mailto}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {SUPPORT_EMAIL}
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

function App() {
  const path = window.location.pathname
  const isPrivacy = path === '/privacy' || path === '/privacy-policy'
  const isDeleteAccount = path === '/delete-account'

  if (isPrivacy || isDeleteAccount) {
    return (
      <LegalShell>
        {isPrivacy ? <LegalPage /> : null}
        {isDeleteAccount ? <DeleteAccountPage /> : null}
      </LegalShell>
    )
  }

  return (
    <MarketingShell>
      <HomePage />
    </MarketingShell>
  )
}

export default App
