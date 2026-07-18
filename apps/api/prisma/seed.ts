import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';
import { PrismaClient } from './client';

const ARGON2ID_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

async function main(): Promise<void> {
  const email = process.env.OWNER_EMAIL;
  const password = process.env.OWNER_PASSWORD;

  if (!email || !password) {
    throw new Error('OWNER_EMAIL e OWNER_PASSWORD são obrigatórios no .env.');
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const existingOwner = await prisma.user.findFirst({ where: { isOwner: true } });
    if (existingOwner) {
      console.log(`Já existe um OWNER (${existingOwner.email}). Seed ignorado.`);
      return;
    }

    const passwordHash = await argon2.hash(password, ARGON2ID_OPTIONS);
    const owner = await prisma.user.create({
      data: { email, passwordHash, isOwner: true, status: 'active' },
    });

    console.log(`OWNER criado com sucesso: ${owner.email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Falha ao executar o seed:', error);
  process.exit(1);
});
