import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react"; // Import delle icone

interface HeaderProps {
  nameSection: string;
}

export default function Header({ nameSection }: HeaderProps) {
  const firstPart = nameSection.slice(0, -3);
  const endPart = nameSection.slice(-3);
  let addNameSection = "";
  if (endPart === "ies") {
    addNameSection = firstPart.concat("y");
  } else {
    addNameSection = nameSection.slice(0, -1);
  }

  const nameSectionUrl = nameSection.toLowerCase();

  return (
    <div className="flex justify-between items-center my-8 mx-16">
      <h2 className="text-2xl font-semibold">{nameSection}</h2>

      <Link href={`/dashboard/inventory/${nameSectionUrl}/new`}>
        <button className="baseButton addButton">
          <Plus className="w-4 mr-1" />
          New {addNameSection}
        </button>
      </Link>
    </div>
  );
}
