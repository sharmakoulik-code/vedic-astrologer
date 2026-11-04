import { getCanonicalUrl, SITE_BASE_URL } from '../seo/site';

export const SEO_CONFIG = {
  baseUrl: SITE_BASE_URL,
  siteName: 'VedicAstrologer',
  defaultTitle: 'VedicAstrologer | Vedic Astrology Reading',
  defaultDescription:
    'Explore planetary positions interpreted with Lahiri ayanamsa and whole-sign houses. Readings are for guidance and entertainment only.',
  defaultImage: `${SITE_BASE_URL}/og-image.png`,
  locale: 'en_US',
  themeColor: '#141b2d',
};

export const PAGES_SEO = {
  home: {
    title: 'VedicAstrologer | Vedic Astrology Reading',
    description:
      'Explore planetary positions interpreted with Lahiri ayanamsa and whole-sign houses. Readings are for guidance and entertainment only.',
    path: '/',
  },
  report: {
    title: (name: string) =>
      `${name}'s Vedic Astrology Report | VedicAstrologer`,
    description: (name: string) =>
      `A Vedic astrology reading for ${name}, using Lahiri ayanamsa and whole-sign houses. For guidance and entertainment only.`,
    path: '/',
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
  return {
    title,
    description,
    canonical: canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: SEO_CONFIG.defaultImage,
    ogUrl: canonicalUrl,
    ogSiteName: SEO_CONFIG.siteName,
    ogLocale: SEO_CONFIG.locale,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: SEO_CONFIG.defaultImage,
    themeColor: SEO_CONFIG.themeColor,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  };
};
