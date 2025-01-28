import styles from "./MainContainer.module.css";
import { Profile } from "../Elements/Profile/profile";

type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <Profile />
      {children}
    </main>
  );
};
