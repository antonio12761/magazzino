"use client";

import Link from "next/link";
import React from "react";

// Definisci il tipo per optionData
type OptionDataType = {
  title: string;
  description: string;
  link: string;
  linkNew: string;
  linkNewTitle: string;
  enabled: boolean;
  icon?: React.ReactNode; // Se icon è opzionale
};

type OptionCardProps = {
  optionData: OptionDataType;
};

export default function OptionCard({ optionData }: OptionCardProps) {
  const { title, description, link, linkNew, linkNewTitle, enabled, icon } =
    optionData;
  return (
    <div className="shadow-md bg-white flex flex-col justify-center items-center gap-4 rounded p-6">
      <Link href={link} className="flex flex-col items-center justify-center">
        <h2 className=" font-semibold text-xl">{title}</h2>
        <div>{icon}</div>
      </Link>
      <p className="line-clamp-2 text-center">{description}</p>

      {enabled ? (
        <Link
          href={linkNew}
          className="px-4 py-2 bg-blue-600 rounded-lg inline-flex items-center text-slate-50 space-x-2 text-sm"
        >
          <h2>{linkNewTitle}</h2>
        </Link>
      ) : (
        <button className="px-4 py-2 bg-blue-600 rounded-lg  inline-flex items-center text-slate-50 space-x-2 text-sm">
          Enable
        </button>
      )}
    </div>
  );
}
