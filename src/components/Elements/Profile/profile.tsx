import { useState, useEffect } from "react";
import { CenterWrapper } from "../CenterWrapper/centerWrapper";
import { FadeInBox } from "../EffectBoxes/FadeInBox/fadeInBox";
import { TypingBox } from "../EffectBoxes/TypingBox/typingBox";
import { RetypingBox } from "../EffectBoxes/RetypingBox/retypingBox";
import { CircularImage } from "../CircularImage/circularImage";
import styles from "./profile.module.css";

const profileText = [
  "Driven by curiosity and a passion for learning. 💡",
  "3 years of full-stack development experience. 💻",
  "Specialized in back-end development. 🔧",
  "B.Sc. in Computer Science. 🎓",
];
const repeatLines = [
  "Teamwork Skills 🤝",
  "Problem-Solving 🧩",
  "System Design 📐",
  "Architecture 🕸️",
  "Integrations 🔗",
  "Fast Learning 📚",
  "Infrastructure ☁️",
  "Troubleshooting 🐛",
];
const typingDelaySeconds = 3;
const profileImageURL = "https://avatars.githubusercontent.com/u/93088356?v=4";

export const Profile = () => {
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
    <div className={styles.profile} id="about">
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
      <CircularImage src={profileImageURL} alt="Failed loading image" />
    </div>
  );
};
