const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // delete all authors
    await prisma.author.deleteMany();

    // [create] create author
    const author = await prisma.author.create({
        data: {
            username: "andrew",
            givenName: "andrew a",
        }
    });
    console.log("ORIGINAL AUTHOR: ", author)

    // [read] finds all authors
    const allAuthors = await prisma.author.findMany();
    console.log("ALL AUTHORS: ", allAuthors)

    // [update] updates author
    const updatedAuthor = await prisma.author.update({
        where: {
            username: "andrew"
        },
        data: {
            username: "updated username"
        }
    })
    console.log("UPDATED AUTHOR: ", updatedAuthor)

    // [delete] deletes author
    const deleteAuthor = await prisma.author.delete({
        where: {
            username: "updated username"
        }
    })
    console.log("CHECK FOR DELETED USER", allAuthors)
}

// prisma code from docs
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
