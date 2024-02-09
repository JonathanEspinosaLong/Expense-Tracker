import React from "react";

function Header(props: TitleProps) {
  const { title, subtitle, icon } = props;
  return (
    <>
      <h1>
        {icon}
        {title}
      </h1>
      <p>{subtitle}</p>
    </>
  );
}

export interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default Header;
