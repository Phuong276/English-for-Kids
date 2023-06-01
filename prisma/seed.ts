import { PrismaClient } from "@prisma/client";
import { answers } from "./seeds/answers";
import { games } from "./seeds/games";
import { questions } from "./seeds/questions";
import { rounds } from "./seeds/rounds";
import { users } from "./seeds/users";

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      create: user,
      update: user,
      where: {
        id: user.id,
      },
    });
  }
  await prisma.$queryRaw`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`;

  for (const game of games) {
    await prisma.game.upsert({
      create: game,
      update: game,
      where: {
        id: game.id,
      },
    });
  }
  await prisma.$queryRaw`SELECT setval('games_id_seq', (SELECT MAX(id) FROM games));`;

  for (const round of rounds) {
    await prisma.round.upsert({
      create: round,
      update: round,
      where: {
        id: round.id,
      },
    });
  }
  await prisma.$queryRaw`SELECT setval('rounds_id_seq', (SELECT MAX(id) FROM rounds));`;

  for (const question of questions) {
    await prisma.question.upsert({
      create: question,
      update: question,
      where: {
        id: question.id,
      },
    });
  }
  await prisma.$queryRaw`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));`;

  for (const answer of answers) {
    await prisma.answer.upsert({
      create: answer,
      update: answer,
      where: {
        id: answer.id,
      },
    });
  }
  await prisma.$queryRaw`SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));`;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
