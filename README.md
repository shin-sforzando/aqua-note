# aqua-note

<!-- Badges -->

[![Last Commit](https://img.shields.io/github/last-commit/shin-sforzando/aqua-note)](https://github.com/shin-sforzando/aqua-note/graphs/commit-activity)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- Synopsis -->

Aquarium Management Note on the Web.

<!-- TOC -->2

- [Tech Stack](#tech-stack)
- [How to](#how-to)
  - [Setup](#setup)
  - [Develop](#develop)
  - [Deploy](#deploy)
    - [Prerequisites](#prerequisites)
    - [Automatic Deployment](#automatic-deployment)
    - [Manual Deployment](#manual-deployment)
  - [Contribute](#contribute)
- [Misc](#misc)
  - [Contribution](#contribution)
  - [License](#license)

## Tech Stack

- Web Framework: [SvelteKit](https://svelte.jp) v5
- CSS Framework: [Tailwind CSS](https://tailwindcss.com) v4
- UI/UX: [Svelte-UX](https://svelte-ux.techniq.dev)
  - Chart: [LayerChart](https://www.layerchart.com)
- UI Catalogue: [Storybook](https://storybook.js.org) v9
- Unit Testing: [Vitest](https://vitest.dev)
- E2E Testing: [Playwright](https://playwright.dev)
- Formatter: [Prettier](https://prettier.io)
- Linter: [ESLint](https://eslint.org)

## How to

(T. B. D.)

### Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from example if available)
cp .env.example .env  # Edit .env with your configuration
```

### Develop

```bash
# Start development server
npm run dev

# Run tests
npm run test:unit  # Unit tests
npm run test:e2e   # E2E tests

# Check code quality
npm run lint       # Lint & format check
npm run format     # Auto-format
npm run check      # Type check

# Database operations
npm run db:push     # Push schema to database
npm run db:migrate  # Run migrations
npm run db:studio   # Open Drizzle Studio
```

### Deploy

This project is configured for deployment to Cloudflare Workers.

#### Prerequisites

- Cloudflare account
- Set the following GitHub Secrets:
  - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
  - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
  - `CLOUDFLARE_ACCOUNT_SUBDOMAIN`: Your Workers subdomain

#### Automatic Deployment

- **Production**: Auto-deploy on push to `main` branch
- **Preview**: Auto-deploy on Pull Request creation

#### Manual Deployment

```bash
# Build and deploy to production
npm run build
npx wrangler deploy

# Deploy to preview environment
npx wrangler deploy --env preview
```

### Contribute

(T. B. D.)

## Misc

This repository is [Commitizen](https://commitizen.github.io/cz-cli/) friendly, following [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow).

### Contribution

(T. B. D.)

### License

MIT License.
