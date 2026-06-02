import { useEffect, useMemo, useRef } from 'react'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

const STREET_PATHS = [
  { d: 'M70 230 C220 210 285 118 470 142 S750 198 930 128 1160 170', width: 2.4 },
  { d: 'M36 540 C190 492 270 612 424 558 S690 390 870 448 1188 352', width: 2.2 },
  { d: 'M116 102 L258 708', width: 1.1 },
  { d: 'M264 70 L380 742', width: 1.2 },
  { d: 'M480 44 L542 760', width: 1.1 },
  { d: 'M700 74 L660 752', width: 1.1 },
  { d: 'M884 60 L780 736', width: 1.1 },
  { d: 'M1044 96 L934 704', width: 1.1 },
  { d: 'M82 366 L1134 286', width: 1 },
  { d: 'M104 458 L1114 612', width: 1 },
  { d: 'M150 650 L1040 92', width: 1 },
  { d: 'M270 760 L1166 218', width: 1 },
  { d: 'M44 176 L1084 678', width: 0.9 },
  { d: 'M342 84 C514 260 734 218 1120 530', width: 0.9 },
  { d: 'M130 600 C322 346 610 342 1010 140', width: 0.9 },
]

const POST_POINTS = [
  { id: 'plaza', x: 208, y: 214, delay: 0 },
  { id: 'kiosk', x: 346, y: 410, delay: 0.4 },
  { id: 'corner', x: 492, y: 250, delay: 0.8 },
  { id: 'market', x: 620, y: 492, delay: 1.2 },
  { id: 'school', x: 780, y: 328, delay: 1.6 },
  { id: 'station', x: 926, y: 212, delay: 2 },
  { id: 'park', x: 988, y: 548, delay: 2.4 },
]

const CONNECTIONS = [
  ['plaza', 'kiosk'],
  ['kiosk', 'corner'],
  ['corner', 'market'],
  ['market', 'park'],
  ['corner', 'school'],
  ['school', 'station'],
  ['school', 'park'],
]

const pointsById = POST_POINTS.reduce((points, point) => {
  points[point.id] = point
  return points
}, {})

const PARTICLE_THEME = {
  dark: {
    background: '#111827',
    point: '#ff9d00',
    muted: '#cdcde0',
    link: '#ffb23f',
  },
  light: {
    background: '#f8fafc',
    point: '#ff9d00',
    muted: '#64748b',
    link: '#d97706',
  },
}

let particlesEnginePromise

function createParticleOptions(theme) {
  const colors = PARTICLE_THEME[theme] ?? PARTICLE_THEME.dark

  return {
    fullScreen: {
      enable: false,
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    detectRetina: true,
    fpsLimit: 40,
    particles: {
      color: {
        value: [colors.point, colors.muted],
      },
      links: {
        blink: false,
        color: colors.link,
        consent: false,
        distance: 150,
        enable: true,
        opacity: theme === 'dark' ? 0.26 : 0.18,
        width: 1.2,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: true,
        speed: 0.18,
        straight: false,
      },
      number: {
        density: {
          enable: false,
        },
        value: 28,
      },
      opacity: {
        value: {
          min: 0.16,
          max: 0.56,
        },
        animation: {
          enable: true,
          speed: 0.7,
          sync: false,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: {
          min: 1.4,
          max: 4.4,
        },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
    },
  }
}

export default function NetworkBackground({ theme = 'dark' }) {
  const particleHostRef = useRef(null)
  const loadVersionRef = useRef(0)
  const particleOptions = useMemo(() => createParticleOptions(theme), [theme])

  useEffect(() => {
    let cancelled = false
    let container
    const loadVersion = loadVersionRef.current + 1
    const instanceId = `mur-neighborhood-particles-${loadVersion}`

    loadVersionRef.current = loadVersion

    particlesEnginePromise ??= loadSlim(tsParticles)

    particlesEnginePromise
      .then(() =>
        tsParticles.load({
          id: instanceId,
          element: particleHostRef.current,
          options: particleOptions,
        }),
      )
      .then((loadedContainer) => {
        if (cancelled || loadVersion !== loadVersionRef.current) {
          loadedContainer?.destroy()
          return
        }

        container = loadedContainer
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('Unable to load Mur neighborhood background', error)
        }
      })

    return () => {
      cancelled = true
      container?.destroy()
    }
  }, [particleOptions])

  return (
    <div
      aria-hidden="true"
      className={`neighborhood-map-background neighborhood-map-background-${theme}`}
    >
      <div
        ref={particleHostRef}
        id="mur-neighborhood-particles"
        className="neighborhood-map-particles"
      />

      <svg
        className="neighborhood-map-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="postGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.82" />
            <stop offset="72%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="neighborhood-map-blocks">
          <rect x="180" y="262" width="180" height="104" rx="18" />
          <rect x="424" y="168" width="172" height="126" rx="18" />
          <rect x="670" y="382" width="206" height="122" rx="18" />
          <rect x="850" y="230" width="184" height="110" rx="18" />
          <rect x="270" y="520" width="230" height="116" rx="18" />
        </g>

        <g className="neighborhood-map-streets">
          {STREET_PATHS.map((street) => (
            <path key={street.d} d={street.d} strokeWidth={street.width} />
          ))}
        </g>

        <g className="neighborhood-map-routes">
          {CONNECTIONS.map(([from, to], index) => {
            const start = pointsById[from]
            const end = pointsById[to]

            return (
              <line
                key={`${from}-${to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                style={{ animationDelay: `${index * -0.65}s` }}
              />
            )
          })}
        </g>

        <g className="neighborhood-map-posts">
          {POST_POINTS.map((point) => (
            <g
              key={point.id}
              className="neighborhood-map-post"
              style={{ '--post-delay': `${point.delay}s` }}
              transform={`translate(${point.x} ${point.y})`}
            >
              <circle className="neighborhood-map-post-glow" r="38" />
              <circle className="neighborhood-map-post-pulse" r="18" />
              <circle className="neighborhood-map-post-core" r="7" />
            </g>
          ))}
        </g>
      </svg>

      <div className="neighborhood-map-vignette" />
    </div>
  )
}
