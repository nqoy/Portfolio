import styles from "./MainContainer.module.css";
import { CircularImage } from "./CircularImage/circularImage";

type MainContainerProps = {
  children: React.ReactNode;
};
export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <CircularImage
        src="https://avatars.githubusercontent.com/u/93088356?v=4"
        alt="Failed loading image"
        size="500px"
      />
      {children}
    </main>
  );
};
