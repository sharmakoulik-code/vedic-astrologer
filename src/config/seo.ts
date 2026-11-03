import { getCanonicalUrl, getSiteBaseUrl } from '../seo/site';

export const SEO_CONFIG = {
  baseUrl: getSiteBaseUrl(),
  siteName: 'VedicAstrologer',
  defaultTitle: 'VedicAstrologer | Personalized Vedic Astrology & Life Destiny Report',
  defaultDescription:
    'Discover your cosmic blueprint with VedicAstrologer. Get personalized Vedic astrology readings, birth chart analysis, career predictions, and life guidance based on ancient Jyotish principles.',
  defaultImage: '/og-image.svg',
  twitter: '@vedic_astrologer',
  locale: 'en_US',
  themeColor: '#141b2d',
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

  const canonicalUrl = getCanonicalUrl(config.path);
  const absoluteImage = SEO_CONFIG.baseUrl
    ? `${SEO_CONFIG.baseUrl}${SEO_CONFIG.defaultImage}`
    : SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    keywords: config.keywords || undefined,
    canonical: canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: absoluteImage,
    ogUrl: canonicalUrl,
    ogSiteName: SEO_CONFIG.siteName,
    ogLocale: SEO_CONFIG.locale,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: absoluteImage,
    twitterSite: SEO_CONFIG.twitter,
    twitterCreator: SEO_CONFIG.twitter,
    themeColor: SEO_CONFIG.themeColor,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  };
};
