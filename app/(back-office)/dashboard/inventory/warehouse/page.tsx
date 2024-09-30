"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Definisci il tipo per i dati del magazzino
type Warehouse = {
  id: string;
  title: string;
  location: string;
  warehouseType: string;
  description: string;
};

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  // Funzione per caricare i dati dei magazzini
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch("/api/warehouses");
        const data = await response.json();
        setWarehouses(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load warehouses");
        console.error("Error loading warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  // Funzione per gestire la cancellazione del magazzino
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/warehouses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Warehouse deleted successfully!");
        setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
      } else {
        toast.error("Failed to delete warehouse.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the warehouse.");
      console.error("Error deleting warehouse:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-semibold">Warehouse</h2>
        <div className="mt-4">
          <Link
            href="/dashboard/inventory/warehouse/new"
            className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600"
          >
            New Warehouse
          </Link>
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td className="px-4 py-2 border">{warehouse.title}</td>
              <td className="px-4 py-2 border">{warehouse.location}</td>
              <td className="px-4 py-2 border">{warehouse.warehouseType}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <Link
                  href={`/dashboard/inventory/warehouse/edit/${warehouse.id}`}
                  className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(warehouse.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
