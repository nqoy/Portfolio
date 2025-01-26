import styles from "./MainContainer.module.css";
import { CircularImage } from "../Elements/CircularImage/circularImage";
import { FadeInBox } from "../Elements/EffectBoxes/FadeInBox/FadeInBox";
import { TypingBox } from "../Elements/EffectBoxes/TypingBox/TypingBox";

type MainContainerProps = {
  children: React.ReactNode;
};

const profileText = [
  "B.Sc. in Computer Science.",
  "3 years of full-stack development experience.",
  "Specialized in back-end development.",
  "Driven by curiosity and a passion for learning."
];

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className={styles.mainContainer}>
      <div className="profile">
        <FadeInBox>
          <TypingBox textLines={profileText} />
        </FadeInBox>
        <CircularImage
          src="https://avatars.githubusercontent.com/u/93088356?v=4"
          alt="Failed loading image"
        />
      </div>

      {children}
    </main>
  );
};
