import styles from "./recruitmentsTag.module.scss";

interface RecruitmentsTagProps {
  tags: string[];
}

export default function RecruitmentsTag({ tags }: RecruitmentsTagProps) {
  return (
    <div className={styles["main__post-tags"]}>
      {tags.map((tag, index) => (
        <span key={index} className={styles["main__post-tag"]}>
          {tag}
        </span>
      ))}
    </div>
  );
}
