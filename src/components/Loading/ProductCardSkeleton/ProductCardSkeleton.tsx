import styles from "./ProductCardSkeleton.module.css";

interface ProductCardSkeletonProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonTitleShort} />
        <div className={styles.skeletonPrice} />
      </div>
    </div>
  );
}

export default function ProductCardSkeleton({ count = 12 }: ProductCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}