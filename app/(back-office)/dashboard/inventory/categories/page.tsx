//   inventory/category
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import withReactContent from "sweetalert2-react-content"; // SweetAlert con supporto React
import "sweetalert2/dist/sweetalert2.min.css"; // Importa il CSS di SweetAlert2
// Definisci il tipo per i dati delle categorie
type Category = {
  id: string;
  title: string;
  description: string;
};

const MySwal = withReactContent(Swal); // Inizializza SweetAlert2 con React

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Funzione per caricare i dati delle categorie
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
  
        // Verifica che la risposta sia OK (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const data = await response.json();
  
        // Controlla se la risposta contiene un array
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error("Invalid data format");
        }
  
        setLoading(false);
      } catch (error) {
        // Controllo se l'errore è un'istanza di Error
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error loading categories: ${errorMessage}`,
        });
  
        console.error("Error loading categories:", errorMessage);
        setLoading(false); // Assicurati che il caricamento termini anche in caso di errore
      }
    };
  
    fetchCategories();
  }, []);
  
  // Funzione per gestire la cancellazione della categoria
  const handleDelete = async (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/categories?id=${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            MySwal.fire(
              "Deleted!",
              "Your category has been deleted.",
              "success"
            );
            setCategories(categories.filter((category) => category.id !== id));
          } else {
            const errorData = await response.json();
            MySwal.fire({
              icon: "error",
              title: "Failed to delete category",
              text: errorData.message || "Failed to delete category.",
            });
          }
        } catch (error) {
          MySwal.fire({
            icon: "error",
            title: "An error occurred",
            text: "An error occurred while deleting the category.",
          });
          console.error("Error deleting category:", error);
        }
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!categories.length) {
    return <p>No categories found.</p>; // Mostra un messaggio se non ci sono categorie
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Category</h2>
        <div className="mt-4">
          <Link
            href="/dashboard/inventory/categories/new"
            className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600"
          >
            New Category
          </Link>
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-2 border">{category.title}</td>
              <td className="px-4 py-2 border">{category.description}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <Link
                  href={`/dashboard/inventory/categories/edit/${category.id}`} // Modifica il link per puntare alla pagina di modifica
                  className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
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
