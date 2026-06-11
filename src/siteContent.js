export const BRAND = {
  name: 'MUR',
  supportEmail: 'olvidaftech.mur@gmail.com',
  instagramHandle: '@mur.app',
  instagramUrl: 'https://www.instagram.com/mur.app/',
  waitlistUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScwxuzkjEmtgk1ROL8GavoUmQRZffgaRVWlX8ro2GOpU2tIgQ/viewform?usp=dialog',
}

export const LANGUAGES = ['es', 'en']
export const THEMES = ['light', 'dark']

export const THEME = {
  light: {
    marketingPage: 'bg-brand-paper text-brand-ink',
    legalPage: 'bg-brand-paper text-brand-ink',
    nav: 'border-brand-ink/10 bg-brand-paper/90 backdrop-blur-xl',
    navNarrow: 'border-brand-ink/10 bg-brand-paper/95 backdrop-blur-xl',
    navText: 'text-brand-ink/70 hover:text-brand-ink',
    navTextNarrow: 'text-brand-ink/70 hover:text-brand-ink',
    navLink:
      'border-brand-ink/10 bg-white/70 text-brand-ink shadow-sm hover:border-brand-amber/60 hover:bg-white',
    navLinkNarrow:
      'border-brand-ink/10 bg-white/70 text-brand-ink hover:border-brand-amber/60 hover:bg-white',
    menuPanel: 'border-brand-ink/10 bg-white shadow-soft',
    logoText: 'text-brand-ink',
    text: 'text-brand-ink',
    muted: 'text-brand-ink/70',
    border: 'border-brand-ink/10',
    surface: 'border-brand-ink/10 bg-white/[0.78] shadow-soft backdrop-blur-sm',
    softSurface: 'border-brand-ink/10 bg-brand-paper-soft/80',
    insetSurface: 'border-brand-ink/10 bg-white/70',
    warmSurface: 'border-brand-amber/20 bg-brand-sun/80',
    tealSurface: 'border-brand-teal/20 bg-brand-river/80',
    greenSurface: 'border-brand-green/20 bg-brand-leaf/75',
    legalBorder: 'border-brand-ink/10',
    legalMuted: 'text-brand-ink/70',
    legalSoft: 'border-brand-ink/10 bg-white/75 text-brand-ink',
    previewScreen: 'border-brand-ink/10 bg-brand-paper text-brand-ink',
    previewTile: 'bg-white text-brand-ink shadow-sm',
    previewMap: 'border-brand-ink/10 bg-brand-river',
    previewPost: 'border-brand-ink/10 bg-white text-brand-ink shadow-sm',
    previewMuted: 'text-brand-ink/55',
    mapGrid: 'map-grid map-grid-light',
    primaryButton:
      'bg-brand-ink text-brand-paper hover:bg-brand-charcoal focus-visible:ring-brand-amber/80',
    secondaryButton:
      'border-brand-ink/15 bg-white/70 text-brand-ink hover:border-brand-teal/50 hover:bg-white',
    activeControl: 'border-brand-ink bg-brand-ink text-brand-paper',
    inactiveControl: 'border-transparent text-brand-ink/70 hover:text-brand-ink',
    legalDivide: 'divide-brand-ink/10',
  },
  dark: {
    marketingPage: 'bg-brand-blue text-brand-cream-light',
    legalPage: 'bg-brand-blue-deep text-brand-cream-light',
    nav: 'border-brand-cream/15 bg-brand-blue-deep/95 backdrop-blur-xl',
    navNarrow: 'border-brand-cream/15 bg-brand-blue-deep/95 backdrop-blur-xl',
    navText: 'text-brand-cream/80 hover:text-brand-cream-light',
    navTextNarrow: 'text-brand-cream/80 hover:text-brand-cream-light',
    navLink:
      'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light hover:border-brand-amber/70 hover:bg-brand-cream/[0.1]',
    navLinkNarrow:
      'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light hover:border-brand-amber/70 hover:bg-brand-cream/[0.1]',
    menuPanel: 'border-brand-cream/15 bg-brand-blue-deep shadow-soft-dark',
    logoText: 'text-brand-amber',
    text: 'text-brand-cream-light',
    muted: 'text-brand-cream/85',
    border: 'border-brand-cream/15',
    surface: 'border-brand-cream/15 bg-brand-blue-panel/95 shadow-soft-dark',
    softSurface: 'border-brand-cream/15 bg-brand-blue-soft/90',
    insetSurface: 'border-brand-cream/15 bg-brand-cream/[0.06]',
    warmSurface: 'border-brand-amber/35 bg-brand-blue-panel/90',
    tealSurface: 'border-brand-teal/30 bg-brand-blue-panel/90',
    greenSurface: 'border-brand-green/30 bg-brand-blue-panel/90',
    legalBorder: 'border-brand-cream/15',
    legalMuted: 'text-brand-cream/85',
    legalSoft: 'border-brand-cream/15 bg-brand-cream/[0.06] text-brand-cream-light',
    previewScreen: 'border-brand-cream/15 bg-brand-blue text-brand-cream-light',
    previewTile: 'border border-brand-cream/10 bg-brand-blue-panel text-brand-cream-light',
    previewMap: 'border-brand-cream/10 bg-brand-blue-deep',
    previewPost: 'border-brand-cream/[0.12] bg-brand-blue-panel text-brand-cream-light',
    previewMuted: 'text-brand-cream/65',
    mapGrid: 'map-grid map-grid-dark',
    primaryButton:
      'bg-brand-amber text-brand-blue hover:bg-brand-amber-deep focus-visible:ring-brand-cream-light/80',
    secondaryButton:
      'border-brand-cream/20 bg-brand-cream/[0.06] text-brand-cream-light hover:border-brand-amber/60 hover:bg-brand-cream/[0.1]',
    activeControl: 'border-brand-cream-light bg-brand-cream-light text-brand-blue',
    inactiveControl: 'border-transparent text-brand-cream/75 hover:text-white',
    legalDivide: 'divide-brand-cream/15',
  },
}

const privacySectionsEs = [
  {
    title: 'Datos que recopilamos',
    body:
      'MUR puede recopilar email, nombre de usuario, perfil público, publicaciones, comentarios, likes, reportes, bloqueos, preferencias, tokens de notificaciones y ubicación usada para mostrar contenido cercano.',
  },
  {
    title: 'Uso de ubicación',
    body:
      'La ubicación se usa para mostrar publicaciones cercanas, publicar contenido con contexto y enviar alertas cercanas opcionales. Compartir la ubicación exacta de una publicación es opcional.',
  },
  {
    title: 'Seguridad y moderación',
    body:
      'Los reportes y bloqueos ayudan a revisar contenido inseguro, reducir abuso y mejorar la seguridad de la comunidad.',
  },
  {
    title: 'Eliminación de cuenta',
    body:
      'Podés eliminar tu cuenta desde la app entrando a Perfil, luego Cuenta, y tocando Eliminar cuenta. También podés solicitar eliminación desde la página pública de eliminación de cuenta.',
  },
]

const privacySectionsEn = [
  {
    title: 'Data we collect',
    body:
      'MUR may collect email, username, public profile, posts, comments, likes, reports, blocks, preferences, notification tokens, and location used to show nearby content.',
  },
  {
    title: 'Location use',
    body:
      'Location is used to show nearby posts, publish with context, and send optional nearby alerts. Sharing an exact post location is optional.',
  },
  {
    title: 'Safety and moderation',
    body:
      'Reports and blocks help us review unsafe content, reduce abuse, and improve community safety.',
  },
  {
    title: 'Account deletion',
    body:
      'You can delete your account in the app from Profile, then Account, then Delete account. You can also request deletion from the public account deletion page.',
  },
]

const termsSectionsEs = [
  {
    title: 'Uso de la app',
    body:
      'MUR está pensada para personas de 18 años o más. Debés usar la app de forma legal, segura y respetuosa, sin publicar contenido falso, abusivo, discriminatorio, violento, sexualmente explícito, ilegal o que vulnere derechos de terceros.',
  },
  {
    title: 'Contenido publicado',
    body:
      'Sos responsable por el contenido que publicás, incluyendo textos, imágenes, audio, encuestas y ubicaciones compartidas. Al publicar, nos autorizás a mostrar ese contenido dentro de MUR para operar la app y sus funciones.',
  },
  {
    title: 'Ubicación y actividad cercana',
    body:
      'MUR usa ubicación para mostrar contenido cercano y permitir publicaciones locales. Compartir la ubicación exacta en una publicación es opcional. No uses la ubicación o actividad de otras personas para acosar, seguir o dañar.',
  },
  {
    title: 'Moderación y seguridad',
    body:
      'Podemos revisar, ocultar o eliminar contenido, limitar funciones o suspender cuentas cuando detectemos abuso, riesgos de seguridad, incumplimientos legales o violaciones de estos términos.',
  },
  {
    title: 'Cuenta y eliminación',
    body:
      'Podés cerrar sesión o eliminar tu cuenta desde la app. La eliminación de cuenta borra los datos asociados según se describe en la política de privacidad y en la página pública de eliminación de cuenta.',
  },
]

const termsSectionsEn = [
  {
    title: 'Using the app',
    body:
      'MUR is intended for people aged 18 or older. You must use the app legally, safely, and respectfully, without posting false, abusive, discriminatory, violent, sexually explicit, illegal, or rights-infringing content.',
  },
  {
    title: 'Published content',
    body:
      'You are responsible for the content you publish, including text, images, audio, polls, and shared locations. By publishing, you allow us to show that content inside MUR to operate the app and its features.',
  },
  {
    title: 'Location and nearby activity',
    body:
      'MUR uses location to show nearby content and enable local posts. Sharing an exact post location is optional. Do not use another person’s location or activity to harass, track, or harm them.',
  },
  {
    title: 'Moderation and safety',
    body:
      'We may review, hide, or remove content, limit features, or suspend accounts when we detect abuse, safety risks, legal issues, or violations of these terms.',
  },
  {
    title: 'Account and deletion',
    body:
      'You can sign out or delete your account from the app. Account deletion removes associated data as described in the privacy policy and the public account deletion page.',
  },
]

export const CONTENT = {
  es: {
    locale: 'es-AR',
    meta: {
      title: 'MUR | Lo que pasa cerca importa',
      description:
        'MUR es una app hiperlocal para enterarte, publicar y ayudar con alertas, comercios y novedades cercanas.',
    },
    nav: {
      menu: 'Menú',
      howItWorks: 'Cómo funciona',
      waitlist: 'Lista de espera',
      privacy: 'Política de privacidad',
      terms: 'Términos del servicio',
      deleteAccount: 'Eliminar cuenta y datos',
    },
    controls: {
      language: 'Idioma',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
    },
    footer: {
      tagline: 'Comunidad cerca tuyo.',
      privacy: 'Privacidad',
      terms: 'Términos',
      deleteAccount: 'Eliminar cuenta y datos',
      email: 'Email',
    },
    home: {
      heroBadge: 'Muy pronto',
      title: 'Lo que pasa cerca importa.',
      body:
        'Mascotas perdidas, alertas, accidentes, promos de comercios y novedades cercanas, todo cerca tuyo y con contexto.',
      primaryCta: 'Sumarme a la lista',
      mascotAlt: 'OLVI, la mascota de MUR',
      mascotLabel: 'OLVI está preparando una app para que lo cercano se entienda mejor.',
      previewEyebrow: 'Vista de producto',
      previewTitle: 'Un feed local que no se siente como ruido.',
      previewBody:
        'Publicaciones cercanas, mapa, filtros por categoría y comentarios para resolver cosas concretas entre vecinos.',
      previewSearch: 'Buscar',
      previewAuthor: 'Usuario cercano',
      previewImageLabel: 'Imagen',
      previewAudioLabel: 'Audio',
      previewMapTitle: 'Mapa cercano',
      previewMapSubtitle: 'Posts con ubicación compartida',
      previewMapBadge: '3 posts',
      useCasesLabel: 'Usos cotidianos',
      useCasesTitle: 'Hecha para lo que sí pasa cerca',
      productLabel: 'Cómo se ve',
      productTitle: 'Publicá con contexto, sin regalar más ubicación de la necesaria',
      productBody:
        'Cada publicación puede mostrar una ubicación aproximada o exacta. Las categorías ayudan a recibir menos ruido y más avisos útiles.',
      stepsLabel: 'Cómo funciona',
      stepsTitle: 'Tres pasos, sin vueltas',
      waitlistLabel: 'Lista de espera',
      waitlistTitle: 'Sumate a la primera comunidad MUR',
      waitlistBody:
        'Completá el formulario de espera. Vamos a abrir gradualmente para que la experiencia arranque con actividad útil desde el primer día.',
      faqLabel: 'Preguntas frecuentes',
      faqTitle: 'Lo básico, claro',
      fictionalNote: 'Ejemplos ficticios para mostrar el uso del producto.',
    },
    useCases: [
      {
        title: 'Mascotas perdidas',
        body:
          'Avisos cercanos con foto, referencia aproximada y comentarios para coordinar ayuda rápido.',
      },
      {
        title: 'Tránsito y accidentes',
        body:
          'Alertas útiles para circular con cuidado, evitar una calle o avisar a quien viene cerca.',
      },
      {
        title: 'Comercios cercanos',
        body:
          'Promos del día, horarios especiales y novedades vistas por gente que está cerca.',
      },
      {
        title: 'Ayuda entre vecinos',
        body:
          'Objetos encontrados, consultas rápidas y pedidos concretos con contexto cercano.',
      },
    ],
    samplePosts: [
      {
        category: 'Mascotas',
        title: 'Perro marrón visto cerca de una plaza',
        time: '15m',
        distance: '~100 m',
        meta: 'A 350 m · ubicación aproximada',
      },
      {
        category: 'Alerta',
        title: 'Choque cerca, circular con cuidado',
        time: '29m',
        distance: '~100 m',
        meta: 'A 700 m · comentarios activos',
      },
      {
        category: 'Comercio',
        title: 'Panadería cercana con promo hoy',
        time: '30m',
        distance: '~100 m',
        meta: 'A 1,1 km · publicación cercana',
      },
    ],
    previewStats: ['Feed cerca tuyo', 'Mapa activo', 'Filtros por categoría'],
    productPoints: [
      'Feed cercano con publicaciones recientes.',
      'Mapa con actividad cercana.',
      'Filtros para mascotas, alertas, comercios y novedades.',
      'Comentarios y likes para coordinar sin salir de la app.',
    ],
    steps: [
      {
        title: 'Entrá a MUR',
        body:
          'MUR ordena la experiencia alrededor de donde vivís, trabajás o te movés todos los días.',
      },
      {
        title: 'Mirá qué pasa cerca',
        body:
          'Revisá publicaciones, alertas y comercios desde el feed o el mapa.',
      },
      {
        title: 'Publicá con contexto',
        body:
          'Elegí categoría, sumá detalles y decidí si compartís ubicación exacta o aproximada.',
      },
    ],
    faq: [
      {
        question: '¿Qué es MUR?',
        answer:
          'Una app hiperlocal para enterarte, publicar y conversar sobre cosas que pasan cerca tuyo.',
      },
      {
        question: '¿Qué puedo publicar?',
        answer:
          'Alertas, mascotas perdidas, objetos encontrados, novedades, consultas, promos de comercios y otras publicaciones útiles.',
      },
      {
        question: '¿La ubicación exacta es obligatoria?',
        answer:
          'No. Podés usar ubicación aproximada y compartir un punto exacto solo cuando tenga sentido.',
      },
      {
        question: '¿Cómo funcionan las alertas?',
        answer:
          'Las alertas se filtran por cercanía y categoría para que recibas menos ruido y más información útil.',
      },
      {
        question: '¿Cómo se cuida la seguridad?',
        answer:
          'Con reportes, bloqueos, categorías, ubicación exacta opcional y moderación cuando haga falta.',
      },
    ],
    legal: {
      back: 'Volver',
      effective: 'Vigente desde el 2 de junio de 2026',
      title: 'Política de privacidad',
      intro:
        'MUR es una app de comunidad local. Esta política explica qué datos de la app recopilamos, por qué los usamos y cómo los usuarios pueden eliminar su cuenta y datos asociados.',
      sections: privacySectionsEs,
    },
    terms: {
      back: 'Volver',
      effective: 'Vigente desde el 4 de junio de 2026',
      title: 'Términos del servicio',
      intro:
        'Estos términos regulan el uso de MUR, una app de comunidad local para publicar, descubrir y comentar contenido cercano. Al usar MUR, aceptás participar de forma responsable y respetar estas reglas.',
      sections: termsSectionsEs,
    },
    deleteAccount: {
      badge: 'Cuenta y eliminación de datos',
      title: 'Eliminá tu cuenta de MUR',
      intro:
        'Para eliminar tu cuenta desde la app, abrí MUR, entrá a Perfil, luego Cuenta, y tocá Eliminar cuenta.',
      deletedTitle: 'Qué se elimina',
      deletedBody:
        'La eliminación borra tu perfil, publicaciones, comentarios, likes, tokens de notificaciones, ubicación cercana usada para alertas, reportes y registros de bloqueo asociados a tu cuenta.',
      noAccessTitle: 'Si ya no tenés acceso a la app',
      noAccessBody:
        'Escribinos desde el email asociado a tu cuenta y pedinos la eliminación de cuenta y datos. Usamos ese email para verificar la titularidad antes de procesar la solicitud.',
      mailSubject: 'Solicitud de eliminación de cuenta MUR',
    },
    resetPassword: {
      back: 'Volver',
      badge: 'Seguridad de la cuenta',
      title: 'Abrir MUR para cambiar tu contraseña',
      intro:
        'Estamos abriendo la app para que puedas elegir una nueva contraseña de forma segura.',
      button: 'Abrir MUR',
      fallback:
        'Si la app no se abre automáticamente, tocá el botón. Este enlace solo es válido por un tiempo limitado.',
      invalid:
        'El enlace de recuperación no es válido o ya no contiene la información necesaria. Volvé a solicitar un nuevo email desde la app.',
    },
  },
  en: {
    locale: 'en-US',
    meta: {
      title: 'MUR | What happens nearby matters',
      description:
        'MUR is a hyperlocal app for nearby alerts, posts, shops, and local updates.',
    },
    nav: {
      menu: 'Menu',
      howItWorks: 'How it works',
      waitlist: 'Waitlist',
      privacy: 'Privacy policy',
      terms: 'Terms of service',
      deleteAccount: 'Delete account and data',
    },
    controls: {
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    footer: {
      tagline: 'Community around you.',
      privacy: 'Privacy',
      terms: 'Terms',
      deleteAccount: 'Delete account and data',
      email: 'Email',
    },
    home: {
      heroBadge: 'Coming soon',
      title: 'What happens nearby matters.',
      body:
        'Lost pets, alerts, accidents, local shop promos, and nearby updates, all close to you and with useful context.',
      primaryCta: 'Join the waitlist',
      mascotAlt: 'OLVI, the MUR mascot',
      mascotLabel: 'OLVI is preparing an app that helps nearby life feel easier to understand.',
      previewEyebrow: 'Product preview',
      previewTitle: 'A local feed that does not feel like noise.',
      previewBody:
        'Nearby posts, map activity, category filters, and comments for practical coordination between neighbors.',
      previewSearch: 'Search',
      previewAuthor: 'Nearby user',
      previewImageLabel: 'Image',
      previewAudioLabel: 'Audio',
      previewMapTitle: 'Nearby map',
      previewMapSubtitle: 'Posts with shared location',
      previewMapBadge: '3 posts',
      useCasesLabel: 'Everyday uses',
      useCasesTitle: 'Built for what actually happens nearby',
      productLabel: 'How it looks',
      productTitle: 'Post with context without sharing more location than needed',
      productBody:
        'Each post can use approximate or exact location. Categories help you receive less noise and more useful alerts.',
      stepsLabel: 'How it works',
      stepsTitle: 'Three simple steps',
      waitlistLabel: 'Waitlist',
      waitlistTitle: 'Join the first MUR community',
      waitlistBody:
        'Complete the waitlist form. We will open gradually so the first experience starts with useful local activity.',
      faqLabel: 'FAQ',
      faqTitle: 'The basics, clearly',
      fictionalNote: 'Fictional examples shown to explain the product.',
    },
    useCases: [
      {
        title: 'Lost pets',
        body:
          'Nearby posts with photos, approximate references, and comments to coordinate help quickly.',
      },
      {
        title: 'Traffic and accidents',
        body:
          'Useful alerts to move carefully, avoid a street, or warn someone nearby.',
      },
      {
        title: 'Local shops',
        body:
          'Daily promos, special hours, and updates seen by people who are close.',
      },
      {
        title: 'Neighbor help',
        body:
          'Found items, quick questions, and concrete requests with nearby context.',
      },
    ],
    samplePosts: [
      {
        category: 'Pets',
        title: 'Brown dog seen near a plaza',
        time: '15m',
        distance: '~100 m',
        meta: '350 m away · approximate location',
      },
      {
        category: 'Alert',
        title: 'Crash nearby, move carefully',
        time: '29m',
        distance: '~100 m',
        meta: '700 m away · active comments',
      },
      {
        category: 'Shop',
        title: 'Nearby bakery has a promo today',
        time: '30m',
        distance: '~100 m',
        meta: '1.1 km away · nearby post',
      },
    ],
    previewStats: ['Nearby feed', 'Active map', 'Category filters'],
    productPoints: [
      'Nearby feed with recent posts.',
      'Map with nearby activity.',
      'Filters for pets, alerts, shops, and updates.',
      'Comments and likes to coordinate inside the app.',
    ],
    steps: [
      {
        title: 'Open MUR',
        body:
          'MUR organizes the experience around where you live, work, or move every day.',
      },
      {
        title: 'See what is nearby',
        body:
          'Browse posts, alerts, and local shops from the feed or the map.',
      },
      {
        title: 'Post with context',
        body:
          'Choose a category, add details, and decide whether to share exact or approximate location.',
      },
    ],
    faq: [
      {
        question: 'What is MUR?',
        answer:
          'A hyperlocal app to discover, post, and talk about things happening near you.',
      },
      {
        question: 'What can I post?',
        answer:
          'Alerts, lost pets, found items, updates, questions, shop promos, and other useful posts.',
      },
      {
        question: 'Is exact location required?',
        answer:
          'No. You can use approximate location and share an exact point only when it makes sense.',
      },
      {
        question: 'How do alerts work?',
        answer:
          'Alerts are filtered by proximity and category so you get less noise and more useful information.',
      },
      {
        question: 'How is safety handled?',
        answer:
          'With reports, blocks, categories, optional exact location, and moderation when needed.',
      },
    ],
    legal: {
      back: 'Back',
      effective: 'Effective June 2, 2026',
      title: 'Privacy policy',
      intro:
        'MUR is a local community app. This policy explains what app data we collect, why we use it, and how users can delete their account and associated data.',
      sections: privacySectionsEn,
    },
    terms: {
      back: 'Back',
      effective: 'Effective June 4, 2026',
      title: 'Terms of service',
      intro:
        'These terms govern the use of MUR, a local community app for publishing, discovering, and commenting on nearby content. By using MUR, you agree to participate responsibly and follow these rules.',
      sections: termsSectionsEn,
    },
    deleteAccount: {
      badge: 'Account and data deletion',
      title: 'Delete your MUR account',
      intro:
        'To delete your account from the app, open MUR, go to Profile, then Account, and tap Delete account.',
      deletedTitle: 'What gets deleted',
      deletedBody:
        'Deletion removes your profile, posts, comments, likes, notification tokens, nearby location used for alerts, reports, and block records associated with your account.',
      noAccessTitle: 'If you no longer have app access',
      noAccessBody:
        'Email us from the address associated with your account and request account and data deletion. We use that email to verify ownership before processing the request.',
      mailSubject: 'MUR account deletion request',
    },
    resetPassword: {
      back: 'Back',
      badge: 'Account security',
      title: 'Open MUR to change your password',
      intro:
        'We are opening the app so you can choose a new password securely.',
      button: 'Open MUR',
      fallback:
        'If the app does not open automatically, tap the button. This link is only valid for a limited time.',
      invalid:
        'The recovery link is invalid or no longer contains the required information. Request a new email from the app.',
    },
  },
}
