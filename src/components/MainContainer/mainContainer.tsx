import { Profile } from "../Elements/Profile/profile.tsx";
import { GitHubData } from "../Elements/GitHubData/gitHubData.tsx";
import styles from "./mainContainer.module.css";
import Contact from "../Elements/Contact/Contact.tsx";

type MainContainerProps = {
  children?: React.ReactNode;
};

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <Profile />
      <GitHubData />
      <Contact/>
      {children}
    </main>
  );
};
