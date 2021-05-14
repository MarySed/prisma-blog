import Router from "next/router";
import { SyntheticEvent, useState } from "react";
import Layout from "components/Layout";
import styles from "styles/Create.module.css";

const Draft = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmitData = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { title, content };

      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }

    // TODO: Implement
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmitData} className={styles.page}>
          <h1>New Draft</h1>
          <input
            className={styles.title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />

          <textarea
            className={styles.content}
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div>
            <a
              className={styles.back}
              href="#"
              onClick={() => Router.push("/")}
            >
              Cancel
            </a>
            <input disabled={!content || !title} type="submit" value="Create" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
