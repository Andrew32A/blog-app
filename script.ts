const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

async function main() {
    await prisma.user.findMany()
}

main()
    .catch(e => {
        console.log(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })