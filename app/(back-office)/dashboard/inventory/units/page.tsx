"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
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
  const [sortOption, setSortOption] = useState<"createdAt" | "alphabetical">(
    "alphabetical" // Ordinamento alfabetico predefinito
  );

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

  // Funzione per ordinare le unità
  const sortUnits = (units: Unit[]) => {
    if (sortOption === "alphabetical") {
      return [...units].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...units].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  };

  // Funzione per eliminare un'unità con SweetAlert2
  const deleteUnit = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This unit will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        buttonsStyling: false,
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();

          if (confirmButton) {
            confirmButton.classList.add(
              "bg-green-600",
              "hover:bg-green-700",
              "text-white",
              "font-bold",
              "py-2",
              "px-4",
              "rounded",
              "mr-2"
            );
          }

          if (cancelButton) {
            cancelButton.classList.add(
              "bg-gray-500",
              "hover:bg-gray-600",
              "text-white",
              "font-bold",
              "py-2",
              "px-4",
              "rounded"
            );
          }
        },
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/units/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Aggiorna la lista dopo l'eliminazione
          fetchUnits();
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Error",
            errorData.message || "Failed to delete unit.",
            "error"
          );
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while deleting the unit.",
        "error"
      );
      console.error("Error deleting unit:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Units</h1>
        <Link href="/dashboard/inventory/units/new">
          <button className="px-2 lg:px-4 py-1 lg:py-2 mb-4 flex items-center rounded-md text-white bg-emerald-700 hover:bg-emerald-600 text-xs lg:text-base">
            <Plus className="w-4 lg:w-6 mr-1 lg:mr-2" />
            New Unit
          </button>
        </Link>
      </div>

      {/** Selettore per il tipo di ordinamento */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as "createdAt" | "alphabetical")
          }
          className="w-40 border border-gray-300 rounded px-2 py-1"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="createdAt">Date Created</option>
        </select>
      </div>

      {units.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border w-1/2 sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                Title
              </th>
              <th className="px-4 py-2 border w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                Abbreviation
              </th>
              <th className="px-4 py-2 border w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortUnits(units).map((unit) => (
              <tr key={unit.id}>
                <td className="px-4 py-2 border">{unit.title}</td>
                <td className="px-4 py-2 border">{unit.abbreviation}</td>
                <td className="px-4 py-2 border flex justify-center">
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
      ) : (
        <p>No units available.</p>
      )}
    </div>
  );
}
