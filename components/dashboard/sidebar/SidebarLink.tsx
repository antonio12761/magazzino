import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SVGProps } from "react";
import { SidebarSubmenu } from "./SidebarSubmenu"; // Importa SidebarSubmenu

type SidebarLinkType = {
  title: string;
  href?: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  submenu?: SidebarLinkType[]; // Submenu contiene un array dello stesso tipo
};

type SidebarLinkProps = {
  item: SidebarLinkType;
  isCollapsed: boolean;
  isOpen: boolean;
  pathname: string;
  onClick: (title: string) => void;
  onLinkClick: () => void;
};

export function SidebarLink({
  item,
  isCollapsed,
  isOpen,
  pathname,
  onClick,
  onLinkClick,
}: SidebarLinkProps) {
  const IconComponent = item.icon; // Estrai l'icona dal link
  const isSubmenuActive = item.submenu?.some(
    (subItem) => pathname === subItem.href
  );
  const isActive = pathname === item.href;

  const handleMainLinkClick = () => {
    // Se il link ha un submenu, apri/chiudi il submenu
    if (item.submenu) {
      onClick(item.title);
    } else {
      onLinkClick(); // Se non c'è un sottomenu, naviga direttamente
    }
  };

  return (
    <div key={item.title}>
      {item.submenu ? (
        <>
          {/* Usa Link per la navigazione e rendi cliccabile il titolo per la navigazione */}
          <Link href={item.href || "#"}>
            <button
              onClick={handleMainLinkClick} // Aggiungi gestione del click sul link principale
              className={`${
                isSubmenuActive || isOpen || isActive
                  ? "flex items-center gap-2 p-2 text-blue-400 rounded-md"
                  : "flex items-center gap-2 p-2 hover:bg-slate-950 hover:text-slate-50 rounded-md"
              } w-full ${
                isCollapsed ? "justify-center mt-2" : "justify-between"
              }`}
            >
              <div
                className={`flex items-center ${
                  isCollapsed ? "justify-center w-full" : "gap-2"
                }`}
              >
                {IconComponent && (
                  <IconComponent
                    className={`w-4 h-4 ${
                      isSubmenuActive || isOpen || isActive
                        ? "text-blue-400"
                        : "text-slate-50"
                    }`}
                  />
                )}
                {!isCollapsed && (
                  <span
                    className={
                      isSubmenuActive || isOpen || isActive
                        ? "text-blue-400"
                        : "text-slate-50"
                    }
                  >
                    {item.title}
                  </span>
                )}
              </div>
              {!isCollapsed &&
                (isOpen || isSubmenuActive || isActive ? (
                  <ChevronDown className="w-4 h-4 text-blue-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-50" />
                ))}
            </button>
          </Link>

          {/* Renderizza il sottomenu */}
          {isOpen && (
            <SidebarSubmenu
              submenu={item.submenu}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          )}
        </>
      ) : (
        <Link
          href={item.href || "#"}
          onClick={onLinkClick} // Usa onLinkClick qui
          className={`${
            isActive
              ? "flex items-center gap-2 p-2 bg-blue-700 text-slate-50 rounded-md"
              : "flex items-center gap-2 p-2 hover:bg-slate-950 hover:text-slate-50 rounded-md"
          } w-full ${isCollapsed ? "justify-center" : "justify-between"}`}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center w-full" : "gap-2"
            }`}
          >
            {IconComponent && (
              <IconComponent
                className={`w-4 h-4 ${
                  isActive ? "text-slate-50" : "text-slate-50"
                }`}
              />
            )}
            {!isCollapsed && <span>{item.title}</span>}
          </div>
        </Link>
      )}
    </div>
  );
}
