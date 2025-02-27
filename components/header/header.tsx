"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";

import styles from "./header.module.scss";

import { FaUser } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideHandler = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHandler);
    };
  }, []);

  const handleProfileClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/">
          <Image src="/logoWidth.svg" alt="Logo" className={styles.header__logo} width={100} height={40} />
        </Link>
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
              <button className={styles.header__dropdownMenuItem}>로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
