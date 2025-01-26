import styles from "./CircularImage.module.css";

type CircularImageProps = {
  src: string;
  alt: string;
};

export const CircularImage = ({ src, alt }: CircularImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.circularImage}
    />
  );
};
