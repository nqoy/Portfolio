import styles from "./MainContainer.module.css";
import { CircularImage } from "./CircularImage/circularImage";

type MainContainerProps = {
  children: React.ReactNode;
};
export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <div className="profile">
        <div className="profile-text">
        <span>Computer Science & 3 years experiance in fullstack dev</span>
        </div>
      
      <CircularImage
        src="https://avatars.githubusercontent.com/u/93088356?v=4"
        alt="Failed loading image"
      />
      </div>
      
      {children}
    </main>
  );
};
