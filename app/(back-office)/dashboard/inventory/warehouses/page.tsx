"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

// Definisci il tipo per i dati del magazzino
type Warehouse = {
  id: string;
  title: string;
  location: string;
  warehouseType: string;
  description: string;
};

export default function WarehousesList() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [hoveredWarehouse, setHoveredWarehouse] = useState<Warehouse | null>(
    null
  );
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
        <h2 className="text-2xl font-semibold ml-4">Warehouses</h2>
        <Link
          href="/dashboard/inventory/warehouses/new"
          className="px-2 py-1 rounded-md text-sm text-white bg-emerald-700 hover:bg-emerald-600 flex items-center mr-4"
        >
          <Plus className="mr-1 w-4" />
          New Warehouse
        </Link>
      </div>

      <table className="min-w-full bg-white">
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id} className="relative">
              <td className="px-4 py-2 border">{warehouse.title}</td>
              <td className="px-4 py-2 border">{warehouse.location}</td>
              <td className="px-4 py-2 border">{warehouse.warehouseType}</td>
              <td className="px-4 py-2 border flex space-x-2">
                {/* Pop-up al passaggio del mouse sul pulsante View */}
                <div
                  onMouseEnter={() => setHoveredWarehouse(warehouse)}
                  onMouseLeave={() => setHoveredWarehouse(null)}
                  className="relative"
                >
                  <Link
                    href={`/dashboard/inventory/warehouses/${warehouse.id}`}
                    className="px-2 py-1 text-white bg-orange-500 rounded hover:bg-orange-400 flex items-center text-xs"
                  >
                    <Eye className="mr-1 w-4" />{" "}
                    {/* Icona Eye accanto al testo */}
                    View
                  </Link>
                  {/* Pop-up visualizzato solo al passaggio del mouse */}
                  {hoveredWarehouse && hoveredWarehouse.id === warehouse.id && (
                    <div
                      className="absolute right-full mr-2 w-64 bg-gray-100 border p-4 rounded-md shadow-lg z-10"
                      style={{ top: "-20px", transform: "translateX(-5px)" }} // Sposta verso l'alto di 10px e orizzontalmente di 5px
                    >
                      <p className="text-lg font-bold mb-2">
                        {warehouse.title}
                      </p>{" "}
                      {/* Titolo più grande e in grassetto */}
                      <p className="text-sm mb-2">{warehouse.location}</p>
                      <p className="text-sm mb-2">{warehouse.warehouseType}</p>
                      <p className="text-sm mb-2">{warehouse.description}</p>
                    </div>
                  )}
                </div>

                {/* Pulsante di modifica */}
                <Link
                  href={`/dashboard/inventory/warehouses/edit/${warehouse.id}`}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-500 flex items-center text-xs"
                >
                  <Edit className="mr-1 w-4" />{" "}
                  {/* Icona Edit accanto al testo */}
                  Edit
                </Link>

                {/* Pulsante di eliminazione */}
                <button
                  onClick={() => handleDelete(warehouse.id)}
                  className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-500 flex items-center  text-xs"
                >
                  <Trash2 className="mr-1 w-4" />{" "}
                  {/* Icona Trash accanto al testo */}
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
