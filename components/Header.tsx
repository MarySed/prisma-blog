import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href="/">
            <a className={styles.bold} data-active={isActive("/")}>
              Feed
            </a>
          </Link>
          {session && (
            <Link href="/drafts">
              <a className={styles.bold} data-active={isActive("/drafts")}>
                My drafts
              </a>
            </Link>
          )}
        </div>

        {loading && (
          <div className={styles.right}>
            <p>Validating session...</p>
          </div>
        )}
        {!session && (
          <div className={styles.right}>
            <Link href="/api/auth/signin">
              <a data-active={isActive("/signup")}>Log in</a>
            </Link>
          </div>
        )}
        {session && (
          <div className={styles.right}>
            <p>Welcome, {session.user.name}</p>
            <Link href="/create">
              <button className={styles["create_button"]}>
                <a>New post</a>
              </button>
            </Link>
            <button
              className={styles["logout_button"]}
              onClick={() => signOut()}
            >
              <a>Log out</a>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
