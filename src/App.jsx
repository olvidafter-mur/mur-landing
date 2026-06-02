import { motion } from 'framer-motion'
import {
  ArrowLeft,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  Store,
  Trash2,
  Users,
} from 'lucide-react'

import NetworkBackground from './components/NetworkBackground'

const SUPPORT_EMAIL = 'support@olvidafter.com'

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
    id: 'posts',
    title: 'Posteos geolocalizados',
    description:
      'Publicaciones visibles para vecinos cercanos, con contexto real del barrio y conversaciones que importan ahora.',
    icon: MapPin,
  },
  {
    id: 'comercios',
    title: 'Promociones locales',
    description:
      'Comercios del barrio pueden activar ofertas, novedades y beneficios para quienes viven o circulan cerca.',
    icon: Store,
  },
  {
    id: 'seguridad',
    title: 'Red segura',
    description:
      'Una experiencia pensada para comunidades de proximidad, perfiles claros y senales de confianza entre vecinos.',
    icon: ShieldCheck,
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
      <section className="px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">
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
            Red social hiperlocal para vecinos y comercios
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-7 text-4xl font-bold leading-[1.08] text-text-main sm:text-5xl lg:text-6xl"
          >
            Tu barrio, conectado en tiempo real
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg"
          >
            Mur acerca posteos, alertas y promociones segun tu ubicacion para
            que cada vecino descubra lo que pasa cerca, y cada comercio llegue
            a la comunidad correcta.
          </motion.p>
        </motion.div>
      </section>

      <section id="features" className="px-4 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">Beneficios</p>
            <h2 className="mt-3 text-3xl font-bold text-text-main sm:text-4xl">
              Todo lo que hace falta para mover la vida del barrio
            </h2>
            <p className="mt-4 text-base leading-7 text-text-muted">
              Mur combina cercania, contenido util y visibilidad comercial en
              una experiencia simple para usar todos los dias.
            </p>
          </div>

          <motion.div
            variants={featureGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
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
