const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all tags
    const tags = await prisma.tag.findMany();
    res.status(200).json(tags);
  } else if (req.method === 'POST') {
    // Create a new tag
    const { name } = req.body;
    const tag = await prisma.tag.create({ data: { name } });
    res.status(201).json(tag);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
