"use client";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HomeNavbar() {
  const pathname = usePathname();  
  const navlinks = [
    {
      title: "Dashboard",
      href: "/dashboard/home/overview",
    },
    {
      title: "Getting Started",
      href: "/dashboard/home/getting-started",
    },
    {
      title: "Recent Updates",
      href: "/dashboard/home/updates",
    },
    {
      title: "Announcements",
      href: "/dashboard/home/announcements",
    },
  ];
  return (
    <div className="h-32 bg-slate-50 p-5 header-bg border-b border-slate-300">
      <div className="flex space-x-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white border border-gray-300">
          <Building2 />
        </div>
        <div className="flex flex-col">
          <p className=" font-semibold text-slate-700">
            Hello, AC WEBDEVELOPER
          </p>
          <span className="text-sm">Garet</span>
        </div>
      </div>
      <nav className="sticky mt-7 space-x-4 text-sm text-slate-700">
        {navlinks.map((item, i) => {
          return (
            <Link
              key={i}
              href={item.href}
              className={`${pathname===item.href?"py-3 border-b-2 border-blue-600":"py-3 hover:border-b-2 hover:border-blue-600"}`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
