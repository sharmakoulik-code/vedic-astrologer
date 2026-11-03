# Vedic Astrologer

A premium dark-mode astrology report generator built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Personalized birth-based astrology report
- Responsive premium dashboard UI
- Dark glassmorphism design system
- Career, love, finance, health, and future predictions
- Optional birth time and place fields
- SEO metadata and report sanitization safeguards

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open:

- http://localhost:5173/

## Production Build

```bash
npm run build
```

## GitHub Pages Deployment

This project is configured for GitHub Pages with Vite's `base` path set to `/vedic-astrologer/`.

To deploy:

1. Push the repository to GitHub.
2. In the GitHub repository, go to Settings > Pages.
3. Set Source to GitHub Actions.
4. Commit and push the workflow file included in `.github/workflows/deploy.yml`.

## Project Structure

```text
src/
  App.tsx
  components/
  hooks/
  utils/
  types/
public/
  sitemap.xml
  robots.txt
```

## License

This project is for personal and demo use.
