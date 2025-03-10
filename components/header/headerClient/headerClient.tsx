"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/header/header.module.scss";

import { removeAuthToken } from "@/utils/cookie";

import { FaUser } from "react-icons/fa";

export default function AuthSection() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleClickOutsideHandler = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const handleProfileClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = async () => {
    await removeAuthToken();
    router.push("/recruitments");
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHandler);
    };
  }, []);

  return (
    <div className={styles.header__profile} ref={dropdownRef}>
      <button onClick={handleProfileClickHandler} className={styles.header__profileButton}>
        <FaUser className={styles.header__avatar} />
        <span className={styles.header__username}>닉네임</span>
      </button>
      {isOpen && (
        <div className={styles.header__dropdownMenu}>
          <Link href="/user/information" className={styles.header__dropdownMenuItem}>
            마이페이지
          </Link>
          <button onClick={logoutHandler} className={styles.header__dropdownMenuItem}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link href="/login">
      <button className={styles.header__loginMenuItem}>로그인</button>
    </Link>
  );
}
