import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewBrand() {
  return (
    <div className="p-4 flex justify-between">
      <h2 className="text-3xl font-semibold">Brands</h2>
      <div className="mt-4">
        <Link
          href="/dashboard/inventory/brands/new"
          className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600 flex"
        >
          <Plus className="mr-2" />
          New Brand
        </Link>
      </div>
    </div>
  );
}
