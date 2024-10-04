"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react"; // Import delle icone
import toast from "react-hot-toast";
import Header from "@/components/dashboard/Header";

// Definisci il tipo per i dati del brand
type Brand = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export default function BrandsList() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Funzione per caricare i dati dei brand
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const data = await response.json();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load brands");
        console.error("Error loading brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Funzione per gestire la cancellazione del brand
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Brand deleted successfully!");
        setBrands(brands.filter((brand) => brand.id !== id));
      } else {
        toast.error("Failed to delete brand.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the brand.");
      console.error("Error deleting brand:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-4 max-w-full overflow-x-hidden">
      <Header nameSection="Brands" />
      <table className="min-w-full bg-white">
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="px-4 py-2 border w-10/12">{brand.title}</td>

              <td className="px-4 py-2 border flex justify-end space-x-2 ">
                <Link
                  href={`/dashboard/inventory/brands/edit/${brand.id}`}
                  className="baseButton editButton"
                >
                  <Edit className="mr-1 w-4" />{" "}
                  {/* Icona Edit accanto al testo */}
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(brand.id)}
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
