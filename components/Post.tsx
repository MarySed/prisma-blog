import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.css";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  publishedAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div
      className={styles.wrapper}
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <p>{new Date(post?.publishedAt).toDateString()}</p>
      <small>By {authorName}</small>

      <ReactMarkdown source={post.content} />
    </div>
  );
};

export default Post;
