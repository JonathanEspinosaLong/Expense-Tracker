import React from "react";

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

export interface ContainerProps {
  children: React.ReactNode;
}

export default Container;
