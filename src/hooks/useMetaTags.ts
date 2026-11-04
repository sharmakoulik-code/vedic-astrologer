import { useEffect } from 'react';

interface MetaTagsConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  themeColor?: string;
  robots?: string;
  canonical?: string;
}

export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    if (config.title) {
      document.title = config.title;
    }

    const updateMetaTag = (name: string, content: string, isProperty: boolean = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    if (config.description) {
      updateMetaTag('description', config.description);
    }

    if (config.themeColor) {
      updateMetaTag('theme-color', config.themeColor);
    }

    if (config.robots) {
      updateMetaTag('robots', config.robots);
    }

    if (config.ogTitle) {
      updateMetaTag('og:title', config.ogTitle, true);
    }

    if (config.ogDescription) {
      updateMetaTag('og:description', config.ogDescription, true);
    }

    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, true);
    }

    if (config.ogUrl) {
      updateMetaTag('og:url', config.ogUrl, true);
    }

    if (config.ogSiteName) {
      updateMetaTag('og:site_name', config.ogSiteName, true);
    }

    if (config.ogLocale) {
      updateMetaTag('og:locale', config.ogLocale, true);
    }

    if (config.twitterTitle) {
      updateMetaTag('twitter:title', config.twitterTitle);
    }

    if (config.twitterDescription) {
      updateMetaTag('twitter:description', config.twitterDescription);
    }

    if (config.twitterImage) {
      updateMetaTag('twitter:image', config.twitterImage);
    }

    if (config.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', config.canonical);
    }
  }, [config]);
};

/**
 * Helper function to add structured data to the page
 */
export const addStructuredData = (type: string, data: Record<string, any>) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
};
