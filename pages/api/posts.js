const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // fetch all posts
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    // create a new post
    const { title, body, authorId, tags } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
        // tags
        // tags: { connect: tags.map(tagId => ({ id: tagId })) },
      },
    });
    res.status(201).json(post);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}