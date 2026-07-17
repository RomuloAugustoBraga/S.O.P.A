# ADR 0001: Escolha da stack tecnológica

**Status:** Aceito
**Data:** 2026-07-13

## Contexto
Plataforma desktop modular, projetada para durar anos e suportar dezenas de
módulos independentes. A stack foi definida como decisão fechada antes do
início da implementação.

## Decisão

| Camada | Tecnologia |
|---|---|
| Ambiente | Node.js 24 LTS, pnpm 11, Git, GitHub Actions |
| Linguagem | TypeScript 5.9 |
| Desktop | Tauri 2, React 19, Vite 7, TanStack Query, React Hook Form, Axios, Zod, Ant Design |
| Backend | NestJS 11, Prisma ORM 7, Passport, JWT, Argon2 |
| Banco de dados | PostgreSQL 18 |
| Qualidade | Biome, Vitest, Playwright, EditorConfig, Conventional Commits |

## Consequências
- **Tauri vs. Electron**: binários menores e menor consumo de memória; exige toolchain Rust na máquina de build.
- **Biome vs. ESLint+Prettier**: um binário único cobre lint/format/imports; ecossistema de plugins menor.
- **pnpm 11**: bloqueia scripts postinstall por padrão — liberação explícita necessária na Etapa 2.
- **TypeScript 5.9**: fixado deliberadamente. No momento desta decisão a versão estável do compilador já é 7.0.x — o projeto está ~2 major versions atrás por decisão de stack fechada, não por desatualização acidental.

## Alternativas consideradas
Não aplicável — stack definida como não-negociável antes do início do projeto.