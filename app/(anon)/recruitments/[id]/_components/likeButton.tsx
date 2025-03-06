"use client";

import { useEffect, useState } from "react";

import { decodeToken } from "@/utils/cookie";

import styles from "./likeButton.module.scss";

import type { LikeDto } from "@/application/usecases/dtos/LikeDto";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

interface LikeButtonProps {
  projectId: number;
  likes: LikeDto[];
}

const LikeButton: React.FC<LikeButtonProps> = ({ projectId, likes }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    fetchUserId();
  }, []);

  // ✅ 초기 마운트 시, 사용자가 좋아요를 눌렀는지 확인
  useEffect(() => {
    if (userId) {
      isLike();
    }
  }, [userId, projectId]);

  const fetchUserId = async () => {
    try {
      const decoded = await decodeToken("id");
      if (typeof decoded === "string") {
        setUserId(decoded);
      }
    } catch {
      setUserId(null);
    }
  };

  const isLike = () => {
    likes.forEach((like) => {
      if (like.userId === userId) setLiked(true);
    });
  };

  const handleLike = async () => {
    if (!userId) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);

    try {
      await fetch(`/api/recruitments/${projectId}/like`, {
        method: newLikedState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, projectId }),
      });
    } catch (error) {
      console.error("Failed to update like", error);
      // 롤백 처리 (API 요청 실패 시 상태 되돌리기)
      setLiked(!newLikedState);
      setLikeCount(newLikedState ? likeCount - 1 : likeCount + 1);
    }
  };

  return (
    <button onClick={handleLike} className={styles.likeButton}>
      {liked ? <IoIosHeart color={"red"} /> : <IoIosHeartEmpty />}
      <p>{likeCount}</p>
    </button>
  );
};

export default LikeButton;
