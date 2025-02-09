type FadeInBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export const FadeInBox = ({ children, className = "" }: FadeInBoxProps) => {
  return <div className={`fade-in ${className}`}>{children}</div>;
};
