import { CircleCheck, CircleMinus, CircleStop, CircleDot } from "lucide-react";
import React from "react";
import SalesActivityCard from "@/components/dashboard/SalesActivityCard";
import InventoryCard from "@/components/dashboard/InventoryCard";

export default function SalesOverview() {
  const salesActivity = [
    {
      title: "To be Packed",
      number: 10,
      unit: "Qty",
      href: "#",
      color: "blue-500",
      icon: (props: any) => <CircleCheck {...props} />,
    },
    {
      title: "To be Shipped",
      number: 4,
      unit: "Pkgs",
      href: "#",
      color: "red-500",
      icon: (props: any) => <CircleStop {...props} />,
    },
    {
      title: "To be Delivered",
      number: 6,
      unit: "Pkgs",
      href: "#",
      color: "green-500",
      icon: (props: any) => <CircleMinus {...props} />,
    },
    {
      title: "To be Invoiced",
      number: 8,
      unit: "Qty",
      href: "#",
      color: "orange-500",
      icon: (props: any) => <CircleDot {...props} />,
    },
  ];

  const inventorySummary = [
    {
      title: "Quantity in Hand",
      number: 12,
    },
    {
      title: "Quantity to be Recevied",
      number: 7,
    },
  ];

  return (
    <div className="bg-blue-50 border-b border-slate-300 p-6 grid grid-cols-12 gap-4">
      {/** Sales Activity */}
      <div className="col-span-8 border-r border-slate-300 p-4">
        <h1 className="mb-6 text-xl">Sales Activity</h1>
        <div className="pr-8 grid grid-cols-4 gap-4">
          {salesActivity.map((item, i) => {
            return <SalesActivityCard item={item} key={i} />;
          })}
        </div>
      </div>
      {/** Inventory Summary */}
      <div className=" col-span-4 p-4">
        <h1 className="mb-6 text-xl">Inventory Summary</h1>
        <div className="flex flex-col gap-4">
          {inventorySummary.map((item, i) => {
            return (
            <InventoryCard item={item} key={i} />
            )
          })}
        </div>
      </div>
    </div>
  );
}
