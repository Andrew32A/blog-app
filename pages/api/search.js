const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query: searchQuery, tags, authorId } = req.query;

    // Build Prisma query
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery } },
          { body: { contains: searchQuery } },
        ],
        tags: { some: { id: { in: tags } } },
        authorId: authorId ? parseInt(authorId) : undefined,
      },
      include: { tags: true, author: true },
    });

    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
