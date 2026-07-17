# plataforma-modular

Software desktop modular. Clean Architecture, Modular Monolith, SOLID.

## Stack
Tauri 2 · React 19 · NestJS 11 · Prisma 7 · PostgreSQL 18 · TypeScript 5.9 · pnpm 11 · Biome

## Pré-requisitos
- Node.js 24 LTS
- pnpm 11 (via Corepack)
- Git
- PostgreSQL 18 (a partir da Etapa 2)

## Setup
\`\`\`bash
corepack enable
git clone <url-do-repo>
cd plataforma-modular
pnpm install
\`\`\`

## Scripts
| Comando | Descrição |
|---|---|
| `pnpm lint` | verifica formatação e lint (Biome) |
| `pnpm lint:fix` | corrige automaticamente o que for possível |
| `pnpm typecheck` | compila todos os pacotes via TS project references |
| `pnpm check` | verificação somente-leitura usada no CI |

## Estrutura
\`\`\`
apps/api/        → Backend NestJS (Etapa 2)
apps/desktop/     → Frontend Tauri + React (Etapa 3)
packages/shared/  → tipos e utilitários compartilhados
packages/config/  → configurações compartilhadas
database/         → schema Prisma, migrações e seeds (Etapa 2)
docs/             → documentação técnica e ADRs
\`\`\`

## Documentação
Ver [docs/](./docs/README.md), especialmente as [ADRs](./docs/adr/).