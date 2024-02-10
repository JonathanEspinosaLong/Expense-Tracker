import React from "react";

function Heading(props: TitleProps) {
  const { title, subtitle, icon } = props;
  return (
    <section className="heading">
      <h1>
        {icon}
        {title}
      </h1>
      <p>{subtitle}</p>
    </section>
  );
}

export interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default Heading;
