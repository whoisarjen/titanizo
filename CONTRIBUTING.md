# Contributing to Titanizo

Thanks for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/titanizo.git`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and fill in your database credentials
5. Push the database schema: `npm run db:push`
6. Start the dev server: `npm run dev`

## Development Workflow

1. Create a branch from `main`: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally with `npm run dev`
4. Build to verify: `npm run build`
5. Commit with a clear message (e.g. `add category filtering`, `fix article slug generation`)
6. Push and open a Pull Request against `main`

## What to Contribute

- Bug fixes
- Performance improvements
- New features (please open an issue first to discuss)
- Documentation improvements
- Translations
- UI/UX improvements

## Code Style

- TypeScript for all new code
- Follow the existing project conventions
- Use Vue 3 Composition API with `<script setup>`
- Keep components small and focused

## Database Changes

If your change requires a schema modification:

1. Update `prisma/schema.prisma`
2. Run `npm run db:migrate` to create a migration
3. Include the migration in your PR

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, browser)

## Questions?

Open a discussion or issue — happy to help!
