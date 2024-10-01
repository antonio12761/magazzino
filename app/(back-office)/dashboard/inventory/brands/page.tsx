"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

type Brand = {
  id: string;
  title: string;
  createdAt: string;
};

export default function BrandsList() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"createdAt" | "alphabetical">(
    "alphabetical" // Ora parte con l'ordinamento alfabetico predefinito
  );

  // Funzione per caricare i brand
  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      if (response.ok) {
        setBrands(data);
      } else {
        console.error(data.message || "Failed to load brands");
      }
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Funzione per ordinare i brand
  const sortBrands = (brands: Brand[]) => {
    if (sortOption === "alphabetical") {
      return [...brands].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...brands].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  };

  // Funzione per eliminare un brand con SweetAlert2
  const deleteBrand = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This brand will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        buttonsStyling: false, // Disattiva gli stili predefiniti di SweetAlert2
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();

          if (confirmButton) {
            confirmButton.classList.add(
              "bg-green-600", // Colore di sfondo del bottone conferma
              "hover:bg-green-700", // Colore di sfondo al passaggio del mouse
              "text-white", // Colore del testo
              "font-bold", // Grassetto per il testo
              "py-2", // Padding verticale
              "px-4", // Padding orizzontale
              "rounded", // Angoli arrotondati
              "mr-2"
            );
          }

          if (cancelButton) {
            cancelButton.classList.add(
              "bg-gray-500", // Colore di sfondo del bottone cancella
              "hover:bg-gray-600", // Colore di sfondo al passaggio del mouse
              "text-white", // Colore del testo
              "font-bold", // Grassetto per il testo
              "py-2", // Padding verticale
              "px-4", // Padding orizzontale
              "rounded" // Angoli arrotondati
            );
          }
        },
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/brands/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Aggiorna la lista dopo l'eliminazione senza alert di conferma
          fetchBrands(); // Aggiorna la lista dopo l'eliminazione
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Error",
            errorData.message || "Failed to delete brand.",
            "error"
          );
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while deleting the brand.",
        "error"
      );
      console.error("Error deleting brand:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Brands</h1>
        <Link href="/dashboard/inventory/brands/new">
          <button className="px-2 lg:px-4 py-1 lg:py-2 mb-4 flex items-center rounded-md text-white bg-emerald-700 hover:bg-emerald-600 text-xs lg:text-base">
            <Plus className="w-4 lg:w-6 mr-1 lg:mr-2" />
            New Brand
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

      {brands.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border w-1/2 sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                Title
              </th>
              <th className="px-4 py-2 border w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortBrands(brands).map((brand) => (
              <tr key={brand.id}>
                <td className="px-4 py-2 border">{brand.title}</td>
                <td className="px-4 py-2 border flex justify-center">
                  <Link href={`/dashboard/inventory/brands/edit/${brand.id}`}>
                    <button className="mr-2 px-2 py-1 text-white bg-blue-500 rounded-md text-xs lg:text-base">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteBrand(brand.id)}
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
        <p>No brands available.</p>
      )}
    </div>
  );
}
