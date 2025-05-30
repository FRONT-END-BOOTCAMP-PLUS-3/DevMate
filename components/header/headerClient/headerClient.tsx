"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/header/header.module.scss";

import { decodeToken, removeAuthToken } from "@/utils/cookie";

import { FaUser } from "react-icons/fa";

export default function AuthSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
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
  useEffect(() => {
    const fetchUserData = async () => {
      const decodedUserId = await decodeToken("id");

      if (decodedUserId) {
        const response = await fetch(`/api/user/${decodedUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user information.");
        }
        const data = await response.json();
        setNickname(data.nickname);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className={styles.header__profile} ref={dropdownRef}>
      <button onClick={handleProfileClickHandler} className={styles.header__profileButton}>
        <FaUser className={styles.header__avatar} />
        <span className={styles.header__username}>{nickname}</span>
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
  );
}
