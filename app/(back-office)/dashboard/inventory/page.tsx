import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";
import {
  Diff,
  Factory,
  LayoutPanelTop,
  Scale,
  Shirt,
  Slack,
  Warehouse,
} from "lucide-react";
import React from "react";

export default function Inventory() {
  const optionCards = [
    // {
    //   title: "Item Groups",
    //   description: "Create standalone items and services that you buy and sell",
    //   link: "/dashboard/inventory/groups",
    //   linkNew: "/dashboard/inventory/groups/new",
    //   linkNewTitle: "New Item Group",
    //   enabled: true,
    //   icon: <Component strokeWidth={0.5} className="w-36 h-36" />,
    // },
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/items",
      linkNew: "/dashboard/inventory/items/new",
      linkNewTitle: "New Item",
      enabled: true,
      icon: <Shirt strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Categories",
      description: "Bundle different items together and sell them as kits",
      link: "/dashboard/inventory/categories",
      linkNew: "/dashboard/inventory/categories/new",
      linkNewTitle: "New Category",
      enabled: true,
      icon: <LayoutPanelTop strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Brands",
      description:
        "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/brands",
      linkNew: "/dashboard/inventory/brands/new",
      linkNewTitle: "New Brand",
      enabled: true,
      icon: <Slack strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Units",
      description:
        "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/units",
      linkNew: "/dashboard/inventory/units/new",
      linkNewTitle: "New Unit",
      enabled: true,
      icon: <Scale strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Warehouse",
      description:
        "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/warehouse",
      linkNew: "/dashboard/inventory/warehouse/new",
      linkNewTitle: "New Warehouse",
      enabled: true,
      icon: <Warehouse strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Suppliers",
      description:
        "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/suppliers",
      linkNew: "/dashboard/inventory/suppliers/new",
      linkNewTitle: "New Supplier",
      enabled: true,
      icon: <Factory strokeWidth={0.5} className="w-36 h-36" />,
    },
    {
      title: "Inventory Adjustment",
      description: "Transfer stock from the Main Warehouse",
      link: "/dashboard/inventory/adjustments",
      linkNew: "/dashboard/inventory/adjustments/new",
      linkNewTitle: "New Adjustment",
      enabled: true,
      icon: <Diff strokeWidth={0.5} className="w-36 h-36" />,
    },
  ];

  return (
    <div>
      <FixedHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-16 py-8 gap-8">
        {optionCards.map((card, i) => {
          return <OptionCard key={i} optionData={card} />;
        })}
      </div>
    </div>
  );
}
