import { useState, useEffect } from "react";
import styles from "./retypingBox.module.css";

const BASE_SWITCH_TIME = 300;

type RetypingBoxProps = {
  repeatLines: string[];
};

export const RetypingBox = ({ repeatLines }: RetypingBoxProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const longestWord = repeatLines.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    ""
  );

  const lineSwitchTime = longestWord.length * BASE_SWITCH_TIME;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prevLineIndex) =>
        prevLineIndex + 1 < repeatLines.length ? prevLineIndex + 1 : 0
      );
    }, lineSwitchTime);

    return () => clearInterval(interval);
  }, [repeatLines.length, lineSwitchTime]);

  return (
    <div
      className={styles.retypingBox}
      style={
        { "--switch-time": `${lineSwitchTime}ms` } as React.CSSProperties
      }
    >
      <span className="type-delete-effect">
        {repeatLines[currentLineIndex]}
      </span>
    </div>
  );
};
