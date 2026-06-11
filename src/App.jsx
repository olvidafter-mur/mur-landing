import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  AtSign,
  Bell,
  Compass,
  FileText,
  Globe2,
  Heart,
  Home,
  Image,
  KeyRound,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Moon,
  Plus,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Trash2,
  User,
  X,
} from 'lucide-react'

import { BRAND, CONTENT, LANGUAGES, THEME, THEMES } from './siteContent'

const springTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const useCaseIcons = [MapPin, Bell, Compass, ShieldCheck]
const navAnchors = [
  { href: '#how-it-works', key: 'howItWorks' },
  { href: '#waitlist', key: 'waitlist' },
]

const getStoredPreference = (key, allowed, fallback) => {
  if (typeof window === 'undefined') return fallback

  const stored = window.localStorage.getItem(key)
  return allowed.includes(stored) ? stored : fallback
}

const setMetaTag = (selector, attr, value) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    const match = selector.match(/\[(name|property)="(.+)"\]/)

    if (match) {
      element.setAttribute(match[1], match[2])
    }

    document.head.appendChild(element)
  }

  element.setAttribute(attr, value)
}

const trackEvent = (name, detail = {}) => {
  if (typeof window === 'undefined') return

  const payload = { event: `mur_${name}`, ...detail }
  window.dataLayer?.push(payload)
  window.dispatchEvent(new CustomEvent('mur:analytics', { detail: payload }))
}

function SectionIntro({ eyebrow, title, body, styles, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-amber">
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${styles.text}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-4 text-base leading-7 ${styles.muted}`}>
          {body}
        </p>
      ) : null}
    </div>
  )
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
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
        >
          <Globe2 aria-hidden="true" className={`h-4 w-4 ${styles.muted}`} />
          {language.toUpperCase()}
        </button>

        <button
          type="button"
          aria-label={`${t.controls.theme}: ${t.controls[theme]}`}
          onClick={() => setTheme(nextTheme)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
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
        className={`inline-flex items-center rounded-lg border p-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
      >
        <Globe2 aria-hidden="true" className={`ml-2 mr-1 h-4 w-4 ${styles.muted}`} />
        <span
          className={`inline-flex min-w-[42px] justify-center rounded-md border px-3 py-1.5 transition ${
            language === 'en' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          EN
        </span>
        <span
          className={`inline-flex min-w-[42px] justify-center rounded-md border px-3 py-1.5 transition ${
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
        className={`inline-flex items-center rounded-lg border p-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
      >
        <span
          className={`inline-flex min-w-[82px] items-center justify-center gap-1 rounded-md border px-3 py-1.5 transition ${
            theme === 'light' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          <Sun aria-hidden="true" className="h-3.5 w-3.5" />
          {t.controls.light}
        </span>
        <span
          className={`inline-flex min-w-[82px] items-center justify-center gap-1 rounded-md border px-3 py-1.5 transition ${
            theme === 'dark' ? styles.activeControl : styles.inactiveControl
          }`}
        >
          <Moon aria-hidden="true" className="h-3.5 w-3.5" />
          {t.controls.dark}
        </span>
      </button>
    </div>
  )
}

function HeaderMenu({ t, styles, narrow = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const itemStyle = narrow ? styles.navLinkNarrow : styles.navLink
  const panelStyle = styles.menuPanel
  const links = [
    ...(!narrow
      ? navAnchors.map(({ href, key }) => ({ href, label: t.nav[key] }))
      : []),
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
        className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Menu aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{t.nav.menu}</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-12 z-[120] w-[min(20rem,calc(100vw-1.5rem))] rounded-lg border p-2 ${panelStyle}`}>
          <div className="grid gap-2">
            {links.map(({ href, label, icon: Icon = Compass, external }) => (
              <a
                key={href}
                className={`flex min-h-11 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${itemStyle}`}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-amber" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WaitlistAction({ t, styles }) {
  const handleClick = () => {
    trackEvent('waitlist_submission')
  }

  return (
    <a
      href={BRAND.waitlistUrl}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 ${styles.primaryButton}`}
    >
      {t.home.primaryCta}
    </a>
  )
}

function AppPreview({ t, styles }) {
  const feedPosts = t.samplePosts.slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-[24rem]">
      <div className="rounded-[2.25rem] border border-brand-ink/10 bg-[#111827] p-2.5 shadow-phone">
        <div className="overflow-hidden rounded-[1.7rem] border border-brand-ink/10 bg-[#F4F5F9] text-brand-ink">
          <div className="flex h-9 items-center justify-between px-5 text-[0.7rem] font-semibold text-brand-ink/55">
            <span>15:15</span>
            <span>97%</span>
          </div>

          <div className="px-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-brand-teal to-brand-amber ring-2 ring-white" />
              <div className="flex min-h-11 flex-1 items-center gap-2 rounded-full border border-brand-ink/10 bg-[#ECEFF4] px-4 text-sm text-brand-ink/45">
                <Search aria-hidden="true" className="h-4 w-4" />
                {t.home.previewSearch}
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-ink/10 bg-[#ECEFF4]">
                <SlidersHorizontal aria-hidden="true" className="h-5 w-5 text-brand-ink/70" />
              </div>
            </div>
          </div>

          <div className="space-y-0 px-5 pb-5">
            {feedPosts.map((post, index) => (
              <article key={post.title} className="border-b border-brand-ink/10 py-4 last:border-b-0">
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-brand-green via-brand-teal to-brand-amber" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 text-sm">
                        <span className="font-bold">{t.home.previewAuthor}</span>
                        <span className="ml-1 text-brand-ink/45">· {post.time} · </span>
                        <span className="font-semibold text-brand-amber">{post.distance}</span>
                      </div>
                      <span className="text-lg leading-none text-brand-ink/45">...</span>
                    </div>
                    <p className="mt-2 text-base leading-6">{post.title}</p>

                    {index === 0 ? (
                      <div className="mt-3 flex min-h-12 items-center justify-between rounded-lg border border-brand-ink/10 bg-[#ECEFF4] px-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-sun text-brand-amber">
                            <Image aria-hidden="true" className="h-4 w-4" />
                          </div>
                          <span className="font-bold">{t.home.previewImageLabel}</span>
                        </div>
                        <span className="text-xl text-brand-ink/55">›</span>
                      </div>
                    ) : null}

                    {index === 2 ? (
                      <div className="mt-3 rounded-lg border border-brand-ink/10 bg-[#ECEFF4] px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-amber text-white">
                            <Plus aria-hidden="true" className="h-4 w-4 rotate-45" />
                          </div>
                          <span className="font-bold">{t.home.previewAudioLabel}</span>
                          <span className="ml-auto text-xs text-brand-ink/45">0:05</span>
                          <Mic aria-hidden="true" className="h-4 w-4 text-brand-ink/55" />
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-brand-ink/10">
                          <div className="h-full w-4/5 rounded-full bg-brand-ink/20" />
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-3 flex items-center gap-6 text-brand-ink/65">
                      <MessageCircle aria-hidden="true" className="h-5 w-5" />
                      <Heart aria-hidden="true" className="h-5 w-5" />
                      <Send aria-hidden="true" className="h-5 w-5" />
                      <span className="ml-auto rounded-full border border-brand-ink/10 bg-[#F7F8FB] px-2 py-1 text-[0.68rem] text-brand-ink/45">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative mt-3 border-t border-brand-ink/10 bg-white/80 px-6 pb-3 pt-3">
            <div className="flex items-center justify-between text-brand-ink/45">
              <Home aria-hidden="true" className="h-5 w-5 text-brand-amber" />
              <Map aria-hidden="true" className="h-5 w-5" />
              <Bell aria-hidden="true" className="h-5 w-5" />
              <User aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="absolute left-1/2 top-[-1.35rem] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F4F5F9] bg-brand-amber text-white shadow-accent">
              <Plus aria-hidden="true" className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection({ t, styles }) {
  return (
    <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.88fr]"
      >
        <div>
          <motion.div
            variants={fadeUp}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] ${styles.warmSurface}`}
          >
            <span className="h-2 w-2 rounded-full bg-brand-amber" aria-hidden="true" />
            {t.home.heroBadge}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className={`mt-6 max-w-3xl text-5xl font-black leading-[0.98] sm:text-6xl lg:text-7xl ${styles.text}`}
          >
            {t.home.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mt-6 max-w-2xl text-lg leading-8 sm:text-xl ${styles.muted}`}
          >
            {t.home.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className={`mt-5 flex items-center gap-3 rounded-lg border p-3 lg:hidden ${styles.greenSurface}`}
          >
            <img
              src="/olvi.png"
              alt={t.home.mascotAlt}
              className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.16)]"
            />
            <p className={`text-sm font-bold leading-5 ${styles.text}`}>
              {t.home.mascotLabel}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7">
            <WaitlistAction t={t} styles={styles} />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative hidden lg:block">
          <AppPreview t={t} styles={styles} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function UseCasesSection({ t, styles }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={t.home.useCasesLabel}
          title={t.home.useCasesTitle}
          styles={styles}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {t.useCases.map((item, index) => {
            const Icon = useCaseIcons[index]

            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className={`rounded-lg border p-5 ${styles.surface}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
                  index % 2 === 0 ? styles.tealSurface : styles.warmSurface
                }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-amber" />
                </div>
                <h3 className={`mt-5 text-xl font-bold ${styles.text}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>{item.body}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function ProductSection({ t, styles }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <AppPreview t={t} styles={styles} />

        <div>
          <SectionIntro
            eyebrow={t.home.productLabel}
            title={t.home.productTitle}
            body={t.home.productBody}
            styles={styles}
          />
          <div className="mt-8 grid gap-3">
            {t.productPoints.map((point) => (
              <div key={point} className={`flex gap-3 rounded-lg border p-4 ${styles.softSurface}`}>
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                <p className={`text-sm font-semibold leading-6 ${styles.text}`}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection({ t, styles }) {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={t.home.stepsLabel}
          title={t.home.stepsTitle}
          styles={styles}
          centered
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.steps.map((step, index) => (
            <article key={step.title} className={`rounded-lg border p-6 ${styles.surface}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-amber text-sm font-black text-brand-ink">
                {index + 1}
              </div>
              <h3 className={`mt-5 text-xl font-bold ${styles.text}`}>{step.title}</h3>
              <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WaitlistSection({ t, styles }) {
  return (
    <section id="waitlist" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className={`mx-auto grid max-w-6xl gap-8 rounded-lg border p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] ${styles.surface}`}>
        <div>
          <SectionIntro
            eyebrow={t.home.waitlistLabel}
            title={t.home.waitlistTitle}
            body={t.home.waitlistBody}
            styles={styles}
          />
        </div>
        <div className={`flex items-center rounded-lg border p-5 ${styles.softSurface}`}>
          <WaitlistAction t={t} styles={styles} />
        </div>
      </div>
    </section>
  )
}

function FaqSection({ t, styles }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionIntro
          eyebrow={t.home.faqLabel}
          title={t.home.faqTitle}
          styles={styles}
          centered
        />
        <div className="mt-10 grid gap-3">
          {t.faq.map((item) => (
            <details key={item.question} className={`group rounded-lg border p-5 ${styles.surface}`}>
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold ${styles.text}`}>
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-amber/15 text-brand-amber transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className={`mt-4 text-sm leading-6 ${styles.muted}`}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage({ t, styles }) {
  return (
    <>
      <HeroSection t={t} styles={styles} />
      <UseCasesSection t={t} styles={styles} />
      <ProductSection t={t} styles={styles} />
      <HowItWorksSection t={t} styles={styles} />
      <WaitlistSection t={t} styles={styles} />
      <FaqSection t={t} styles={styles} />
    </>
  )
}

function MarketingShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()
  const mailto = `mailto:${BRAND.supportEmail}`

  return (
    <main className={`relative min-h-screen overflow-hidden ${styles.marketingPage}`}>
      <div
        aria-hidden="true"
        className={
          theme === 'dark'
            ? 'local-background local-background-dark'
            : 'local-background local-background-light'
        }
      />

      <div className="relative z-10">
        <nav className={`sticky top-0 z-50 border-b ${styles.nav}`}>
          <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
            <a href="/" className="flex min-h-11 shrink-0 items-center gap-2.5" aria-label={BRAND.name}>
              <img src="/logo.png" alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
              <span className={`text-lg font-black ${styles.logoText}`}>MUR</span>
            </a>

            <div className="hidden items-center gap-5 text-sm font-bold lg:flex">
              {navAnchors.map(({ href, key }) => (
                <a key={href} href={href} className={`transition ${styles.navText}`}>
                  {t.nav[key]}
                </a>
              ))}
            </div>

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
          <div className={`mx-auto flex max-w-6xl flex-col gap-3 border-t pt-8 text-sm ${styles.border} ${styles.muted} sm:flex-row sm:items-center sm:justify-between`}>
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
      <div
        aria-hidden="true"
        className={
          theme === 'dark'
            ? 'local-background local-background-dark'
            : 'local-background local-background-light'
        }
      />

      <div className="relative z-10">
        <nav className={`sticky top-0 z-[100] border-b ${styles.navNarrow}`}>
          <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
            <a href="/" className="flex min-h-11 shrink-0 items-center gap-2.5" aria-label={BRAND.name}>
              <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
              <span className={`text-base font-black ${styles.text}`}>MUR</span>
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
      </div>
    </main>
  )
}

function LegalPage({ content, styles }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className={`mx-auto max-w-3xl rounded-lg border p-6 sm:p-8 ${styles.surface}`}>
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-bold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {content.back}
        </a>

        <div className={`mt-8 border-b pb-8 ${styles.legalBorder}`}>
          <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${styles.legalSoft}`}>
            <FileText aria-hidden="true" className="h-5 w-5 text-brand-amber" />
          </div>
          <p className={`mt-6 text-sm font-bold uppercase tracking-[0.16em] ${styles.legalMuted}`}>
            {content.effective}
          </p>
          <h1 className={`mt-3 text-4xl font-black tracking-tight ${styles.text}`}>
            {content.title}
          </h1>
          <p className={`mt-5 text-base leading-7 ${styles.legalMuted}`}>
            {content.intro}
          </p>
        </div>

        <div className={`divide-y ${styles.legalDivide}`}>
          {content.sections.map((section) => (
            <article key={section.title} className="py-8">
              <h2 className={`text-xl font-bold ${styles.text}`}>
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
      <div className={`mx-auto max-w-3xl rounded-lg border p-6 sm:p-8 ${styles.surface}`}>
        <a
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-bold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.legal.back}
        </a>
        <div className={`mt-8 border-b pb-8 ${styles.legalBorder}`}>
          <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${styles.legalSoft}`}>
            <Trash2 aria-hidden="true" className="h-5 w-5 text-brand-amber" />
          </div>
          <p className={`mt-6 text-sm font-bold uppercase tracking-[0.16em] ${styles.legalMuted}`}>
            {t.deleteAccount.badge}
          </p>
          <h1 className={`mt-3 text-4xl font-black tracking-tight ${styles.text}`}>
            {t.deleteAccount.title}
          </h1>
          <p className={`mt-5 text-base leading-7 ${styles.legalMuted}`}>
            {t.deleteAccount.intro}
          </p>
        </div>

        <div className={`divide-y ${styles.legalDivide}`}>
          <article className="py-8">
            <h2 className={`text-xl font-bold ${styles.text}`}>
              {t.deleteAccount.deletedTitle}
            </h2>
            <p className={`mt-3 text-sm leading-6 ${styles.legalMuted}`}>
              {t.deleteAccount.deletedBody}
            </p>
          </article>

          <article className="py-8">
            <h2 className={`text-xl font-bold ${styles.text}`}>
              {t.deleteAccount.noAccessTitle}
            </h2>
            <p className={`mt-3 text-sm leading-6 ${styles.legalMuted}`}>
              {t.deleteAccount.noAccessBody}
            </p>
            <a
              href={mailto}
              className={`mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 ${styles.primaryButton}`}
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
          className={`inline-flex items-center gap-2 text-sm font-bold transition ${styles.navTextNarrow}`}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t.resetPassword.back}
        </a>

        <div className={`mt-8 rounded-lg border p-8 text-center ${styles.surface}`}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-amber/15 text-brand-amber">
            <KeyRound aria-hidden="true" className="h-6 w-6" />
          </div>
          <p className={`mt-6 text-sm font-bold uppercase tracking-[0.16em] ${styles.legalMuted}`}>
            {t.resetPassword.badge}
          </p>
          <h1 className={`mx-auto mt-3 max-w-xl text-3xl font-black tracking-tight ${styles.text}`}>
            {t.resetPassword.title}
          </h1>
          <p className={`mx-auto mt-5 max-w-xl text-base leading-7 ${styles.legalMuted}`}>
            {appUrl ? t.resetPassword.intro : t.resetPassword.invalid}
          </p>

          {appUrl ? (
            <>
              <a
                href={appUrl}
                className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 ${styles.primaryButton}`}
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
    getStoredPreference('mur-theme', THEMES, 'light'),
  )
  const path = window.location.pathname
  const isPrivacy = path === '/privacy' || path === '/privacy-policy'
  const isTerms = path === '/terms' || path === '/terms-of-service'
  const isDeleteAccount = path === '/delete-account'
  const isResetPassword = path === '/reset-password'
  const t = CONTENT[language]
  const styles = THEME[theme]
  const currentMeta = useMemo(() => {
    if (isPrivacy) {
      return { title: `${t.legal.title} | MUR`, description: t.legal.intro }
    }

    if (isTerms) {
      return { title: `${t.terms.title} | MUR`, description: t.terms.intro }
    }

    if (isDeleteAccount) {
      return { title: `${t.deleteAccount.title} | MUR`, description: t.deleteAccount.intro }
    }

    if (isResetPassword) {
      return { title: `${t.resetPassword.title} | MUR`, description: t.resetPassword.intro }
    }

    return t.meta
  }, [isDeleteAccount, isPrivacy, isResetPassword, isTerms, t])

  useEffect(() => {
    window.localStorage.setItem('mur-language', language)
    document.documentElement.lang = t.locale
  }, [language, t.locale])

  useEffect(() => {
    window.localStorage.setItem('mur-theme', theme)
    document.documentElement.dataset.theme = theme
    document.body.style.backgroundColor = theme === 'dark' ? '#161622' : '#fbf6ec'
  }, [theme])

  useEffect(() => {
    document.title = currentMeta.title
    setMetaTag('meta[name="description"]', 'content', currentMeta.description)
    setMetaTag('meta[property="og:title"]', 'content', currentMeta.title)
    setMetaTag('meta[property="og:description"]', 'content', currentMeta.description)
    setMetaTag('meta[property="og:type"]', 'content', 'website')
  }, [currentMeta.description, currentMeta.title])

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
