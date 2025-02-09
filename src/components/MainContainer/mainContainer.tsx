import styles from "./mainContainer.module.css";
import { Profile } from "../Elements/Profile/profile";
import { GitHubData } from "../Elements/GitHubData/gitHubData";

type MainContainerProps = {
  children?: React.ReactNode;
};

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
        <Profile />
        <GitHubData />
      {children}
    </main>
  );
};
