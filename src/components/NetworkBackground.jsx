import { useEffect, useMemo, useRef } from 'react'
import { tsParticles } from '@tsparticles/engine'
import { loadLinksPreset } from '@tsparticles/preset-links'

const PARTICLE_THEME = {
  dark: {
    background: '#161622',
    point: '#f3e8d7',
    accent: '#ff9d00',
    link: '#e6d2b5',
  },
  light: {
    background: '#f3e8d7',
    point: '#161622',
    accent: '#ff9d00',
    link: '#5f5549',
  },
}

let particlesEnginePromise

function createParticleOptions(theme) {
  const colors = PARTICLE_THEME[theme] ?? PARTICLE_THEME.dark

  return {
    preset: 'links',
    fullScreen: {
      enable: false,
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    detectRetina: true,
    fpsLimit: 45,
    particles: {
      color: {
        value: [colors.point, colors.accent],
      },
      links: {
        color: colors.link,
        distance: 145,
        enable: true,
        opacity: theme === 'dark' ? 0.22 : 0.16,
        width: 1,
      },
      move: {
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 0.45,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 850,
        },
        value: 58,
      },
      opacity: {
        value: {
          min: 0.18,
          max: 0.58,
        },
      },
      size: {
        value: {
          min: 1.2,
          max: 3.8,
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
    const instanceId = `mur-links-background-${loadVersion}`

    loadVersionRef.current = loadVersion
    particlesEnginePromise ??= loadLinksPreset(tsParticles)

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
          console.error('Unable to load Mur linked nodes background', error)
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
      className={`linked-nodes-background linked-nodes-background-${theme}`}
    >
      <div ref={particleHostRef} className="linked-nodes-particles" />
      <div className="linked-nodes-vignette" />
    </div>
  )
}
