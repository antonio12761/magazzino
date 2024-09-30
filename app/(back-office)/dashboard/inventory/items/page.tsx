import Link from "next/link";
import React from "react";

export default function Items() {
  return (
    <div className="p-4 flex justify-between">
      <h2 className="text-3xl font-semibold">Items</h2>
      <div className="mt-4">
        <Link
          href="/dashboard/inventory/items/new"
          className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600"
        >
          New Item
        </Link>
      </div>
    </div>
  );
}
