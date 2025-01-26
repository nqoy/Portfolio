import styles from "./TypingBox.module.css";

type TypingBoxProps = {
  textLines: string[];
};

export const TypingBox = ({ textLines }: TypingBoxProps) => {
  return (
    <div className={styles.typingBox}>
      {textLines.map((line, index) => (
        <span
          key={index}
          className="typing-effect"
          style={
            {
              "--delay": `${index * 3}s`,
            } as React.CSSProperties
          }
        >
          {line}
        </span>
      ))}
    </div>
  );
};
