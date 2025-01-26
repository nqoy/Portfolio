import { useState, useEffect } from "react";
import { CircularImage } from "../Elements/CircularImage/circularImage";
import { FadeInBox } from "../Elements/EffectBoxes/FadeInBox/FadeInBox";
import { TypingBox } from "../Elements/EffectBoxes/TypingBox/TypingBox";
import { RetypingBox } from "../Elements/EffectBoxes/RetypingBox/RetypingBox";
import styles from "./MainContainer.module.css";
import { CenterWrapper } from "../Elements/CenterWrapper/CenterWrapper";

type MainContainerProps = {
  children: React.ReactNode;
};

const profileText = [
  "Driven by curiosity and a passion for learning. 💡",
  "3 years of full-stack development experience. 💻",
  "Specialized in back-end development. 🔧",
  "B.Sc. in Computer Science. 🎓",
];

const repeatLines = ["Coding 💻", "Nature 🌿", "Sports 🏅", "Games 🎮"];
const typingDelaySeconds = 3;

export const MainContainer = ({ children }: MainContainerProps) => {
  const [showRetypingBox, setShowRetypingBox] = useState(false);

  useEffect(() => {
    const delay = typingDelaySeconds * 1000 * profileText.length;
    const profileTypingDoneTimer = setTimeout(
      () => setShowRetypingBox(true),
      delay
    );

    return () => clearTimeout(profileTypingDoneTimer);
  }, [profileText.length]);

  return (
    <main className={styles.mainContainer}>
      <div className="profile">
        <CenterWrapper>
          <FadeInBox>
            <TypingBox
              textLines={profileText}
              typingDelaySeconds={typingDelaySeconds}
            />
          </FadeInBox>
          {showRetypingBox && (
            <FadeInBox>
              <RetypingBox repeatLines={repeatLines} />
            </FadeInBox>
          )}
        </CenterWrapper>
        <CircularImage
          src="https://avatars.githubusercontent.com/u/93088356?v=4"
          alt="Failed loading image"
        />
      </div>

      {children}
    </main>
  );
};
