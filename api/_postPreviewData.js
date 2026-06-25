const MEDIA_ONLY_CONTENT_PLACEHOLDER = '__mur_media_only__'
const POLL_CONTENT_PLACEHOLDER = '__mur_poll__'
const POST_EXPIRATION_MS = 24 * 60 * 60 * 1000

const DEFAULT_CATEGORY = {
  slug: 'general',
  labels: {
    es: 'General',
    en: 'General',
  },
  color: '#8F91A4',
  icon: 'chatbubble-ellipses-outline',
}

const getSupabaseConfig = () => {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.EXPO_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  return { url, key }
}

const normalizeBaseUrl = (request) => {
  const host = request.headers['x-forwarded-host'] || request.headers.host
  const protocol = request.headers['x-forwarded-proto'] || 'https'
  return `${protocol}://${host}`
}

const supabaseFetch = async (path) => {
  const { url, key } = getSupabaseConfig()

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase request failed with ${response.status}`)
  }

  return response.json()
}

const supabaseRpc = async (name, body) => {
  const { url, key } = getSupabaseConfig()

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Supabase RPC ${name} failed with ${response.status}`)
  }

  return response.json()
}

const encodeFilterValue = (value) =>
  encodeURIComponent(String(value).replace(/"/g, ''))

const normalizePostContent = (content) => {
  const text = String(content || '').trim()
  if (text === MEDIA_ONLY_CONTENT_PLACEHOLDER || text === POLL_CONTENT_PLACEHOLDER) {
    return ''
  }

  return text
}

const truncate = (value, maxLength) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}...`
}

const firstRow = (rows) => (Array.isArray(rows) && rows.length > 0 ? rows[0] : null)

const getPostExpirationIso = (createdAt) => {
  const createdAtMs = Date.parse(createdAt)
  if (!Number.isFinite(createdAtMs)) return null

  return new Date(createdAtMs + POST_EXPIRATION_MS).toISOString()
}

const humanizeSlug = (slug) =>
  String(slug || '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const normalizeTranslations = (translations) => {
  if (!Array.isArray(translations)) return {}

  return translations.reduce((result, translation) => {
    if (translation?.language_code && translation?.display_name) {
      result[translation.language_code] = translation.display_name
    }

    return result
  }, {})
}

const getCategoryLabel = (category) => {
  const labels = getCategoryLabels(category)
  return labels.es || labels.en || DEFAULT_CATEGORY.labels.es
}

const getCategoryLabels = (category) => {
  const translations = normalizeTranslations(category?.translations)
  const fallback = humanizeSlug(category?.slug) || DEFAULT_CATEGORY.labels.es

  return {
    es: translations.es || translations.en || fallback,
    en: translations.en || translations.es || fallback,
  }
}

const fetchPollPreview = async (poll) => {
  if (!poll?.id) return null

  const [optionsRows, summaryRows] = await Promise.all([
    supabaseFetch(
      `post_poll_options?select=id,poll_id,option_text,sort_order&poll_id=eq.${encodeFilterValue(
        poll.id,
      )}&order=sort_order.asc`,
    ).catch(() => []),
    supabaseRpc('get_post_poll_vote_summary', { _poll_ids: [poll.id] }).catch(() => []),
  ])

  const votesByOptionId = new Map()
  ;(Array.isArray(summaryRows) ? summaryRows : []).forEach((summary) => {
    if (summary?.option_id) {
      votesByOptionId.set(String(summary.option_id), Number(summary.votes_count ?? 0))
    }
  })

  const options = (Array.isArray(optionsRows) ? optionsRows : []).map((option, index) => ({
    id: String(option.id),
    text: option.option_text,
    sortOrder: Number(option.sort_order ?? index),
    votesCount: votesByOptionId.get(String(option.id)) ?? 0,
  }))
  const totalVotes = options.reduce((total, option) => total + option.votesCount, 0)

  return {
    id: String(poll.id),
    question: poll.question,
    options,
    totalVotes,
  }
}

export const fetchSharedPostPreview = async (shareSlug, request) => {
  const normalizedSlug = String(shareSlug || '').trim()
  const baseUrl = normalizeBaseUrl(request)

  if (!normalizedSlug) {
    return {
      found: false,
      shareSlug: '',
      url: `${baseUrl}/`,
      title: 'MUR',
      description: 'Abrí este post en MUR.',
      image: `${baseUrl}/logo.png`,
      imageWidth: 1024,
      imageHeight: 1024,
      category: DEFAULT_CATEGORY.slug,
      categoryLabel: DEFAULT_CATEGORY.labels.es,
      categoryLabels: DEFAULT_CATEGORY.labels,
      categoryColor: DEFAULT_CATEGORY.color,
      categoryIcon: DEFAULT_CATEGORY.icon,
    }
  }

  const post = firstRow(
    await supabaseFetch(
      `posts?select=id,share_slug,content,created_at,author_id,category_id,post_type&share_slug=eq.${encodeFilterValue(
        normalizedSlug,
      )}&deleted_at=is.null&limit=1`,
    ),
  )

  if (!post) {
    return {
      found: false,
      shareSlug: normalizedSlug,
      url: `${baseUrl}/p/${encodeURIComponent(normalizedSlug)}`,
      title: 'Post en MUR',
      description: 'Este post ya no esta disponible o expiro.',
      image: `${baseUrl}/logo.png`,
      imageWidth: 1024,
      imageHeight: 1024,
      category: DEFAULT_CATEGORY.slug,
      categoryLabel: DEFAULT_CATEGORY.labels.es,
      categoryLabels: DEFAULT_CATEGORY.labels,
      categoryColor: DEFAULT_CATEGORY.color,
      categoryIcon: DEFAULT_CATEGORY.icon,
    }
  }

  const [profile, media, category, poll] = await Promise.all([
    supabaseFetch(
      `profiles?select=id,username,display_name,avatar_url&id=eq.${encodeFilterValue(
        post.author_id,
      )}&limit=1`,
    )
      .then(firstRow)
      .catch(() => null),
    supabaseFetch(
      `post_media?select=media_type,public_url,mime_type,duration_seconds,width,height,sort_order&post_id=eq.${encodeFilterValue(
        post.id,
      )}&order=sort_order.asc&limit=1`,
    )
      .then(firstRow)
      .catch(() => null),
    post.category_id
      ? supabaseFetch(
          `post_categories?select=slug,icon,color,translations:post_category_translations(language_code,display_name)&id=eq.${encodeFilterValue(post.category_id)}&limit=1`,
        )
          .then(firstRow)
          .catch(() => null)
      : Promise.resolve(null),
    supabaseFetch(
      `post_polls?select=id,question&post_id=eq.${encodeFilterValue(post.id)}&limit=1`,
    )
      .then(firstRow)
      .catch(() => null),
  ])
  const pollPreview = await fetchPollPreview(poll)

  const authorName =
    profile?.display_name ||
    profile?.username ||
    (profile?.id ? `Vecino ${String(profile.id).slice(0, 4)}` : 'Alguien')
  const postText = normalizePostContent(post.content)
  const categoryLabel = getCategoryLabel(category)
  const categoryLabels = getCategoryLabels(category)
  const description =
    postText ||
    poll?.question ||
    (media?.media_type === 'audio'
      ? 'Audio compartido en MUR.'
      : media?.media_type === 'image'
        ? 'Imagen compartida en MUR.'
        : 'Post compartido en MUR.')
  const image =
    media?.media_type === 'image' && media?.public_url
      ? media.public_url
      : `${baseUrl}/logo.png`
  const imageWidth =
    media?.media_type === 'image' && Number.isFinite(Number(media?.width))
      ? Number(media.width)
      : 1024
  const imageHeight =
    media?.media_type === 'image' && Number.isFinite(Number(media?.height))
      ? Number(media.height)
      : 1024

  return {
    found: true,
    shareSlug: normalizedSlug,
    url: `${baseUrl}/p/${encodeURIComponent(normalizedSlug)}`,
    appUrl: `myapp://p/${encodeURIComponent(normalizedSlug)}`,
    createdAt: post.created_at,
    expiresAt: getPostExpirationIso(post.created_at),
    title: truncate(`${authorName} en MUR`, 90),
    description: truncate(description, 180),
    image,
    imageWidth,
    imageHeight,
    authorName: truncate(authorName, 80),
    username: profile?.username ? `@${profile.username}` : '',
    avatarUrl: profile?.avatar_url || '',
    category: category?.slug || DEFAULT_CATEGORY.slug,
    categoryLabel,
    categoryLabels,
    categoryColor: category?.color || DEFAULT_CATEGORY.color,
    categoryIcon: category?.icon || DEFAULT_CATEGORY.icon,
    postText: truncate(postText, 220),
    hasImage: media?.media_type === 'image' && Boolean(media?.public_url),
    audio:
      media?.media_type === 'audio' && media?.public_url
        ? {
            url: media.public_url,
            mimeType: media.mime_type || 'audio/mp4',
            durationSeconds:
              media.duration_seconds === null || media.duration_seconds === undefined
                ? null
                : Number(media.duration_seconds),
          }
        : null,
    poll: pollPreview,
    mediaType: media?.media_type || post.post_type || 'post',
  }
}
