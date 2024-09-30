import React from "react";
import clsx from "clsx";

// Definiamo il tipo delle props
interface SalesActivityCardProps {
  item: {
    title: string;
    number: number;
    unit: string;
    href: string;
    color: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Tipizzazione corretta dell'icona
  };
}

const SalesActivityCard: React.FC<SalesActivityCardProps> = ({ item }) => {
  const IconComponent = item.icon; // Estrai l'icona dinamica

  return (
    <a
      href={item.href}
      className={clsx(
        "flex flex-col items-center rounded-lg bg-white border-2 border-slate-200 p-2 cursor-pointer transition-all duration-300 shadow",
        `hover:border-${item.color}` // Cambia il bordo su hover
      )}
    >
      <h4 className={clsx("text-4xl font-semibold mt-4", `text-${item.color}`)}>
        {item.number}
      </h4>
      <small className="text-gray-400 mt-4">{item.unit}</small>
      <div className="flex items-center space-x-2 text-gray-500 mt-2 mb-2">
        <IconComponent className="w-4 h-4 text-gray-400" />{" "}
        {/* Renderizza l'icona */}
        <span className="uppercase text-gray-500 text-xs">{item.title}</span>
      </div>
    </a>
  );
};

export default SalesActivityCard;
