import React, { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div>
    <h2>HomeNavBar</h2>
    {children}</div>;
}
