"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/button/button";
import styles from "@/components/header/header.module.scss";

import { getAuthStatus, removeAuthToken } from "@/utils/cookie";

import { FaUser } from "react-icons/fa";

interface AuthSectionProps {
  isLogIn: boolean;
}

export default function AuthSection({ isLogIn }: AuthSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isLogIn);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const status = await getAuthStatus();
    if (!status) {
      setIsLoggedIn(false);
    } else {
      console.error("토큰 제거 실패");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHandler);
    };
  }, []);
  /*
  useEffect(() => {
    setIsLoggedIn(isLogIn);
  }, [isLogIn]);
*/
  return isLoggedIn ? (
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
      <Button> 로그인</Button>
    </Link>
  );
}
