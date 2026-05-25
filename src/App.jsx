import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Store, Users } from 'lucide-react'

import NetworkBackground from './components/NetworkBackground'

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
      'Una experiencia pensada para comunidades de proximidad, perfiles claros y señales de confianza entre vecinos.',
    icon: ShieldCheck,
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

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-text-main">
      <NetworkBackground />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-surface/65 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3" aria-label="Mur">
              <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold text-accent">MUR</span>
            </div>
          </div>
        </nav>

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

        <footer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl text-sm text-text-muted">
            <span>© {currentYear} Mur. Comunidad cerca tuyo.</span>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default App
