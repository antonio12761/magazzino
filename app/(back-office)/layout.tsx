"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import React, { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false); // Stato per ridurre/espandere la sidebar

  // Funzione per toggle della sidebar
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="flex">
      {/* Passa lo stato isCollapsed e toggleSidebar alla Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main content area con margine dinamico */}
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-48"
        } w-full bg-slate-100 min-h-screen`}
      >
        <Header />
        {children}
      </main>
    </div>
  );
}
