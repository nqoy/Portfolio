import { ReactNode } from "react";
import styles from "./CenterWrapper.module.css";

type CenterWrapperProps = {
  children: ReactNode;
};

export const CenterWrapper = ({ children }: CenterWrapperProps) => {
  return <div className={styles.centerWrapper}>{children}</div>;
};