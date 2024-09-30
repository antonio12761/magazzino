import React, { ReactNode } from "react";
import HomeNavbar from "@/components/dashboard/HomeNavbar"
interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div>
    <HomeNavbar  />
    {children}</div>;
}
