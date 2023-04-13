import { PrismaClient } from "@prisma/client";
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
