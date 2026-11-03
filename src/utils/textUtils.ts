/**
 * Utility function to truncate content before SEO metadata section
 * Removes any content starting with "## SEO & Meta Data" to prevent data leakage
 */
export const truncateBeforeSEO = (text: string): string => {
  if (!text) return '';
  
  const seoMarker = '## SEO & Meta Data';
  const seoIndex = text.indexOf(seoMarker);
  
  if (seoIndex !== -1) {
    return text.substring(0, seoIndex).trim();
  }
  
  return text;
};

/**
 * Clean and sanitize report text to ensure readability and remove unwanted sections
 */
export const cleanReportText = (text: string): string => {
  // First truncate before SEO section
  let cleaned = truncateBeforeSEO(text);
  
  // Remove any trailing markdown separators
  cleaned = cleaned.replace(/^-{3,}$/gm, '').trim();
  
  return cleaned;
};
