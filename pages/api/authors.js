import { PrismaClient } from "@prisma/client";
import bodyParser from 'body-parser';

const prisma = new PrismaClient();


handler.use(bodyParser.json());

handler.post(async (req, res) => {
  const { username } = req.body;

  // Check if username is provided
  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  // delete all authors
  await prisma.author.deleteMany();

  // create an author
  await prisma.author.create({
    data: {
      username: username,
      givenName: "Andrew",
      familyName: "Andrew R A",
    },
  });

  // Fetch the author by username
  const author = await prisma.author.findUnique({
    where: { username: username },
  });

  if (!author) {
    res.status(404).json({ message: "Author not found" });
  } else {
    res.status(200).json(author);
  }
});

export default handler;
