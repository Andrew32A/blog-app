const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // fetch all authors
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } else if (req.method === 'POST') {
    // create new author
    const { username, givenName , familyName } = req.body;
    const author = await prisma.author.create({
      data: {
        username,
        givenName,
        familyName,
      },
    });
    res.status(201).json(author);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
