import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import {
  ArrowLeft,
  Bell,
  Compass,
  FileText,
  Globe2,
  KeyRound,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
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

function InstagramMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
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
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-amber">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink/62">
          {body}
        </p>
      ) : null}
    </div>
  )
}

function PreferenceControls({ language, setLanguage, theme, setTheme, t, styles }) {
  const nextLanguage = language === 'es' ? 'en' : 'es'
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const ThemeIcon = theme === 'dark' ? Moon : Sun

  return (
    <div className="flex shrink-0 items-center justify-end gap-1.5">
      <button
        type="button"
        aria-label={`${t.controls.language}: ${language.toUpperCase()}`}
        title={`${t.controls.language}: ${language.toUpperCase()}`}
        onClick={() => setLanguage(nextLanguage)}
        className={`inline-flex min-h-11 min-w-16 items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
      >
        <Globe2 aria-hidden="true" className={`h-4 w-4 ${styles.muted}`} />
        {language.toUpperCase()}
      </button>

      <button
        type="button"
        aria-label={`${t.controls.theme}: ${t.controls[theme]}`}
        title={`${t.controls.theme}: ${t.controls[theme]}`}
        onClick={() => setTheme(nextTheme)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/80 ${styles.insetSurface}`}
      >
        <ThemeIcon aria-hidden="true" className="h-4 w-4" />
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
    { href: BRAND.instagramUrl, label: 'Instagram', icon: InstagramMark, external: true },
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

function WaitlistAction({ t, styles, variant = 'default' }) {
  const handleClick = () => {
    trackEvent('waitlist_submission')
  }

  const buttonStyle =
    variant === 'hero'
      ? 'bg-white text-brand-blue shadow-[0_16px_34px_rgba(22,22,34,0.18)] hover:bg-brand-cream-light focus-visible:ring-white/80'
      : styles.primaryButton

  return (
    <a
      href={BRAND.waitlistUrl}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 ${buttonStyle}`}
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

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const clamp01 = (value) => clamp(value, 0, 1)

const getHeroScrollProgress = () => {
  if (typeof window === 'undefined') return 0
  return clamp01(window.scrollY / (window.innerHeight * 0.9))
}

const getPrefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useMediaQuery(query) {
  const getMatch = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(getMatch)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()
    mediaQuery.addEventListener?.('change', updateMatch)

    return () => {
      mediaQuery.removeEventListener?.('change', updateMatch)
    }
  }, [query])

  return matches
}

const getStoryPhoneX = (scrollY, targets) => {
  const [start = 0, middle = 1, end = 1] = targets

  if (scrollY <= middle) {
    const progress = clamp01((scrollY - start) / Math.max(1, middle - start))
    return 78 - 28 * progress
  }

  const progress = clamp01((scrollY - middle) / Math.max(1, end - middle))
  return 50 - 24 * progress
}

const getStoryTargets = (element) => {
  if (!element) return []

  const navOffset = 64
  const scenes = Array.from(element.querySelectorAll('.landing-story-scene'))
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

  return scenes.map((scene, index) => {
    if (index === 0) return 0

    return clamp(scene.getBoundingClientRect().top + window.scrollY - navOffset, 0, maxScroll)
  })
}

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3)
const STORY_STEP_SCROLL_DURATION = 320
const PHONE_CLICK_ZOOM_LEVELS = [0, 0.42, 0.84, 0.42]

const createRoundedScreenGeometry = (width, height, radius) => {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2

  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)

  const geometry = new THREE.ShapeGeometry(shape, 28)
  const positions = geometry.attributes.position
  const uvs = []

  for (let index = 0; index < positions.count; index += 1) {
    const positionX = positions.getX(index)
    const positionY = positions.getY(index)
    uvs.push((positionX - x) / width, (positionY - y) / height)
  }

  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

  return geometry
}

function useStoryPhoneMotion(ref, enabled) {
  useEffect(() => {
    const element = ref.current

    if (!element) return undefined

    if (!enabled) {
      element.style.setProperty('--phone-x', '78%')
      return undefined
    }

    let frame = 0

    const updatePhonePosition = () => {
      const targets = getStoryTargets(element)

      element.style.setProperty('--phone-x', `${getStoryPhoneX(window.scrollY, targets)}%`)
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updatePhonePosition)
    }

    updatePhonePosition()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [enabled, ref])
}

function useLandingStepScroll(enabled) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

    document.documentElement.classList.add('landing-step-scroll')

    return () => {
      document.documentElement.classList.remove('landing-step-scroll')
    }
  }, [enabled])
}

function useStoryStepScroll(ref, enabled) {
  const isSteppingRef = useRef(false)
  const scrollFrameRef = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined

    const getTargets = () => {
      return getStoryTargets(ref.current)
    }

    const getNearestIndex = (targets) => {
      return targets.reduce((nearest, target, index) => {
        const currentDistance = Math.abs(window.scrollY - target)
        const nearestDistance = Math.abs(window.scrollY - targets[nearest])

        return currentDistance < nearestDistance ? index : nearest
      }, 0)
    }

    const animateTo = (target) => {
      window.cancelAnimationFrame(scrollFrameRef.current)

      if (getPrefersReducedMotion()) {
        window.scrollTo({ top: target, behavior: 'auto' })
        isSteppingRef.current = false
        return
      }

      const start = window.scrollY
      const distance = target - start
      const duration = STORY_STEP_SCROLL_DURATION
      let startTime = 0

      const tick = (time) => {
        if (!startTime) startTime = time

        const progress = clamp01((time - startTime) / duration)
        window.scrollTo({ top: start + distance * easeOutCubic(progress), behavior: 'auto' })

        if (progress < 1) {
          scrollFrameRef.current = window.requestAnimationFrame(tick)
          return
        }

        window.scrollTo({ top: target, behavior: 'auto' })
        isSteppingRef.current = false
      }

      scrollFrameRef.current = window.requestAnimationFrame(tick)
    }

    const step = (direction) => {
      const targets = getTargets()
      if (!targets.length || isSteppingRef.current) return

      const currentIndex = getNearestIndex(targets)
      const nextIndex = direction > 0
        ? Math.min(targets.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1)

      if (nextIndex === currentIndex) return

      isSteppingRef.current = true
      animateTo(targets[nextIndex])
    }

    const handleWheel = (event) => {
      const deltaY = Number.isFinite(event.deltaY) && event.deltaY !== 0
        ? event.deltaY
        : Number.isFinite(event.wheelDelta)
          ? -event.wheelDelta
          : Number.isFinite(event.detail)
            ? event.detail
            : 0

      if (Math.abs(deltaY) < 8) return

      event.preventDefault()
      step(deltaY > 0 ? 1 : -1)
    }

    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const activeElement = document.activeElement
      if (activeElement instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)) return

      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        step(1)
      }

      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        step(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(scrollFrameRef.current)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, ref])
}

function Phone3DModel({ screenshot, zoomRef, theme }) {
  const groupRef = useRef(null)
  const isDraggingRef = useRef(false)
  const isHoveringRef = useRef(false)
  const { size } = useThree()
  const screenTexture = useTexture(screenshot.src)
  const isMobileScene = size.width < 480
  const isLightTheme = theme === 'light'
  const shellColor = isLightTheme ? '#f8f4ec' : '#161622'
  const bezelColor = isLightTheme ? '#ffffff' : '#000000'
  const screenPlateColor = isLightTheme ? '#d8d1c6' : '#050506'
  const hardwareColor = isLightTheme ? '#f8f4ec' : '#161622'
  const screenGeometry = useMemo(() => createRoundedScreenGeometry(1.89, 4.18, 0.105), [])
  const glassGeometry = useMemo(() => createRoundedScreenGeometry(1.96, 4.28, 0.13), [])

  useEffect(() => {
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.anisotropy = 8
    screenTexture.needsUpdate = true
  }, [screenTexture])

  useFrame((state) => {
    if (!groupRef.current) return

    const progress = getPrefersReducedMotion() ? 0.35 : getHeroScrollProgress()
    const float = getPrefersReducedMotion() ? 0 : Math.sin(state.clock.elapsedTime * 0.9) * 0.045
    const pointerWeight = isDraggingRef.current ? 0.1 : isHoveringRef.current ? 0.05 : 0.025
    const pointerX = getPrefersReducedMotion() ? 0 : THREE.MathUtils.clamp(state.pointer.x * pointerWeight, -0.07, 0.07)
    const pointerY = getPrefersReducedMotion() ? 0 : THREE.MathUtils.clamp(state.pointer.y * pointerWeight, -0.055, 0.055)
    const clickZoom = zoomRef.current
    const zoomSettle = 1 - clickZoom * 0.62
    const targetRotationX = (THREE.MathUtils.lerp(-0.014, 0.026, progress) - pointerY) * zoomSettle
    const targetRotationY = (THREE.MathUtils.lerp(-0.018, 0.028, progress) + pointerX) * zoomSettle
    const targetRotationZ = (THREE.MathUtils.lerp(0.006, -0.014, progress) + pointerX * 0.045) * zoomSettle
    const targetX = THREE.MathUtils.lerp(0.02, -0.12, progress)
    const baseY = isMobileScene ? 0.12 : -0.04
    const endY = isMobileScene ? 0.2 : 0.02
    const baseScale = isMobileScene ? 0.8 : 1.02
    const endScale = isMobileScene ? 0.78 : 0.98
    const targetY = THREE.MathUtils.lerp(baseY, endY, progress) + float
    const targetScale = THREE.MathUtils.lerp(baseScale, endScale, progress) * (1 + clickZoom * 0.72)

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.08)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08))
  })

  return (
    <group
      ref={groupRef}
      position={[0.02, isMobileScene ? 0.12 : -0.04, 0]}
      rotation={[-0.014, -0.018, 0.006]}
      scale={isMobileScene ? 0.8 : 1.02}
      onPointerOver={() => {
        isHoveringRef.current = true
      }}
      onPointerOut={() => {
        isHoveringRef.current = false
        isDraggingRef.current = false
      }}
      onPointerDown={(event) => {
        event.stopPropagation()
        isDraggingRef.current = true
        event.target.setPointerCapture?.(event.pointerId)
      }}
      onPointerUp={(event) => {
        isDraggingRef.current = false
        event.target.releasePointerCapture?.(event.pointerId)
      }}
    >
      <RoundedBox args={[2.12, 4.72, 0.026]} radius={0.18} smoothness={24} castShadow receiveShadow>
        <meshStandardMaterial color={shellColor} roughness={isLightTheme ? 0.34 : 0.2} metalness={isLightTheme ? 0.18 : 0.58} />
      </RoundedBox>

      <RoundedBox args={[2.06, 4.64, 0.027]} radius={0.16} smoothness={22} position={[0, 0, 0.01]}>
        <meshStandardMaterial color={bezelColor} roughness={isLightTheme ? 0.3 : 0.42} metalness={isLightTheme ? 0.08 : 0.18} />
      </RoundedBox>

      <RoundedBox args={[2.02, 4.42, 0.018]} radius={0.14} smoothness={20} position={[0, -0.02, 0.041]}>
        <meshStandardMaterial color={screenPlateColor} roughness={0.42} metalness={isLightTheme ? 0.08 : 0.16} />
      </RoundedBox>

      <RoundedBox args={[1.96, 4.3, 0.012]} radius={0.13} smoothness={18} position={[0, -0.02, 0.052]}>
        <meshStandardMaterial color={isLightTheme ? '#ece8df' : '#0b0b0d'} roughness={0.36} metalness={0.04} />
      </RoundedBox>

      <mesh geometry={screenGeometry} position={[0, -0.02, 0.064]}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={glassGeometry} position={[0, -0.02, 0.073]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={isLightTheme ? 0.055 : 0.032}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      <RoundedBox args={[0.32, 0.035, 0.014]} radius={0.018} smoothness={12} position={[0, 2.25, 0.072]}>
        <meshStandardMaterial color={isLightTheme ? '#d9d2c6' : '#000000'} roughness={0.2} />
      </RoundedBox>

      <RoundedBox args={[0.014, 0.42, 0.018]} radius={0.008} smoothness={8} position={[-1.076, 1.02, 0]}>
        <meshStandardMaterial color={hardwareColor} roughness={0.35} metalness={isLightTheme ? 0.12 : 0.3} />
      </RoundedBox>
      <RoundedBox args={[0.014, 0.6, 0.018]} radius={0.008} smoothness={8} position={[1.076, 0.5, 0]}>
        <meshStandardMaterial color={hardwareColor} roughness={0.35} metalness={isLightTheme ? 0.12 : 0.3} />
      </RoundedBox>
    </group>
  )
}

function HeroPhoneScene({ theme, language, t }) {
  const screenshotIndex = language === 'en' ? 1 : 0
  const screenshot = appScreenshots[theme]?.[screenshotIndex] ?? appScreenshots.dark[0]
  const zoomRef = useRef(0)
  const [zoomStep, setZoomStep] = useState(0)
  const isZoomed = PHONE_CLICK_ZOOM_LEVELS[zoomStep] > 0
  const zoomCursorClass = zoomStep >= 2 ? 'is-zooming-out' : 'is-zooming-in'

  const advancePhoneZoom = () => {
    setZoomStep((currentStep) => {
      const nextStep = (currentStep + 1) % PHONE_CLICK_ZOOM_LEVELS.length
      zoomRef.current = PHONE_CLICK_ZOOM_LEVELS[nextStep]

      return nextStep
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      advancePhoneZoom()
    }
  }

  return (
    <div
      className={`hero-phone-stage ${zoomCursorClass}`}
      aria-label={t.home.previewTitle}
      aria-pressed={isZoomed}
      role="button"
      tabIndex={0}
      onClick={advancePhoneZoom}
      onKeyDown={handleKeyDown}
    >
      <Canvas
        className="hero-phone-canvas"
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.05, 8.8], fov: 37 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.45} />
        <directionalLight position={[-3, 5, 6]} intensity={2.3} castShadow />
        <pointLight position={[2.7, 2.2, 3.8]} intensity={1.35} color="#f3e8d7" />
        <Suspense fallback={null}>
          <Phone3DModel screenshot={screenshot} zoomRef={zoomRef} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function HeroSection({ t, styles, theme, language, showPhone = false }) {
  const heroTitleClass = theme === 'dark' ? 'text-brand-cream-light' : 'text-white'
  const heroBodyClass = theme === 'dark' ? 'text-brand-cream/82' : 'text-white/88'
  const heroHandleClass =
    theme === 'dark'
      ? 'border-brand-cream/24 bg-brand-cream/[0.06] text-brand-cream-light hover:bg-brand-cream/[0.1]'
      : 'border-white/30 bg-white/10 text-white hover:bg-white/16'

  return (
    <section className="simple-hero relative overflow-hidden px-4 pb-0 pt-10 sm:px-6 sm:pt-12 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="hero-shell mx-auto grid max-w-5xl items-center"
      >
        <div className="max-w-2xl">
          <motion.h1
            variants={fadeUp}
            className={`max-w-3xl text-5xl font-black leading-[0.96] sm:text-6xl lg:text-[4.2rem] ${heroTitleClass}`}
          >
            {t.home.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mt-5 max-w-xl text-base font-medium leading-7 sm:text-lg ${heroBodyClass}`}
          >
            {t.home.body}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
            <WaitlistAction t={t} styles={styles} variant="hero" />
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de MUR"
              title="Instagram de MUR"
              className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border text-sm font-bold transition ${heroHandleClass}`}
            >
              <InstagramMark aria-hidden="true" className="h-5 w-5" />
            </a>
          </motion.div>

        </div>

        {showPhone ? (
          <motion.div variants={fadeUp} className="mt-8">
            <HeroPhoneScene theme={theme} language={language} t={t} />
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}

function ProductFeatureBand({ t, styles }) {
  return (
    <section id="nearby" className="product-band scroll-mt-24">
      <div className="grid gap-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-amber">
            {t.home.productLabel}
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-brand-ink sm:text-5xl">
            {t.home.productTitle}
          </h2>
          <p className="mt-3 max-w-lg text-base font-semibold leading-6 text-brand-ink/68">
            {t.home.productBody}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {t.productPoints.slice(0, 3).map((point, index) => {
            const Icon = productPointIcons[index] ?? Compass

            return (
              <motion.div key={point} variants={fadeUp} className="product-point">
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

function HowItWorksSection({ t, styles }) {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div>
        <SectionIntro
          eyebrow={t.home.stepsLabel}
          title={t.home.stepsTitle}
          styles={styles}
          centered
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {t.steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-brand-ink/10 bg-white p-4 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-amber text-xs font-black text-brand-ink">
                {index + 1}
              </div>
              <h3 className="mt-3 text-base font-black text-brand-ink">{step.title}</h3>
              {step.body ? (
                <p className="mt-1 text-sm font-semibold leading-5 text-brand-ink/58">{step.body}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WaitlistSection({ t, styles }) {
  return (
    <section id="waitlist" className="waitlist-band scroll-mt-24 rounded-lg border border-brand-ink/10 bg-white p-5 shadow-sm">
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-amber">
            {t.home.waitlistLabel}
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
            {t.home.waitlistTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-5 text-brand-ink/62">
            {t.home.waitlistBody}
          </p>
        </div>
        <WaitlistAction t={t} styles={styles} />
      </div>
    </section>
  )
}

function StoryCopyBlock({ eyebrow, title, body, children, compact = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.32 }}
      className={`story-copy ${compact ? 'story-copy-compact' : ''}`}
    >
      <p className="story-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="story-body">{body}</p> : null}
      {children ? <div className="story-copy-extra">{children}</div> : null}
    </motion.div>
  )
}

function DesktopLandingStory({ t, styles, theme, language }) {
  const storyRef = useRef(null)
  useStoryPhoneMotion(storyRef, true)
  useLandingStepScroll(true)
  useStoryStepScroll(storyRef, true)
  const heroTitleClass = theme === 'dark' ? 'text-brand-cream-light' : 'text-white'
  const heroBodyClass = theme === 'dark' ? 'text-brand-cream/78' : 'text-white/88'
  const heroHandleClass =
    theme === 'dark'
      ? 'border-brand-cream/22 bg-brand-cream/[0.05] text-brand-cream-light hover:bg-brand-cream/[0.09]'
      : 'border-brand-blue/18 bg-white/35 text-brand-blue hover:bg-white/55'

  return (
    <div ref={storyRef} className="landing-story">
      <div className="landing-story-phone-layer">
        <div className="landing-story-phone-sticky">
          <div className="landing-story-phone-shell">
            <HeroPhoneScene theme={theme} language={language} t={t} />
          </div>
        </div>
      </div>

      <div className="landing-story-scenes">
        <section className="landing-story-scene story-scene-hero">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="story-hero-copy"
          >
            <motion.h1
              variants={fadeUp}
              className={`text-5xl font-black leading-[0.96] sm:text-6xl lg:text-[4.5rem] ${heroTitleClass}`}
            >
              {t.home.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className={`mt-5 max-w-xl text-base font-semibold leading-7 sm:text-lg ${heroBodyClass}`}
            >
              {t.home.body}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
              <WaitlistAction t={t} styles={styles} variant="hero" />
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de MUR"
                title="Instagram de MUR"
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border text-sm font-bold transition ${heroHandleClass}`}
              >
                <InstagramMark aria-hidden="true" className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section id="nearby" className="landing-story-scene story-scene-middle scroll-mt-24">
          <StoryCopyBlock
            eyebrow={t.home.productLabel}
            title={t.home.productTitle}
            body={t.home.productBody}
          >
            <div className="story-pill-list">
              {t.productPoints.slice(0, 3).map((point, index) => {
                const Icon = productPointIcons[index] ?? Compass

                return (
                  <div key={point} className="story-pill">
                    <Icon aria-hidden="true" className="h-4 w-4 text-brand-amber" />
                    <span>{point}</span>
                  </div>
                )
              })}
            </div>
          </StoryCopyBlock>

          <StoryCopyBlock
            eyebrow={t.home.stepsLabel}
            title={t.home.stepsTitle}
            compact
          >
            <div className="story-step-list">
              {t.steps.map((step, index) => (
                <div key={step.title} className="story-step">
                  <span>{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    {step.body ? <p>{step.body}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </StoryCopyBlock>
        </section>

        <section id="waitlist" className="landing-story-scene story-scene-final scroll-mt-24">
          <StoryCopyBlock
            eyebrow={t.home.waitlistLabel}
            title={t.home.waitlistTitle}
            body={t.home.waitlistBody}
          >
            <div className="story-final-action">
              <WaitlistAction t={t} styles={styles} />
              <p>{t.footer.tagline}</p>
            </div>
          </StoryCopyBlock>
        </section>
      </div>
    </div>
  )
}

function HomePage({ t, styles, theme, language }) {
  const showStickyPhone = useMediaQuery('(min-width: 1024px)')

  if (showStickyPhone) {
    return (
      <div className="landing-layout">
        <DesktopLandingStory t={t} styles={styles} theme={theme} language={language} />
      </div>
    )
  }

  return (
    <div className="landing-layout">
      <div className="landing-copy-flow">
        <HeroSection t={t} styles={styles} theme={theme} language={language} showPhone={!showStickyPhone} />
        <div className="landing-dock px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8">
            <ProductFeatureBand t={t} styles={styles} />
            <HowItWorksSection t={t} styles={styles} />
            <WaitlistSection t={t} styles={styles} />
          </div>
        </div>
      </div>

      {showStickyPhone ? (
        <div className="landing-phone-rail">
          <div className="landing-phone-sticky">
            <HeroPhoneScene theme={theme} language={language} t={t} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MarketingShell({ children, language, setLanguage, theme, setTheme, t, styles }) {
  const currentYear = new Date().getFullYear()
  const mailto = `mailto:${BRAND.supportEmail}`

  return (
    <main className={`relative min-h-screen ${styles.marketingPage}`}>
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
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
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
              <PreferenceControls
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                t={t}
                styles={styles}
              />
              <HeaderMenu t={t} styles={styles} />
            </div>
          </div>
        </nav>

        {children}

        <footer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className={`mx-auto flex max-w-7xl flex-col gap-3 border-t pt-8 text-sm ${styles.border} ${styles.muted} sm:flex-row sm:items-center sm:justify-between`}>
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
              <PreferenceControls
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                t={t}
                styles={styles}
              />
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
    document.body.style.backgroundColor = theme === 'dark' ? '#161622' : '#ffffff'
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
      <HomePage t={t} styles={styles} theme={theme} language={language} />
    </MarketingShell>
  )
}

export default App
