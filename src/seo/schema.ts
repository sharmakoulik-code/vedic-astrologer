import { getCanonicalUrl } from './site';

const isValidStructuredDataUrl = (value?: string) => {
  if (!value) return false;
  return value.startsWith('http://') || value.startsWith('https://');
};

const safeUrl = (value?: string) => {
  if (isValidStructuredDataUrl(value)) {
    return value;
  }

  if (!value) {
    return getCanonicalUrl('/');
  }

  if (value.startsWith('/')) {
    return getCanonicalUrl(value);
  }

  return getCanonicalUrl(value);
};

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VedicAstrologer',
  url: safeUrl('/'),
  description:
    'Vedic astrology readings based on planetary positions, Lahiri ayanamsa, and whole-sign houses. For guidance and entertainment only.',
  inLanguage: 'en',
});

export const buildWebPageSchema = (pageName = 'Home') => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: pageName,
  url: safeUrl('/'),
  description:
    'Planetary positions are interpreted using Lahiri ayanamsa and whole-sign houses. Readings are for guidance and entertainment only.',
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
    'A browser-based Vedic astrology reading using Lahiri ayanamsa and whole-sign houses, for guidance and entertainment.',
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
