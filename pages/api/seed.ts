// pages/api/seed.ts

import { NextApiRequest, NextApiResponse } from 'next';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Seed the database with authors, tags, and posts
      await prisma.author.createMany({
        data: [
          { username: 'john_doe', givenName: 'John', familyName: 'Doe' },
          { username: 'jane_smith', givenName: 'Jane', familyName: 'Smith' },
        ],
        skipDuplicates: true,
      });

      await prisma.tag.createMany({
        data: [
          { name: 'technology' },
          { name: 'travel' },
          { name: 'food' },
        ],
        skipDuplicates: true,
      });

      await prisma.post.createMany({
        data: [
          {
            title: 'First Post',
            body: 'This is the body of the first post.',
            author: { connect: { username: 'john_doe' } },
            tags: { connect: [{ name: 'technology' }, { name: 'travel' }] },
          },
          {
            title: 'Second Post',
            body: 'This is the body of the second post.',
            author: { connect: { username: 'jane_smith' } },
            tags: { connect: [{ name: 'food' }, { name: 'travel' }] },
          },
          {
            title: 'Third Post',
            body: 'This is the body of the third post.',
            author: { connect: { username: 'john_doe' } },
            tags: { connect: [{ name: 'technology' }, { name: 'food' }] },
          },
        ],
      });

      res.status(200).json({ message: 'Database seeded successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error seeding the database.', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
