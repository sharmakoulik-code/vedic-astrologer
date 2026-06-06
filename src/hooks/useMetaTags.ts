import { useEffect } from 'react';

interface MetaTagsConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    // Update title
    if (config.title) {
      document.title = config.title;
    }

    // Update meta tags
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

    // Meta tags
    if (config.description) {
      updateMetaTag('description', config.description);
    }

    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    // Open Graph tags
    if (config.ogTitle) {
      updateMetaTag('og:title', config.ogTitle, true);
    }

    if (config.ogDescription) {
      updateMetaTag('og:description', config.ogDescription, true);
    }

    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, true);
    }

    // Twitter Card tags
    if (config.twitterTitle) {
      updateMetaTag('twitter:title', config.twitterTitle);
    }

    if (config.twitterDescription) {
      updateMetaTag('twitter:description', config.twitterDescription);
    }

    if (config.twitterImage) {
      updateMetaTag('twitter:image', config.twitterImage);
    }

    // Canonical URL
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
