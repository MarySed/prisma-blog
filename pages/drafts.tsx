import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/client";
import Post, { PostProps } from "components/Post";
import Layout from "components/Layout";
import styles from "styles/Drafts.module.css";

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  // If the user is not logged in, then do not display drafts
  if (!session) {
    res.statusCode = 403;
    return {
      props: {
        drafts: []
      }
    };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: {
        email: session?.user?.email
      },
      published: false
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return {
    props: { drafts }
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts = ({ drafts }: Props) => {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>Please login to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1>My Drafts</h1>
        <main className={styles.page}>
          {drafts &&
            drafts.map((post) => {
              return (
                <div key={post.id} className={styles.post}>
                  <Post post={post} />
                </div>
              );
            })}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
