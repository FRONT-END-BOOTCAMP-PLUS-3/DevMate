"use client";

import { useState, useEffect } from "react";

import styles from "./LikeButton.module.scss";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

interface LikeButtonProps {
  projectId: number;
  likes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ projectId, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // ✅ 초기 마운트 시, 사용자가 좋아요를 눌렀는지 확인
  // useEffect(() => {
  //   fetch(`/api/likes?userId=${userId}&projectId=${projectId}`)
  //     .then((res) => res.json())
  //     .then((data) => setLiked(data.liked))
  //     .catch((err) => console.error("Failed to fetch like status", err));
  // }, [userId, projectId]);

  const handleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);

    // try {
    //   await fetch("/api/likes", {
    //     method: newLikedState ? "POST" : "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ userId, projectId }),
    //   });
    // } catch (error) {
    //   console.error("Failed to update like", error);
    //   // 롤백 처리 (API 요청 실패 시 상태 되돌리기)
    //   setLiked(!newLikedState);
    //   setLikeCount(newLikedState ? likeCount - 1 : likeCount + 1);
    // }
  };

  return (
    <button onClick={handleLike} className={styles.likeButton}>
      {liked ? <IoIosHeart color={"red"} /> : <IoIosHeartEmpty />}
      <p>{likeCount}</p>
    </button>
  );
};

export default LikeButton;
