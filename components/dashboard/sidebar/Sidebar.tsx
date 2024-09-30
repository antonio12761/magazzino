"use client";

import { SidebarLink } from "./SidebarLink"; // Importa il componente SidebarLink
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SubscriptionCard from "./SubscriptionCard"; // Se necessario, gestisci anche questo
import { sidebarLinks } from "./SidebarLinks";

import { ChevronLeft, BadgeEuro } from "lucide-react";

// Tipi per le props che Sidebar riceve dal layout
type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuClick = (menuTitle: string) => {
    setOpenMenu((prevMenu) => (prevMenu === menuTitle ? null : menuTitle));
  };

  // Gestisci clic sui link senza sottomenu (chiude il menu)
  const handleLinkClick = () => {
    setOpenMenu(null); // Chiude il sottomenu se viene cliccato un link senza sottomenu
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-48"
      } flex flex-col justify-between bg-slate-800 min-h-screen text-slate-50 fixed transition-all duration-300`}
    >
      {/** Top Part - Imposta lo scroll sulla sezione principale */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-screen">
        {/** Logo */}
        <Link
          href="/dashboard/home/overview"
          className={`w-full p-2 flex items-center bg-slate-950 hover:bg-slate-900 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "space-x-2"
          }`}
        >
          {/* Mantieni l'icona sempre visibile e centrata */}
          <BadgeEuro className="w-6 h-6 text-slate-50 transition-all duration-300" />

          {/* Mostra il testo solo quando la sidebar non è ridotta */}
          <span
            className={`font-semibold text-xl text-slate-50 transition-all duration-300 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Inventory
          </span>
        </Link>
        {/** Links */}
        <nav className="flex flex-col gap-4 px-1">
          {sidebarLinks.map((item, i) => (
            <SidebarLink
              key={i}
              item={item}
              isCollapsed={isCollapsed}
              isOpen={openMenu === item.title}
              onClick={handleMenuClick}
              onLinkClick={handleLinkClick}
              pathname={pathname}
            />
          ))}
        </nav>
        {/** Subscription Card */}
        {!isCollapsed && (
          <div className="mb-10">
            {" "}
            {/* Aggiunge margine extra per spazio finale */}
            <SubscriptionCard />
          </div>
        )}
      </div>

      {/** Footer Icon - Aggiunta posizione fissa in basso */}
      <div className="p-2 bg-slate-950 hover:bg-slate-900 sticky bottom-0">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center"
        >
          <ChevronLeft
            className={`${isCollapsed ? "rotate-180" : ""}`}
            aria-label="Toggle Sidebar"
          />
        </button>
      </div>
    </div>
  );
}
