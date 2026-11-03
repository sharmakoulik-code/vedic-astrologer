const normalizeBaseUrl = (value?: string) => {
  const sanitized = (value || '').trim().replace(/\/$/, '');
  return sanitized || '';
};

export const getSiteBaseUrl = () => {
  const configured = normalizeBaseUrl(import.meta.env.VITE_SITE_URL);

  if (configured) {
    return configured;
  }

  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

    if (isLocalhost) {
      return '';
    }

    const pathname = window.location.pathname.replace(/\/$/, '');
    const repoPath = pathname.includes('/vedic-astrologer') ? '/vedic-astrologer' : '';

    return `${protocol}//${host}${repoPath}`;
  }

  return '';
};

export const getCanonicalUrl = (path = '/') => {
  const baseUrl = getSiteBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!baseUrl) {
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath === '/' ? '' : normalizedPath}`;
};
