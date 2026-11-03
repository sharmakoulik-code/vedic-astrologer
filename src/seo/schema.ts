import { getSiteBaseUrl } from './site';

const isValidStructuredDataUrl = (value?: string) => {
  if (!value) return false;
  return value.startsWith('http://') || value.startsWith('https://');
};

const safeUrl = (value?: string) => {
  if (isValidStructuredDataUrl(value)) {
    return value;
  }

  const base = getSiteBaseUrl();
  if (!base && !value) {
    return undefined;
  }

  if (!value) {
    return base || undefined;
  }

  if (value.startsWith('/')) {
    return `${base}${value}`;
  }

  return `${base}/${value}`;
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VedicAstrologer',
  alternateName: 'Vedic Astrologer',
  url: safeUrl('/'),
  logo: safeUrl('/og-image.svg'),
  description:
    'Vedic astrology platform providing personalized birth chart insights, guidance, and life analysis.',
  sameAs: [],
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    availableLanguage: ['English'],
  },
});

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VedicAstrologer',
  url: safeUrl('/'),
  description:
    'Personalized Vedic astrology readings covering astrology guidance, birth chart analysis, career insights, and life direction.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${safeUrl('/')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const buildWebPageSchema = (pageName = 'Home') => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: pageName,
  url: safeUrl('/'),
  description:
    'VedicAstrologer offers Vedic astrology readings, chart guidance, and life analysis rooted in traditional astrologic interpretation.',
  isPartOf: {
    '@id': safeUrl('/'),
    '@type': 'WebSite',
  },
});

export const buildSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VedicAstrologer',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  description:
    'An astrology platform that generates personalized Vedic astrology reports based on user birth details.',
  offers: {
    '@type': 'Offer',
    category: 'Astrology Reading',
    availability: 'https://schema.org/InStock',
  },
  url: safeUrl('/'),
});

export const injectStructuredData = (schema: Record<string, unknown>, id: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema, null, 0);
};
