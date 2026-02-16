import type React from "react";

type Props = {
  children?: React.ReactNode;
};

const Section = ({ children }: Props) => {
  return <section className="container py-20 border-t">{children}</section>;
};

export default Section;
