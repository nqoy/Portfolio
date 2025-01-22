import styles from "./CircularImage.module.css";

type CircularImageProps = {
  src: string;
  alt: string;
  size: string;
};

export const CircularImage = ({ src, alt, size }: CircularImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.circularImage}
      style={{ width: size, height: size }}
    />
  );
};
