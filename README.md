# aqua-note

<!-- Badges -->

[![Last Commit](https://img.shields.io/github/last-commit/shin-sforzando/aqua-note)](https://github.com/shin-sforzando/aqua-note/graphs/commit-activity)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![CI](https://github.com/shin-sforzando/aqua-note/actions/workflows/ci.yml/badge.svg)](https://github.com/shin-sforzando/aqua-note/actions/workflows/ci.yml)
[![Deploy to Production](https://github.com/shin-sforzando/aqua-note/actions/workflows/deploy.yml/badge.svg)](https://github.com/shin-sforzando/aqua-note/actions/workflows/deploy.yml)
[![Claude Maintenance Check](https://github.com/shin-sforzando/aqua-note/actions/workflows/claude-maintenance-check.yml/badge.svg)](https://github.com/shin-sforzando/aqua-note/actions/workflows/claude-maintenance-check.yml)

<!-- Synopsis -->

Aquarium Management Note on the Web.

<!-- TOC -->

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
  - [Contributor](#contributor)
  - [License](#license)

## Tech Stack

- Web Framework: [SvelteKit](https://svelte.jp) v5
- CSS Framework: [Tailwind CSS](https://tailwindcss.com) v4
- Database: [Cloudflare D1](https://developers.cloudflare.com/d1/) (Serverless SQLite)
- ORM: [Drizzle ORM](https://orm.drizzle.team/)
- UI/UX: [Svelte-UX](https://svelte-ux.techniq.dev)
  - Chart: [LayerChart](https://www.layerchart.com)
- UI Catalogue: [Storybook](https://storybook.js.org) v9
- Unit Testing: [Vitest](https://vitest.dev)
- E2E Testing: [Playwright](https://playwright.dev)
- Formatter: [Prettier](https://prettier.io)
- Linter: [ESLint](https://eslint.org)
- Deployment: [Cloudflare Workers](https://workers.cloudflare.com/)

## How to

(T. B. D.)

### Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from example if available)
cp .env.example .env  # Edit .env with your configuration

# Initialize local D1 database
npm run db:migrate:local
```

> [!NOTE]
> This project uses Cloudflare D1 as the database. Local development uses D1 emulation via wrangler.

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
npm run db:generate        # Generate migration files
npm run db:migrate:local   # Apply migrations to local D1
npm run db:migrate:remote  # Apply migrations to remote D1
npm run db:migrate:preview # Apply migrations to preview D1
npm run db:studio          # Open Drizzle Studio

# Connect with external SQL clients (e.g., TablePlus)
# Export local D1 database for viewing
npx wrangler d1 export aqua-note-db --local --output local.db
# Then open local.db in your SQL client

# Query remote database directly
npx wrangler d1 execute aqua-note-db --remote --command "SELECT * FROM user"
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
# Build the application
npm run build

# Deploy to preview environment
npm run deploy:preview

# Deploy to production
npm run deploy:production
```

### Contribute

Please submit all bug reports, feature requests, and casual feedback to [GitHub Discussions](https://github.com/shin-sforzando/aqua-note/discussions).
If you wish to join the development or acquire the business, we also accept such requests in the Discussions.

## Misc

This repository is [Commitizen](https://commitizen.github.io/cz-cli/) friendly, following [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow).

### Contributor

- [Shin'ichiro Suzuki](https://github.com/shin-sforzando)

### License

MIT License.
