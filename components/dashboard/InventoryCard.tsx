import React from "react";

interface SalesActivityCardProps {
  item: {
    title: string;
    number: number;
  };
}

const InventoryCard: React.FC<SalesActivityCardProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center rounded-lg bg-white border-2 border-slate-200 hover:border-blue-400 px-4 py-2 cursor-pointer transition-all duration-300 shadow">
      <h3 className="uppercase text-gray-500">{item.title}</h3>
      <h4 className="text-3xl">{item.number}</h4>
    </div>
  );
};

export default InventoryCard;
