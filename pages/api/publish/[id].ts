import prisma from "lib/prisma";

const handle = async (req, res) => {
  const date = new Date().toISOString();
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: {
      id: Number(postId)
    },
    data: {
      published: true,
      publishedAt: date
    }
  });

  res.json(post);
};

export default handle;
