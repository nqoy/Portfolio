import styles from "./FadeInBox.module.css";

type FadeInBoxProps = {
  children: React.ReactNode;
};

export const FadeInBox = ({ children }: FadeInBoxProps) => {
  return <div className={`${styles.fadeIn} fade-in`}>{children}</div>;
};
