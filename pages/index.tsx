import React from "react";
import { GetServerSideProps } from "next";
import Layout from "components/Layout";
import Post, { PostProps } from "components/Post";
import prisma from "lib/prisma";
import styles from "styles/Index.module.css";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    orderBy: {
      // Difficulty sorting by ISO strings in publishedAt so switching to id
      id: "desc"
    },
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

const Blog = ({ feed }: Props) => {
  return (
    <Layout>
      <div>
        <h1>Timeline</h1>
        <main className={styles.page}>
          {feed.map((post) => (
            <div key={post.id} className={styles.post}>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
