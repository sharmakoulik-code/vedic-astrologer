export const SITE_BASE_URL = 'https://sharmakoulik-code.github.io/vedic-astrologer';

export const getSiteBaseUrl = () => SITE_BASE_URL;

export const getCanonicalUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_BASE_URL}${normalizedPath}`;
};
