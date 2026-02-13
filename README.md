# Titanizo

A modern, full-stack blogging platform built with Nuxt 4 and PostgreSQL. Features hierarchical categories, markdown rendering, dark mode, and SEO optimization out of the box.

**Live demo:** [titanizo.whoisarjen.com](https://titanizo.whoisarjen.com)

## Features

- **Hierarchical Categories** — nested category tree with breadcrumb navigation
- **Markdown Articles** — write content in markdown, rendered with full typography support
- **Dark/Light Mode** — theme toggle with flash-free loading
- **SEO Optimized** — meta tags, JSON-LD structured data, auto-generated sitemap
- **Serverless Ready** — deploys to Vercel with Neon PostgreSQL
- **Image Optimization** — automatic WebP/AVIF conversion and responsive sizing
- **Server-Side Rendering** — full SSR for fast initial loads and SEO

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3) |
| Database | [PostgreSQL](https://www.postgresql.org) via [Neon](https://neon.tech) |
| ORM | [Prisma](https://www.prisma.io) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Markdown | [marked](https://marked.js.org) |
| Deployment | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- A [Neon](https://neon.tech) PostgreSQL database (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/whoisarjen/titanizo.git
cd titanizo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Neon database connection string

# Push the database schema
npm run db:push

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Database Seeding

To populate the database with sample data, uncomment the seed endpoint in `server/api/seed.get.ts` and visit `/api/seed`, or run:

```bash
npm run db:seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run db:push` | Sync Prisma schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed the database |

## Project Structure

```
titanizo/
├── app/
│   ├── components/      # Vue components (header, footer, cards, sidebar)
│   ├── composables/     # Shared state (theme management)
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   └── types/           # TypeScript interfaces
├── server/
│   ├── api/             # API routes (articles, categories, sitemap)
│   └── utils/           # Prisma client, helpers
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets & favicons
└── nuxt.config.ts       # Nuxt configuration
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` to the environment variables
4. Deploy

### Other Platforms

Titanizo works on any platform that supports Nuxt/Nitro. Build with `npm run build` and deploy the `.output` directory. See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for platform-specific guides.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before getting started.

## License

[MIT](LICENSE)
