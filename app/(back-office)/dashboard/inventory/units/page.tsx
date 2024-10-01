"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

type Unit = {
  id: string;
  title: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;

};

export default function UnitsList() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  // Funzione per caricare le unità
  const fetchUnits = async () => {
    try {
      const response = await fetch("/api/units");
      const data = await response.json();
      if (response.ok) {
        setUnits(data);
      } else {
        console.error(data.message || "Failed to load units");
      }
    } catch (error) {
      console.error("Error loading units:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-4 lg:px-16 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Units</h1>
        <Link href="/dashboard/inventory/units/new">
          <button className="px-4 py-2 mb-4 flex items-center rounded-md text-white bg-emerald-700 hover:bg-emerald-600">
            <Plus className="mr-2" />
            New Unit
          </button>
        </Link>
      </div>

      {units.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Abbreviation</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id}>
                  <td className="px-4 py-2 border">{unit.title}</td>
                  <td className="px-4 py-2 border">{unit.abbreviation}</td>
                  <td className="px-4 py-2 border flex justify-center space-x-2">
                    <Link href={`/dashboard/inventory/units/edit/${unit.id}`}>
                      <button className="mr-2 px-2 py-1 text-white bg-blue-500 rounded-md text-xs lg:text-base">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteUnit(unit.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded-md text-xs lg:text-base"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No units available.</p>
      )}
    </div>
  );
}

// Funzione per eliminare un'unità
const deleteUnit = async (id: string) => {
  try {
    const response = await fetch(`/api/units/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Aggiorna la lista dopo l'eliminazione
      fetchUnits();
    } else {
      const errorData = await response.json();
      console.error(errorData.message || "Failed to delete unit");
    }
  } catch (error) {
    console.error("Error deleting unit:", error);
  }
};
