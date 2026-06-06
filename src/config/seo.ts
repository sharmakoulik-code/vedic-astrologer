export const SEO_CONFIG = {
  baseUrl: 'https://vedic-astrologer.com',
  siteName: 'VedicAstrologer',
  defaultTitle: 'VedicAstrologer | Personalized Vedic Astrology & Life Destiny Report',
  defaultDescription:
    'Discover your cosmic blueprint with VedicAstrologer. Get personalized Vedic astrology readings, birth chart analysis, career predictions, and life guidance based on ancient Jyotish principles.',
  defaultImage: 'https://vedic-astrologer.com/og-image.jpg',
  twitter: '@vedic_astrologer',
  locale: 'en_US',
};

export const PAGES_SEO = {
  home: {
    title: 'VedicAstrologer | Personalized Vedic Astrology & Life Destiny Report',
    description:
      'Unlock your cosmic destiny with AI-powered Vedic astrology. Get detailed birth chart readings, personality insights, career predictions, love & marriage guidance, and remedies.',
    keywords:
      'vedic astrology, jyotish, birth chart, natal chart, astrology reading, horoscope, destiny, cosmic blueprint, life prediction',
    path: '/',
  },
  report: {
    title: (name: string) =>
      `${name}'s Vedic Astrology Report | VedicAstrologer`,
    description: (name: string) =>
      `Your personalized Vedic astrology report. Comprehensive birth chart analysis, personality insights, career predictions, and destiny guidance for ${name}.`,
    keywords: 'astrology report, birth chart, vedic astrology, personal reading',
    path: '/#report',
  },
};

export const generateMetaTags = (page: 'home' | 'report', pageData?: any) => {
  const config = PAGES_SEO[page];
  const title =
    typeof config.title === 'function' ? config.title(pageData?.name || 'Your') : config.title;
  const description =
    typeof config.description === 'function'
      ? config.description(pageData?.name || 'Your')
      : config.description;

  return {
    title,
    description,
    keywords: config.keywords || undefined,
    canonical: `${SEO_CONFIG.baseUrl}${config.path}`,
    ogTitle: title,
    ogDescription: description,
    ogImage: SEO_CONFIG.defaultImage,
    ogUrl: `${SEO_CONFIG.baseUrl}${config.path}`,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: SEO_CONFIG.defaultImage,
  };
};
