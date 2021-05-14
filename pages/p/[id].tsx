import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "components/Layout";
import { PostProps } from "components/Post";
import prisma from "lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/client";
import styles from "styles/Post.module.css";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1
    },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });

  return {
    props: post
  };
};

// TODO: Replace localhost with env variable for deploy

const publishPost = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: "PUT"
  });
  await Router.push("/");
};

const deletePost = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE"
  });

  Router.push("/");
};

const Post = ({ id, title, author, published, content }: PostProps) => {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  const userHasValidSession = !!session;
  const postBelongsToUser = session?.user?.email === author?.email;

  const displayTitle = published ? title : `${title} (Draft)`;
  const canBePublished = !published && userHasValidSession && postBelongsToUser;
  const canBeDeleted = userHasValidSession && postBelongsToUser;

  return (
    <Layout>
      <div className={styles.post}>
        <h2>{displayTitle}</h2>
        <p>By {author?.name || "Unknown author"}</p>
        <ReactMarkdown source={content} />
        <div className={styles["button_container"]}>
          {canBePublished && (
            <button className={styles.button} onClick={() => publishPost(id)}>
              Publish Your Post
            </button>
          )}

          {canBeDeleted && (
            <button
              className={styles["danger_button"]}
              onClick={() => deletePost(id)}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
