import styles from "./TypingBox.module.css";

type TypingBoxProps = {
  textLines: string[];
  typingDelaySeconds: number;
};

export const TypingBox = ({ textLines, typingDelaySeconds }: TypingBoxProps) => {
  return (
    <div className={styles.typingBox}>
      {textLines.map((line, index) => (
        <span
          key={index}
          className="typing-effect"
          style={
            {
              "--delay": `${(index + 0.2) * typingDelaySeconds}s`,
            } as React.CSSProperties
          }
        >
          {line}
        </span>
      ))}
    </div>
  );
};
