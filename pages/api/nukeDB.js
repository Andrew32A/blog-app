const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await prisma.author.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    res.status(200).json({ message: 'Database dropped successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while dropping the database.' });
  }
}
