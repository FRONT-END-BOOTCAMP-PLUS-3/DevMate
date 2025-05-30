import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import styles from "./header.module.scss";

import AuthSection from "./headerClient/headerClient";

export default async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("token");

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/">
          <Image src="/logoWidth.svg" alt="Logo" width={100} height={40} />
        </Link>
        {isLoggedIn ? (
          <AuthSection />
        ) : (
          <Link href="/login">
            <button className={styles.header__loginMenuItem}>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}
