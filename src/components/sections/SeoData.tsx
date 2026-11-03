import React from 'react';
import type { UserDetails } from '../../types';

export const SeoData: React.FC<{ user: UserDetails }> = ({ user: _user }) => {
  // SEO metadata is handled through the document head and page config.
  // The report UI intentionally never renders the SEO internals.
  void _user;
  return null;
};