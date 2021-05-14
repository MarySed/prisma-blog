import { getSession } from "next-auth/client";
import prisma from "lib/prisma";

// Create POST with Prisma
const handle = async (req, res) => {
  const { title, content } = req.body;

  // Check if user is authenticated
  const session = await getSession({ req });

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          email: session?.user?.email
        }
      }
    }
  });

  res.json(result);
};

export default handle;
