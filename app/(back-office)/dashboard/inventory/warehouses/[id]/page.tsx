"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Warehouse = {
  id: string;
  title: string;
  location: string;
  description: string;
  warehouseType: string;
};

export default function WarehouseDetail() {
  const { id } = useParams(); // Ottiene l'ID dalla rotta
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);

  // Carica i dati del magazzino
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await fetch(`/api/warehouses/${id}`);
        const data = await response.json();
        setWarehouse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading warehouse:", error);
      }
    };

    fetchWarehouse();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!warehouse) return <p>Warehouse not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">{warehouse.title}</h1>
      <p className="mt-4">
        <strong>Location:</strong> {warehouse.location}
      </p>
      <p className="mt-2">
        <strong>Type:</strong> {warehouse.warehouseType}
      </p>
      <p className="mt-2">
        <strong>Description:</strong> {warehouse.description}
      </p>

      <div className="mt-6">
        <Link
          href="/dashboard/inventory/warehouses"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
