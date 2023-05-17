const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // fetch all authors
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } else if (req.method === 'POST') {
    // create new author
    const { title, body, authorId, tags } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
        tags: { connect: tags.map(tagId => ({ id: tagId })) },
      },
    });
    res.status(201).json(post);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
