import { SVGProps } from "react";
import {
  Home,
  BaggageClaim,
  ShoppingCart,
  ShoppingBag,
  ChartNoAxesCombined,
  FolderClosed,
  Blocks,
} from "lucide-react";

// Definizione dei link della sidebar
export const sidebarLinks = [
  {
    title: "Home",
    href: "/dashboard/home/overview",
    icon: (props: SVGProps<SVGSVGElement>) => <Home {...props} />, // Qui usiamo JSX.Element
  },
  {
    title: "Incassi",
    href: "/dashboard/incassi",
    icon: (props: SVGProps<SVGSVGElement>) => <Home {...props} />,
  },
  {
    title: "Inventory",
    icon: (props: SVGProps<SVGSVGElement>) => <BaggageClaim {...props} />,
    href: "/dashboard/inventory", // Qui usiamo JSX.Element
    submenu: [
      // {
      //   title: "All",
      //   href: "/dashboard/inventory",
      // },
      // {
      //   title: "Item Groups",
      //   href: "/dashboard/inventory/groups",
      // },
      {
        title: "Items",
        href: "/dashboard/inventory/items",
      },
      {
        title: "Categories",
        href: "/dashboard/inventory/categories",
      },
      {
        title: "Brands",
        href: "/dashboard/inventory/brands",
      },
      {
        title: "Units",
        href: "/dashboard/inventory/units",
      },
      {
        title: "Warehouse",
        href: "/dashboard/inventory/warehouses",
      },
      {
        title: "Adjustment",
        href: "/dashboard/inventory/adjustments",
      },
      {
        title: "Supplier",
        href: "/dashboard/inventory/suppliers",
      },
    ],
  },
  {
    title: "Sales",
    icon: (props: SVGProps<SVGSVGElement>) => <ShoppingCart {...props} />,
    href: "/dashboard/sales", // Qui usiamo JSX.Element
    submenu: [
      { title: "Customers", href: "/dashboard/sales/customers" },
      { title: "Sales Orders", href: "/dashboard/sales/orders" },
      { title: "Packages", href: "/dashboard/sales/packages" },
      { title: "Shipments", href: "/dashboard/sales/shipments" },
      { title: "Invoices", href: "/dashboard/sales/invoices" },
      { title: "Sales Receipts", href: "/dashboard/sales/receipts" },
      { title: "Payments Received", href: "/dashboard/sales/received" },
      { title: "Sales  Returns", href: "/dashboard/sales/returns" },
      { title: "Credit Notes", href: "/dashboard/sales/notes" },
    ],
  },
  {
    title: "Purchases",
    icon: (props: SVGProps<SVGSVGElement>) => <ShoppingBag {...props} />,
    href: "/dashboard/purchases", // Qui usiamo JSX.Element
    submenu: [
      { title: "New Purchase", href: "/dashboard/purchases/new" },
      { title: "Purchase History", href: "/dashboard/purchases/history" },
    ],
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: (props: SVGProps<SVGSVGElement>) => <Blocks {...props} />, // Qui usiamo JSX.Element
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <ChartNoAxesCombined {...props} />
    ), // Qui usiamo JSX.Element
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: (props: SVGProps<SVGSVGElement>) => <FolderClosed {...props} />, // Qui usiamo JSX.Element
  },
  {
    title: "Upload da cvs",
    href: "/dashboard/uploads",
    icon: (props: SVGProps<SVGSVGElement>) => <FolderClosed {...props} />,
  },
];
