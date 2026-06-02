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
    link: '#243047',
  },
}

let particlesEnginePromise

function createParticleOptions(theme) {
  const colors = PARTICLE_THEME[theme] ?? PARTICLE_THEME.dark
  const isLight = theme === 'light'

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
        value: isLight ? [colors.point, colors.point, colors.accent] : [colors.point, colors.accent],
      },
      links: {
        color: colors.link,
        distance: isLight ? 155 : 145,
        enable: true,
        opacity: isLight ? 0.38 : 0.22,
        width: isLight ? 1.25 : 1,
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
          min: isLight ? 0.32 : 0.18,
          max: isLight ? 0.78 : 0.58,
        },
      },
      size: {
        value: {
          min: isLight ? 1.6 : 1.2,
          max: isLight ? 4.6 : 3.8,
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
