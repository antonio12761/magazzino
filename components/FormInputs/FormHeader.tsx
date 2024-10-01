import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type FormHeaderProps = {
  title: string;
  href: string;
};

export default function FormHeader({ title, href }: FormHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between bg-white py-8 px-16">
        <h2 className="font-semibold text-xl">{title}</h2>
        <Link href={href} passHref>
          <X className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
