import Link from "next/link";
import { SVGProps } from "react";

// Tipi per le props che SidebarSubmenu riceve
type SidebarSubmenuProps = {
  submenu: {
    title: string;
    href: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
  pathname: string;
  isCollapsed: boolean;
};

export function SidebarSubmenu({
  submenu,
  pathname,
  isCollapsed,
}: SidebarSubmenuProps) {
  return (
    <div
      className={`${
        isCollapsed ? "hidden" : "pl-7 flex flex-col space-y-2"
      } transition-all duration-300 ease-in-out`}
    >
      {submenu.map((subItem, j) => {
        const isSubItemActive = pathname === subItem.href;
        const IconComponent = subItem.icon; // Estrai l'icona del sottomenu, se esiste

        return (
          <Link
            key={j}
            href={subItem.href}
            className={`${
              isSubItemActive
                ? "flex items-center p-2 bg-blue-700 text-slate-50 rounded-md"
                : "flex items-center p-2 hover:bg-slate-950 hover:text-slate-50 rounded-md"
            }`}
          >
            {IconComponent && (
              <IconComponent className="w-4 h-4 mr-2 text-slate-50" />
            )}
            <span>{subItem.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
