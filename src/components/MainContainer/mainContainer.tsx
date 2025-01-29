import styles from "./MainContainer.module.css";
import { Profile } from "../Elements/Profile/profile";
import  {GitHubRepos}  from "../Elements/GitHubRepos/gitHubRepos";

type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <Profile/>
      <GitHubRepos/>
      {children}
    </main>
  );
};
