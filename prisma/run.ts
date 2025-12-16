import { prisma } from '~/db/prisma';

async function main() {
  // here you can create initial data

  await prisma.$disconnect();
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
