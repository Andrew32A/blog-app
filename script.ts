const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.author.deleteMany();

    const author = await prisma.author.create({
        data: {
            username: "andrew",
            givenName: "andrew a",
        }
    });
    
    console.log(author)
    // await prisma.author.findMany();
}

console.log("hello world");

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
