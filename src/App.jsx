import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  AtSign,
  Bell,
  Compass,
  FileText,
  Globe2,
  HeartHandshake,
  KeyRound,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Moon,
  PawPrint,
  Quote,
  ShieldCheck,
  Store,
  Sun,
  Trash2,
  X,
} from 'lucide-react'

import { BRAND, CONTENT, LANGUAGES, THEME, THEMES } from './siteContent'
import darkFeedEn from './assets/screenshots/mur-feed-dark-en.jpeg'
import darkFeedEs from './assets/screenshots/mur-feed-dark-es.jpeg'
import lightFeedEn from './assets/screenshots/mur-feed-light-en.jpeg'
import lightFeedEs from './assets/screenshots/mur-feed-light-es.jpeg'

const springTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
}

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
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

const useCaseIcons = [PawPrint, Bell, Store, HeartHandshake]
const productPointIcons = [Map, Bell, Compass, MessageCircle]
const navAnchors = [
  { href: '#nearby', key: 'nearby' },
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

const appScreenshots = {
  light: [
    { src: lightFeedEs, alt: 'MUR feed screenshot in light mode with Spanish labels' },
    { src: lightFeedEn, alt: 'MUR feed screenshot in light mode with English labels' },
  ],
  dark: [
    { src: darkFeedEs, alt: 'MUR feed screenshot in dark mode with Spanish labels' },
    { src: darkFeedEn, alt: 'MUR feed screenshot in dark mode with English labels' },
  ],
}

function AppPreview({ theme, screenIndex = 0, className = '' }) {
  const screenshot = appScreenshots[theme][screenIndex]
  const tone = theme === 'dark' ? 'phone-preview-dark' : 'phone-preview-light'

  return (
    <div className={`phone-preview ${tone} ${className}`}>
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        width="739"
        height="1600"
        loading={screenIndex === 0 ? 'eager' : 'lazy'}
        className="block aspect-[739/1600] w-full rounded-[1.65rem] object-cover"
      />
    </div>
  )
}

function HeroSection({ t, styles, theme }) {
  return (
    <section className="simple-hero relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto grid max-w-6xl items-center gap-10 lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            className="simple-badge inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-[0.16em]"
          >
            <span className="h-2 w-2 rounded-full bg-brand-amber" aria-hidden="true" />
            {t.home.heroBadge}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className={`mt-6 max-w-3xl text-4xl font-black leading-[0.96] sm:text-6xl lg:text-[4.85rem] ${styles.text}`}
          >
            {t.home.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${styles.muted}`}
          >
            {t.home.body}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
            <WaitlistAction t={t} styles={styles} />
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border px-5 text-sm font-bold transition ${styles.secondaryButton}`}
            >
              {BRAND.instagramHandle}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 hidden flex-wrap gap-2 sm:flex">
            {t.previewStats.map((item) => (
              <span key={item} className={`rounded-lg border px-3 py-2 text-xs font-bold ${styles.insetSurface} ${styles.muted}`}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="simple-hero-preview">
          <AppPreview theme={theme} screenIndex={0} className="simple-hero-phone" />
          <div className={`simple-preview-caption rounded-lg border p-4 ${styles.surface}`}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-amber">
              {t.home.previewEyebrow}
            </p>
            <h2 className={`mt-2 text-xl font-black ${styles.text}`}>
              {t.home.previewTitle}
            </h2>
            <p className={`mt-2 text-sm leading-6 ${styles.muted}`}>
              {t.home.previewBody}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProductFeatureBand({ t, styles }) {
  return (
    <section id="nearby" className="product-band scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-amber">
            {t.home.productLabel}
          </p>
          <h2 className={`mt-3 text-3xl font-black leading-tight sm:text-4xl ${styles.text}`}>
            {t.home.productTitle}
          </h2>
          <p className={`mt-5 text-base leading-7 ${styles.muted}`}>
            {t.home.productBody}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {t.productPoints.map((point, index) => {
            const Icon = productPointIcons[index] ?? Compass

            return (
              <motion.div key={point} variants={fadeUp} className={`product-point ${styles.surface}`}>
                <Icon aria-hidden="true" className="h-4 w-4 text-brand-amber" />
                <span>{point}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function UseCasesSection({ t, styles }) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-amber">
              {t.home.useCasesLabel}
            </p>
            <h2 className={`mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl ${styles.text}`}>
              {t.home.useCasesTitle}
            </h2>
          </div>
          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            {t.home.fictionalNote}
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        >
          {t.useCases.map((item, index) => {
            const Icon = useCaseIcons[index]

            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className={`visual-card rounded-lg border p-4 ${styles.surface}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
                  index % 2 === 0 ? styles.tealSurface : styles.warmSurface
                }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-amber" />
                </div>
                <h3 className={`mt-5 text-lg font-bold ${styles.text}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-5 ${styles.muted}`}>{item.body}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorksSection({ t, styles }) {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={t.home.stepsLabel}
          title={t.home.stepsTitle}
          styles={styles}
          centered
        />

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {t.steps.map((step, index) => (
            <article key={step.title} className={`rounded-lg border p-5 ${styles.surface}`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-amber text-sm font-black text-brand-ink">
                {index + 1}
              </div>
              <h3 className={`mt-5 text-lg font-bold ${styles.text}`}>{step.title}</h3>
              <p className={`mt-2 text-sm leading-5 ${styles.muted}`}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WaitlistSection({ t, styles }) {
  return (
    <section id="waitlist" className={`waitlist-band scroll-mt-24 border-y px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${styles.border}`}>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.7fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-amber">
            {t.home.waitlistLabel}
          </p>
          <h2 className={`mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl ${styles.text}`}>
            {t.home.waitlistTitle}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm leading-6 ${styles.muted}`}>
            {t.home.waitlistBody}
          </p>
        </div>
        <div className={`flex items-start gap-3 rounded-lg border p-4 ${styles.insetSurface}`}>
          <Quote aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-amber" />
          <p className={`text-sm font-semibold leading-6 ${styles.muted}`}>
            {t.home.mascotLabel}
          </p>
        </div>
        <WaitlistAction t={t} styles={styles} />
      </div>
    </section>
  )
}

function FaqSection({ t, styles }) {
  return (
    <section className="faq-section px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-amber">
            {t.home.faqLabel}
          </p>
          <h2 className={`mt-3 text-3xl font-black leading-tight sm:text-4xl ${styles.text}`}>
            {t.home.faqTitle}
          </h2>
          <p className={`mt-4 max-w-sm text-sm leading-6 ${styles.muted}`}>
            {t.home.fictionalNote}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {t.faq.slice(0, 4).map((item) => (
            <article key={item.question} className={`rounded-lg border p-5 ${styles.surface}`}>
              <h3 className={`text-base font-bold ${styles.text}`}>{item.question}</h3>
              <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage({ t, styles, theme }) {
  return (
    <>
      <HeroSection t={t} styles={styles} theme={theme} />
      <ProductFeatureBand t={t} styles={styles} />
      <UseCasesSection t={t} styles={styles} />
      <HowItWorksSection t={t} styles={styles} />
      <FaqSection t={t} styles={styles} />
      <WaitlistSection t={t} styles={styles} />
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
    document.body.style.backgroundColor = theme === 'dark' ? '#111111' : '#ffffff'
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
      <HomePage t={t} styles={styles} theme={theme} />
    </MarketingShell>
  )
}

export default App
