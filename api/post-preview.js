import { fetchSharedPostPreview } from './_postPreviewData.js'

const LANGUAGES = ['es', 'en']
const THEMES = ['light', 'dark']
const MINUTE_MS = 60 * 1000

const UI_TEXT = {
  es: {
    locale: 'es',
    sharedPost: 'Post compartido',
    expiredLink: 'Enlace vencido',
    sharedFrom: 'Compartido desde MUR',
    openHeading: 'Abrí este post<br />en MUR',
    expiredHeading: 'Post no disponible',
    lead: 'Seguí la conversación, mirá los comentarios y respondé desde la app.',
    expiredLead: 'Este enlace ya no apunta a una publicación disponible.',
    openInMur: 'Abrir en MUR',
    goToMur: 'Ir a MUR',
    learnMur: 'Conocer MUR',
    autoOpenHint: 'Si la app no se abre automáticamente, tocá el botón.',
    expiredHint: 'Si el post expiró, ya no va a estar disponible en la app.',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    audio: 'Audio',
    poll: 'Encuesta',
    image: 'Imagen',
    video: 'Video',
    post: 'Post',
    vote: 'voto',
    votes: 'votos',
    pollCta: 'Abrí MUR para votar o ver la conversación completa.',
    audioUnsupported: 'Tu navegador no puede reproducir este audio.',
    previewLabel: 'Vista previa del post',
    expiresInPrefix: 'Se elimina en',
    expiredSoon: 'Puede eliminarse en cualquier momento',
    expiresAtLabel: 'Eliminación automática',
    lessThanMinute: 'menos de 1 min',
    hourUnit: 'h',
    minuteUnit: 'min',
  },
  en: {
    locale: 'en',
    sharedPost: 'Shared post',
    expiredLink: 'Expired link',
    sharedFrom: 'Shared from MUR',
    openHeading: 'Open this post<br />in MUR',
    expiredHeading: 'Post unavailable',
    lead: 'Follow the conversation, read the comments, and reply from the app.',
    expiredLead: 'This link no longer points to an available post.',
    openInMur: 'Open in MUR',
    goToMur: 'Go to MUR',
    learnMur: 'Learn about MUR',
    autoOpenHint: 'If the app does not open automatically, tap the button.',
    expiredHint: 'If the post expired, it will no longer be available in the app.',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    audio: 'Audio',
    poll: 'Poll',
    image: 'Image',
    video: 'Video',
    post: 'Post',
    vote: 'vote',
    votes: 'votes',
    pollCta: 'Open MUR to vote or see the full conversation.',
    audioUnsupported: 'Your browser cannot play this audio.',
    previewLabel: 'Post preview',
    expiresInPrefix: 'Deletes in',
    expiredSoon: 'May be deleted at any moment',
    expiresAtLabel: 'Automatic deletion',
    lessThanMinute: 'less than 1 min',
    hourUnit: 'h',
    minuteUnit: 'min',
  },
}

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeJsString = (value) =>
  String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')

const getFirstQueryValue = (value) => (Array.isArray(value) ? value[0] : value)

const getChoice = (value, allowed, fallback) => {
  const normalized = String(value || '').trim().toLowerCase()
  return allowed.includes(normalized) ? normalized : fallback
}

const getRequestUrl = (request) => {
  const host = request.headers['x-forwarded-host'] || request.headers.host || 'mur.olvidaftech.com'
  const protocol = request.headers['x-forwarded-proto'] || 'https'

  return new URL(request.url || '/', `${protocol}://${host}`)
}

const getRequestQueryValue = (request, key) => {
  const queryValue = getFirstQueryValue(request.query?.[key])
  if (queryValue !== undefined && queryValue !== null && String(queryValue).trim() !== '') {
    return queryValue
  }

  return getRequestUrl(request).searchParams.get(key)
}

const getRequestPreferences = (request) => ({
  language: getChoice(getRequestQueryValue(request, 'lang'), LANGUAGES, 'es'),
  theme: getChoice(getRequestQueryValue(request, 'theme'), THEMES, 'light'),
})

const buildPreferenceUrl = (request, updates) => {
  const currentUrl = getRequestUrl(request)
  const slug = getRequestQueryValue(request, 'slug')
  const publicPath =
    currentUrl.pathname === '/api/post-preview' && slug
      ? `/p/${encodeURIComponent(String(slug))}`
      : currentUrl.pathname
  const params = new URLSearchParams(currentUrl.search)

  ;['lang', 'theme'].forEach((key) => {
    const value = getRequestQueryValue(request, key)
    if (value && !params.has(key)) {
      params.set(key, value)
    }
  })

  params.delete('slug')

  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value)
  })

  const search = params.toString()
  return `${publicPath}${search ? `?${search}` : ''}${currentUrl.hash}`
}

const getInitials = (value) => {
  const text = String(value || 'MUR').trim()
  const parts = text.split(/\s+/).filter(Boolean)
  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : text.slice(0, 2)).toUpperCase()
}

const getMediaLabel = (mediaType, t) => {
  const labels = {
    audio: t.audio,
    image: t.image,
    poll: t.poll,
    video: t.video,
  }

  return labels[mediaType] || t.post
}

const formatDuration = (seconds) => {
  const safeSeconds = Math.max(0, Math.round(Number(seconds) || 0))
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

const formatVoteCount = (count, t) => {
  const safeCount = Math.max(0, Number(count) || 0)
  return `${safeCount} ${safeCount === 1 ? t.vote : t.votes}`
}

const getValidDate = (value) => {
  const time = Date.parse(value)
  return Number.isFinite(time) ? new Date(time) : null
}

const formatExpirationText = (expiresAt, t, nowMs = Date.now()) => {
  const expiresAtDate = getValidDate(expiresAt)
  if (!expiresAtDate) return ''

  const remainingMs = expiresAtDate.getTime() - nowMs
  if (remainingMs <= 0) return t.expiredSoon
  if (remainingMs < MINUTE_MS) return `${t.expiresInPrefix} ${t.lessThanMinute}`

  const totalMinutes = Math.ceil(remainingMs / MINUTE_MS)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const parts = []

  if (hours > 0) {
    parts.push(`${hours} ${t.hourUnit}`)
  }

  if (minutes > 0 || hours === 0) {
    parts.push(`${minutes} ${t.minuteUnit}`)
  }

  return `${t.expiresInPrefix} ${parts.join(' ')}`
}

const formatExpirationDate = (expiresAt, language) => {
  const expiresAtDate = getValidDate(expiresAt)
  if (!expiresAtDate) return ''

  try {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(expiresAtDate)
  } catch (error) {
    return expiresAtDate.toISOString()
  }
}

const normalizeHexColor = (value) => {
  const text = String(value || '').trim()
  if (/^#[0-9a-f]{3}$/i.test(text)) {
    return `#${text
      .slice(1)
      .split('')
      .map((char) => `${char}${char}`)
      .join('')}`
  }

  if (/^#[0-9a-f]{6}$/i.test(text)) {
    return text
  }

  return '#8F91A4'
}

const hexToRgba = (hex, alpha) => {
  const normalized = normalizeHexColor(hex)
  const value = normalized.slice(1)
  const red = parseInt(value.slice(0, 2), 16)
  const green = parseInt(value.slice(2, 4), 16)
  const blue = parseInt(value.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const getReadableAccent = (hex) => {
  const normalized = normalizeHexColor(hex)
  const value = normalized.slice(1)
  const channels = [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ]
  const luminance =
    (0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]) / 255

  if (luminance <= 0.58) {
    return normalized
  }

  return `#${channels
    .map((channel) => Math.max(0, Math.round(channel * 0.62)).toString(16).padStart(2, '0'))
    .join('')}`
}

const getSharedPostCacheControl = (preview) => {
  if (preview?.poll) {
    return 'no-store, max-age=0, must-revalidate'
  }

  return 'public, s-maxage=300, stale-while-revalidate=86400'
}

const renderPreferenceIcon = (type) => {
  if (type === 'language') {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" class="control-icon"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3c2.4 2.7 3.6 5.7 3.6 9s-1.2 6.3-3.6 9"></path><path d="M12 3c-2.4 2.7-3.6 5.7-3.6 9s1.2 6.3 3.6 9"></path></svg>`
  }

  return `<svg viewBox="0 0 24 24" aria-hidden="true" class="control-icon control-icon-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true" class="control-icon control-icon-moon"><path d="M20 14.4A8 8 0 0 1 9.6 4a8.7 8.7 0 1 0 10.4 10.4Z"></path></svg>`
}

const renderSharedPostHtml = (preview, options) => {
  const language = getChoice(options?.language, LANGUAGES, 'es')
  const theme = getChoice(options?.theme, THEMES, 'light')
  const request = options?.request
  const t = UI_TEXT[language] || UI_TEXT.es
  const nextLanguage = language === 'es' ? 'en' : 'es'
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const languageHref = request
    ? buildPreferenceUrl(request, { lang: nextLanguage, theme })
    : `?lang=${nextLanguage}&theme=${theme}`
  const themeHref = request
    ? buildPreferenceUrl(request, { lang: language, theme: nextTheme })
    : `?lang=${language}&theme=${nextTheme}`
  const localizedTitle =
    preview.found && preview.authorName
      ? `${preview.authorName} ${language === 'en' ? 'on' : 'en'} MUR`
      : preview.found
        ? preview.title
        : t.expiredHeading
  const title = escapeHtml(localizedTitle)
  const description = escapeHtml(preview.description)
  const image = escapeHtml(preview.image)
  const imageWidth = Number(preview.imageWidth || 1024)
  const imageHeight = Number(preview.imageHeight || 1024)
  const url = escapeHtml(preview.url)
  const appUrl = preview.appUrl || ''
  const appUrlJs = escapeJsString(appUrl)
  const authorName = escapeHtml(preview.authorName || 'MUR')
  const username = escapeHtml(preview.username || '')
  const categoryLabel = escapeHtml(
    preview.categoryLabels?.[language] ||
      preview.categoryLabel ||
      preview.category ||
      UI_TEXT.es.post,
  )
  const postText = escapeHtml(preview.postText || (!preview.found ? preview.description : ''))
  const hasPostText = Boolean(String(preview.postText || (!preview.found ? preview.description : '')).trim())
  const avatarUrl = preview.avatarUrl ? escapeHtml(preview.avatarUrl) : ''
  const avatarInitials = escapeHtml(getInitials(preview.authorName))
  const hasImage = Boolean(preview.hasImage && preview.image)
  const audio = preview.audio || null
  const hasAudio = Boolean(audio?.url)
  const audioUrl = hasAudio ? escapeHtml(audio.url) : ''
  const audioMimeType = hasAudio ? escapeHtml(audio.mimeType || 'audio/mp4') : ''
  const audioDuration = formatDuration(audio?.durationSeconds)
  const poll = preview.poll || null
  const hasPoll = Boolean(poll?.question)
  const pollQuestion = hasPoll ? escapeHtml(poll.question) : ''
  const pollTotalVotes = Number(poll?.totalVotes || 0)
  const pollOptions = Array.isArray(poll?.options) ? poll.options : []
  const pollOptionsHtml = pollOptions
    .map((option) => {
      const votesCount = Number(option?.votesCount || 0)
      const percentage = pollTotalVotes > 0 ? Math.round((votesCount / pollTotalVotes) * 100) : 0

      return `<div class="poll-option">
                <div class="poll-option-fill" style="width: ${percentage}%"></div>
                <div class="poll-option-content">
                  <span class="poll-option-text">${escapeHtml(option?.text || '')}</span>
                  <span class="poll-option-result">${percentage}% · ${escapeHtml(formatVoteCount(votesCount, t))}</span>
                </div>
              </div>`
    })
    .join('')
  const mediaLabel = escapeHtml(getMediaLabel(preview.mediaType, t))
  const expiresAt = preview.expiresAt || ''
  const expirationDate = formatExpirationDate(expiresAt, language)
  const expirationText = formatExpirationText(expiresAt, t)
  const hasExpiration = Boolean(preview.found && expirationText && expirationDate)
  const expirationChipHtml = hasExpiration
    ? `<span
        class="expiry-chip"
        title="${escapeHtml(`${t.expiresAtLabel}: ${expirationDate}`)}"
        data-expires-at="${escapeHtml(expiresAt)}"
        data-expires-prefix="${escapeHtml(t.expiresInPrefix)}"
        data-expired-text="${escapeHtml(t.expiredSoon)}"
        data-less-than-minute="${escapeHtml(t.lessThanMinute)}"
        data-hour-unit="${escapeHtml(t.hourUnit)}"
        data-minute-unit="${escapeHtml(t.minuteUnit)}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" class="expiry-icon">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 7v5l3 2"></path>
        </svg>
        <span data-expiry-text>${escapeHtml(expirationText)}</span>
      </span>`
    : ''
  const categoryColor = normalizeHexColor(preview.categoryColor)
  const categoryInk = getReadableAccent(categoryColor)
  const categoryColorHtml = escapeHtml(categoryColor)
  const categoryInkHtml = escapeHtml(categoryInk)
  const categorySoftHtml = escapeHtml(hexToRgba(categoryColor, 0.1))
  const categoryBorderHtml = escapeHtml(hexToRgba(categoryColor, 0.22))
  const categoryShadowHtml = escapeHtml(hexToRgba(categoryColor, 0.16))
  const pageHeadingHtml = preview.found ? t.openHeading : escapeHtml(t.expiredHeading)
  const pageLead = preview.found ? t.lead : t.expiredLead

  return `<!doctype html>
<html lang="${escapeHtml(t.locale)}" data-theme="${escapeHtml(theme)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:width" content="${imageWidth}" />
    <meta property="og:image:height" content="${imageHeight}" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="theme-color" content="#ffb35c" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <script>
      (function () {
        var allowedLanguages = ${JSON.stringify(LANGUAGES)};
        var allowedThemes = ${JSON.stringify(THEMES)};
        var currentLanguage = '${escapeJsString(language)}';
        var currentTheme = '${escapeJsString(theme)}';
        var params = new URLSearchParams(window.location.search);
        var queryLanguage = params.get('lang');
        var queryTheme = params.get('theme');
        var storage = null;

        try {
          storage = window.localStorage;
        } catch (error) {}

        var storedLanguage = storage ? storage.getItem('mur-language') : null;
        var storedTheme = storage ? storage.getItem('mur-theme') : null;
        var nextLanguage = allowedLanguages.indexOf(queryLanguage) >= 0
          ? queryLanguage
          : allowedLanguages.indexOf(storedLanguage) >= 0
            ? storedLanguage
            : currentLanguage;
        var nextTheme = allowedThemes.indexOf(queryTheme) >= 0
          ? queryTheme
          : allowedThemes.indexOf(storedTheme) >= 0
            ? storedTheme
            : currentTheme;

        document.documentElement.dataset.theme = nextTheme;

        if (storage) {
          storage.setItem('mur-language', nextLanguage);
          storage.setItem('mur-theme', nextTheme);
        }

        if ((!queryLanguage && nextLanguage !== currentLanguage) || (!queryTheme && nextTheme !== currentTheme)) {
          params.set('lang', nextLanguage);
          params.set('theme', nextTheme);
          window.location.replace(window.location.pathname + '?' + params.toString() + window.location.hash);
        }
      })();
    </script>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --page-start: #fffaf1;
        --page-mid: #ffffff;
        --page-end: #f4fbf7;
        --text: #17151f;
        --muted: rgba(23, 21, 31, 0.72);
        --subtle: rgba(23, 21, 31, 0.55);
        --quiet: rgba(23, 21, 31, 0.08);
        --border: rgba(23, 21, 31, 0.1);
        --surface: rgba(255, 255, 255, 0.96);
        --surface-soft: rgba(255, 255, 255, 0.72);
        --surface-warm: rgba(255, 250, 241, 0.88);
        --grid: rgba(23, 21, 31, 0.035);
        --brand-bg: #17151f;
        --brand-on-bg: #fffaf1;
        --secondary-bg: rgba(255, 255, 255, 0.72);
        --secondary-border: rgba(23, 21, 31, 0.12);
        --primary-text: #17151f;
        color: var(--text);
        background: var(--page-start);
      }
      :root[data-theme="dark"] {
        color-scheme: dark;
        --page-start: #161622;
        --page-mid: #1d2130;
        --page-end: #111827;
        --text: #fff7e8;
        --muted: rgba(255, 247, 232, 0.76);
        --subtle: rgba(255, 247, 232, 0.58);
        --quiet: rgba(255, 247, 232, 0.1);
        --border: rgba(255, 247, 232, 0.14);
        --surface: rgba(29, 33, 48, 0.96);
        --surface-soft: rgba(255, 255, 255, 0.06);
        --surface-warm: rgba(255, 255, 255, 0.05);
        --grid: rgba(255, 247, 232, 0.045);
        --brand-bg: #ffb35c;
        --brand-on-bg: #161622;
        --secondary-bg: rgba(255, 255, 255, 0.06);
        --secondary-border: rgba(255, 247, 232, 0.2);
        --primary-text: #161622;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        overflow-x: hidden;
        min-height: 100svh;
        background:
          linear-gradient(135deg, rgba(255, 179, 92, 0.18) 0%, rgba(255, 250, 241, 0) 38%),
          linear-gradient(180deg, var(--page-start) 0%, var(--page-mid) 54%, var(--page-end) 100%);
        color: var(--text);
      }
      body::before {
        position: fixed;
        inset: 0;
        z-index: -1;
        content: "";
        background-image:
          linear-gradient(var(--grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 72%);
      }
      a {
        color: inherit;
      }
      .page-shell {
        width: 100%;
        max-width: 1120px;
        min-height: 100svh;
        margin: 0 auto;
        padding: 32px 24px;
        display: flex;
        flex-direction: column;
      }
      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--text);
        font-size: 18px;
        font-weight: 900;
        text-decoration: none;
      }
      .brand img {
        width: 38px;
        height: 38px;
        border-radius: 8px;
        object-fit: cover;
      }
      .header-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .preference-controls {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
      }
      .preference-button {
        min-height: 44px;
        min-width: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        border: 1px solid var(--secondary-border);
        border-radius: 8px;
        background: var(--secondary-bg);
        color: var(--text);
        padding: 0 12px;
        font-size: 12px;
        font-weight: 900;
        text-decoration: none;
      }
      .preference-button-language {
        min-width: 64px;
      }
      .control-icon {
        width: 16px;
        height: 16px;
        flex: 0 0 auto;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }
      .control-icon-moon {
        display: none;
      }
      :root[data-theme="dark"] .control-icon-sun {
        display: none;
      }
      :root[data-theme="dark"] .control-icon-moon {
        display: block;
      }
      .status-pill,
      .eyebrow,
      .category-chip {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        min-height: 30px;
        border-radius: 999px;
        background: rgba(255, 179, 92, 0.18);
        padding: 0 13px;
        color: #7a3f00;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
      }
      .status-pill {
        background: rgba(18, 126, 105, 0.11);
        color: #0b5f50;
      }
      :root[data-theme="dark"] .eyebrow {
        background: rgba(255, 179, 92, 0.14);
        color: #ffd49a;
      }
      :root[data-theme="dark"] .status-pill {
        background: rgba(118, 242, 190, 0.12);
        color: #bdf4de;
      }
      .share-layout {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
        align-items: center;
        gap: 56px;
        padding: 48px 0 32px;
      }
      .copy {
        max-width: 500px;
      }
      h1 {
        margin: 18px 0 16px;
        font-size: 56px;
        line-height: 1;
        letter-spacing: 0;
      }
      p {
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.6;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 28px;
      }
      .button,
      .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 48px;
        border-radius: 8px;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 800;
        text-decoration: none;
      }
      .button {
        background: #ffb35c;
        color: var(--primary-text);
        box-shadow: 0 12px 26px rgba(255, 128, 0, 0.22);
      }
      .secondary-button {
        border: 1px solid var(--secondary-border);
        background: var(--secondary-bg);
        color: var(--text);
      }
      .hint {
        max-width: 440px;
        margin-top: 18px;
        font-size: 13px;
        color: var(--subtle);
      }
      .preview {
        display: flex;
        justify-content: center;
      }
      .post-card {
        width: 100%;
        max-width: 480px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        box-shadow:
          0 28px 72px rgba(0, 0, 0, 0.16),
          0 16px 44px var(--category-shadow);
        overflow: hidden;
      }
      .post-topline {
        height: 10px;
        background: linear-gradient(90deg, var(--category-color), rgba(255, 179, 92, 0.65));
      }
      .post-body {
        padding: 24px;
      }
      .post-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .avatar {
        width: 50px;
        height: 50px;
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--brand-bg);
        color: var(--brand-on-bg);
        font-weight: 900;
        overflow: hidden;
      }
      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .author {
        min-width: 0;
      }
      .author strong,
      .author span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .author strong {
        font-size: 16px;
        line-height: 1.2;
      }
      .author span {
        margin-top: 3px;
        color: var(--subtle);
        font-size: 14px;
      }
      .post-text {
        margin-top: 22px;
        color: var(--text);
        font-size: 20px;
        line-height: 1.45;
        overflow-wrap: anywhere;
      }
      .audio-card,
      .poll-card {
        margin-top: 22px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: linear-gradient(180deg, var(--surface-warm), var(--surface));
        padding: 16px;
      }
      .audio-header,
      .poll-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }
      .audio-title,
      .poll-title {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--text);
        font-size: 14px;
        font-weight: 900;
      }
      .audio-dot,
      .poll-dot {
        width: 28px;
        height: 28px;
        display: inline-grid;
        place-items: center;
        border-radius: 999px;
        background: var(--category-soft);
        color: var(--category-ink);
        font-size: 13px;
      }
      .audio-dot::before {
        width: 0;
        height: 0;
        margin-left: 2px;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid currentColor;
        content: "";
      }
      .audio-duration,
      .poll-total {
        color: var(--subtle);
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }
      audio {
        width: 100%;
        height: 42px;
        display: block;
        accent-color: var(--category-color);
      }
      .poll-question {
        margin: 0 0 14px;
        color: var(--text);
        font-size: 17px;
        font-weight: 800;
        line-height: 1.35;
      }
      .poll-options {
        display: grid;
        gap: 9px;
      }
      .poll-option {
        position: relative;
        min-height: 42px;
        overflow: hidden;
        border: 1px solid var(--quiet);
        border-radius: 8px;
        background: var(--surface-soft);
      }
      .poll-option-fill {
        position: absolute;
        inset: 0 auto 0 0;
        width: 0;
        min-width: 3px;
        background: var(--category-soft);
      }
      .poll-option-content {
        position: relative;
        z-index: 1;
        min-height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 9px 12px;
      }
      .poll-option-text {
        min-width: 0;
        color: var(--text);
        font-size: 14px;
        font-weight: 800;
        overflow-wrap: anywhere;
      }
      .poll-option-result {
        flex: 0 0 auto;
        color: var(--category-ink);
        font-size: 12px;
        font-weight: 900;
        white-space: nowrap;
      }
      .poll-cta {
        margin-top: 12px;
        color: var(--subtle);
        font-size: 13px;
      }
      .post-image {
        display: block;
        width: 100%;
        margin-top: 20px;
        aspect-ratio: 4 / 3;
        border-radius: 8px;
        object-fit: cover;
      }
      .post-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        margin-top: 22px;
        padding-top: 18px;
        border-top: 1px solid var(--quiet);
      }
      .category-chip {
        gap: 8px;
        min-height: 28px;
        border: 1px solid var(--category-border);
        background: var(--category-soft);
        color: var(--category-ink);
        text-transform: none;
      }
      .category-mark {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--category-color);
        box-shadow: 0 0 0 4px var(--category-soft);
      }
      .meta-dot {
        color: var(--subtle);
      }
      .media-label {
        color: var(--subtle);
        font-size: 13px;
        font-weight: 800;
      }
      .expiry-chip {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        min-height: 30px;
        max-width: 100%;
        border: 1px solid rgba(255, 179, 92, 0.36);
        border-radius: 999px;
        background: rgba(255, 179, 92, 0.13);
        color: #7a3f00;
        padding: 0 11px;
        font-size: 12px;
        font-weight: 900;
        line-height: 1.2;
      }
      .expiry-icon {
        width: 15px;
        height: 15px;
        flex: 0 0 auto;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }
      :root[data-theme="dark"] .expiry-chip {
        border-color: rgba(255, 179, 92, 0.34);
        background: rgba(255, 179, 92, 0.12);
        color: #ffd49a;
      }
      @media (max-width: 820px) {
        .page-shell {
          max-width: 560px;
          padding: 22px 16px;
        }
        .status-pill {
          display: none;
        }
        .topbar {
          align-items: flex-start;
        }
        .share-layout {
          grid-template-columns: 1fr;
          justify-items: start;
          gap: 28px;
          padding: 34px 0 20px;
        }
        h1 {
          font-size: 40px;
        }
        .copy {
          width: calc(100vw - 32px);
          max-width: 360px;
        }
        .preview {
          justify-content: flex-start;
        }
        .post-card {
          width: calc(100vw - 32px);
          max-width: 360px;
        }
      }
      @media (max-width: 420px) {
        .page-shell {
          padding: 22px 16px;
        }
        .brand span {
          display: none;
        }
        h1 {
          font-size: 32px;
        }
        .actions,
        .button,
        .secondary-button {
          width: 100%;
        }
        .post-body {
          padding: 20px;
        }
        .post-text {
          font-size: 18px;
        }
        .poll-option-content {
          align-items: flex-start;
          flex-direction: column;
          gap: 4px;
        }
        .poll-option-result {
          white-space: normal;
        }
      }
    </style>
  </head>
  <body>
    <div class="page-shell">
      <header class="topbar">
        <a class="brand" href="/" aria-label="MUR">
          <img src="/logo.png" alt="" />
          <span>MUR</span>
        </a>
        <div class="header-actions">
          <nav class="preference-controls" aria-label="${escapeHtml(`${t.language} / ${t.theme}`)}">
            <a
              class="preference-button preference-button-language"
              href="${escapeHtml(languageHref)}"
              aria-label="${escapeHtml(`${t.language}: ${language.toUpperCase()}`)}"
              title="${escapeHtml(`${t.language}: ${language.toUpperCase()}`)}"
              data-preference-link="language"
              data-preference-value="${escapeHtml(nextLanguage)}"
            >
              ${renderPreferenceIcon('language')}
              <span>${escapeHtml(language.toUpperCase())}</span>
            </a>
            <a
              class="preference-button"
              href="${escapeHtml(themeHref)}"
              aria-label="${escapeHtml(`${t.theme}: ${t[theme]}`)}"
              title="${escapeHtml(`${t.theme}: ${t[theme]}`)}"
              data-preference-link="theme"
              data-preference-value="${escapeHtml(nextTheme)}"
            >
              ${renderPreferenceIcon('theme')}
            </a>
          </nav>
          <span class="status-pill">${preview.found ? escapeHtml(t.sharedPost) : escapeHtml(t.expiredLink)}</span>
        </div>
      </header>
      <main class="share-layout">
        <section class="copy">
          <span class="eyebrow">${escapeHtml(t.sharedFrom)}</span>
          <h1>${pageHeadingHtml}</h1>
          <p>${escapeHtml(pageLead)}</p>
          <div class="actions">
            ${
              appUrl
                ? `<a class="button" href="${escapeHtml(appUrl)}">${escapeHtml(t.openInMur)}</a>`
                : `<a class="button" href="/">${escapeHtml(t.goToMur)}</a>`
            }
            <a class="secondary-button" href="/">${escapeHtml(t.learnMur)}</a>
          </div>
          <p class="hint">${
            appUrl
              ? escapeHtml(t.autoOpenHint)
              : escapeHtml(t.expiredHint)
          }</p>
        </section>
        <section class="preview" aria-label="${escapeHtml(t.previewLabel)}">
          <article
            class="post-card"
            style="--category-color: ${categoryColorHtml}; --category-ink: ${categoryInkHtml}; --category-soft: ${categorySoftHtml}; --category-border: ${categoryBorderHtml}; --category-shadow: ${categoryShadowHtml};"
          >
            <div class="post-topline"></div>
            <div class="post-body">
              <div class="post-header">
                <div class="avatar">
                  ${avatarUrl ? `<img src="${avatarUrl}" alt="" />` : `<span>${avatarInitials}</span>`}
                </div>
                <div class="author">
                  <strong>${authorName}</strong>
                  <span>${username || 'MUR'}</span>
                </div>
              </div>
              ${hasPostText ? `<p class="post-text">${postText}</p>` : ''}
              ${
                hasPoll
                  ? `<div class="poll-card">
                <div class="poll-header">
                  <span class="poll-title"><span class="poll-dot">%</span> ${escapeHtml(t.poll)}</span>
                  <span class="poll-total">${escapeHtml(formatVoteCount(pollTotalVotes, t))}</span>
                </div>
                <p class="poll-question">${pollQuestion}</p>
                ${pollOptionsHtml ? `<div class="poll-options">${pollOptionsHtml}</div>` : ''}
                <p class="poll-cta">${escapeHtml(t.pollCta)}</p>
              </div>`
                  : ''
              }
              ${
                hasAudio
                  ? `<div class="audio-card">
                <div class="audio-header">
                  <span class="audio-title"><span class="audio-dot" aria-hidden="true"></span> ${escapeHtml(t.audio)}</span>
                  <span class="audio-duration">${escapeHtml(audioDuration)}</span>
                </div>
                <audio controls preload="metadata">
                  <source src="${audioUrl}" type="${audioMimeType}" />
                  ${escapeHtml(t.audioUnsupported)}
                </audio>
              </div>`
                  : ''
              }
              ${hasImage ? `<img class="post-image" src="${image}" alt="${title}" />` : ''}
              <div class="post-meta">
                <span class="category-chip">
                  <span class="category-mark" aria-hidden="true"></span>
                  ${categoryLabel}
                </span>
                <span class="meta-dot">·</span>
                <span class="media-label">${mediaLabel}</span>
                ${expirationChipHtml ? `<span class="meta-dot">·</span>${expirationChipHtml}` : ''}
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
    ${
      hasExpiration
        ? `<script>
      (function () {
        var minuteMs = 60000;
        var chips = document.querySelectorAll('[data-expires-at]');
        if (!chips.length) return;

        function formatChip(chip) {
          var expiresAt = Date.parse(chip.getAttribute('data-expires-at') || '');
          if (!isFinite(expiresAt)) return '';

          var remainingMs = expiresAt - Date.now();
          if (remainingMs <= 0) return chip.getAttribute('data-expired-text') || '';
          if (remainingMs < minuteMs) {
            return (chip.getAttribute('data-expires-prefix') || '') + ' ' + (chip.getAttribute('data-less-than-minute') || '');
          }

          var totalMinutes = Math.ceil(remainingMs / minuteMs);
          var hours = Math.floor(totalMinutes / 60);
          var minutes = totalMinutes % 60;
          var parts = [];

          if (hours > 0) {
            parts.push(hours + ' ' + (chip.getAttribute('data-hour-unit') || 'h'));
          }

          if (minutes > 0 || hours === 0) {
            parts.push(minutes + ' ' + (chip.getAttribute('data-minute-unit') || 'min'));
          }

          return (chip.getAttribute('data-expires-prefix') || '') + ' ' + parts.join(' ');
        }

        function updateChips() {
          Array.prototype.forEach.call(chips, function (chip) {
            var target = chip.querySelector('[data-expiry-text]');
            var text = formatChip(chip);
            if (target && text) target.textContent = text;
          });
        }

        updateChips();
        window.setInterval(updateChips, minuteMs);
      })();
    </script>`
        : ''
    }
    ${
      appUrl
        ? `<script>
      window.setTimeout(function () {
        var isMobile = /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
        if (isMobile) window.location.href = '${appUrlJs}';
      }, 650);
    </script>`
        : ''
    }
  </body>
</html>`
}

export default async function handler(request, response) {
  const slug = request.query?.slug || ''
  const preferences = getRequestPreferences(request)

  try {
    const preview = await fetchSharedPostPreview(slug, request)

    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.setHeader('Cache-Control', getSharedPostCacheControl(preview))
    response
      .status(preview.found ? 200 : 404)
      .send(renderSharedPostHtml(preview, { ...preferences, request }))
  } catch (error) {
    console.error('[post-preview] failed', error)

    const fallback = {
      found: false,
      shareSlug: String(slug || ''),
      url: `https://mur.olvidaftech.com/p/${encodeURIComponent(String(slug || ''))}`,
      title: 'Post en MUR',
      description: 'Abrilo en MUR para verlo.',
      image: 'https://mur.olvidaftech.com/logo.png',
      imageWidth: 1024,
      imageHeight: 1024,
      categoryLabels: {
        es: 'General',
        en: 'General',
      },
    }

    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.setHeader('Cache-Control', 'public, s-maxage=60')
    response.status(200).send(renderSharedPostHtml(fallback, { ...preferences, request }))
  }
}
