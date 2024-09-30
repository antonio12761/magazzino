import Link from "next/link";
import React from "react";

export default function Supplier() {
  return (
    <div className="p-4 flex justify-between">
      <h2 className="text-3xl font-semibold">Supplier</h2>
      <div className="mt-4">
        <Link
          href="/dashboard/inventory/suppliers/new"
          className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600"
        >
          New Supplier
        </Link>
      </div>
    </div>
  );
}
