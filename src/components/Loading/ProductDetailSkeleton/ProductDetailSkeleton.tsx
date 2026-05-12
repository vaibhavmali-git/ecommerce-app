import styles from "./ProductDetailSkeleton.module.css";

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.skeletonGrid}>
      <div className={styles.skeletonImage} />

      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonCategory} />
        <div className={styles.skeletonTitleLong} />
        <div className={styles.skeletonTitleShort} />
        <div className={styles.skeletonPrice} />
        <div className={styles.skeletonDescLine} />
        <div className={styles.skeletonDescLine} />
        <div className={styles.skeletonDescLine} />
        <div className={styles.skeletonDescLineShort} />
        <div className={styles.skeletonBtn} />
      </div>
    </div>
  );
}