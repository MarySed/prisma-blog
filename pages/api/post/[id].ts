import prisma from "lib/prisma";

const handle = async (req, res) => {
  const postId = req.query.id;

  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    res.json(post);
  } else {
    throw new Error(
      `The HTTP method ${req.method} is not supported on this route`
    );
  }
};

export default handle;
