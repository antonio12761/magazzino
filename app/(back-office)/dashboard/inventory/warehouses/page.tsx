"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import Header from "@/components/dashboard/Header";

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
    <div className="py-8 px-4 max-w-full overflow-x-hidden min-h-screen">
      <Header nameSection="Warehouses" />
      <table className="min-w-full bg-white">
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id} className="relative">
              <td className="px-4 py-2 border">{warehouse.title}</td>
              <td className="px-4 py-2 border hidden sm:table-cell">
                {warehouse.location}
              </td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {warehouse.warehouseType}
              </td>
              <td className="px-4 py-2 border flex space-x-2 justify-center items-center w-auto">
                {/* Pop-up al passaggio del mouse sul pulsante View */}
                <div
                  onMouseEnter={() => setHoveredWarehouse(warehouse)}
                  onMouseLeave={() => setHoveredWarehouse(null)}
                  className="relative"
                >
                  <Link
                    href={`/dashboard/inventory/warehouses/${warehouse.id}`}
                    className="baseButton viewButton"
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
                  className="baseButton editButton"
                >
                  <Edit className="mr-1 w-4" />{" "}
                  {/* Icona Edit accanto al testo */}
                  Edit
                </Link>

                {/* Pulsante di eliminazione */}
                <button
                  onClick={() => handleDelete(warehouse.id)}
                  className="baseButton deleteButton"
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
