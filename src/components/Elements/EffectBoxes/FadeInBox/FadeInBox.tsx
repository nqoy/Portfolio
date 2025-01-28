type FadeInBoxProps = {
  children: React.ReactNode;
};

export const FadeInBox = ({ children }: FadeInBoxProps) => {
  return <div className="fade-in">{children}</div>;
};
