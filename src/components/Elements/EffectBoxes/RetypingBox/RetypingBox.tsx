import { useState, useEffect } from "react";
import styles from "./RetypingBox.module.css";

const SWITCH_STRING_TIME = 2200; // Define the constant switch time

type RetypingBoxProps = {
  repeatLines: string[];
};

export const RetypingBox = ({ repeatLines }: RetypingBoxProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prevLineIndex) =>
        prevLineIndex + 1 < repeatLines.length ? prevLineIndex + 1 : 0
      );
    }, SWITCH_STRING_TIME);

    return () => clearInterval(interval);
  }, [repeatLines.length]);

  return (
    <div className={styles.retypingBox} style={{ "--switch-time": `${SWITCH_STRING_TIME}ms` } as React.CSSProperties}>
      <span className="type-delete-effect">
        {repeatLines[currentLineIndex]}
      </span>
    </div>
  );
};
