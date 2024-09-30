//   inventory/category/edit/[id]
"use client"; // Indica che questo componente deve essere eseguito lato client

import { useRouter, useParams } from "next/navigation"; // Usa useParams per prendere l'ID dalla rotta
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

const MySwal = withReactContent(Swal);

type Category = {
  id: string;
  title: string;
  description: string;
};

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams(); // Usa useParams per ottenere l'ID dalla rotta

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Funzione per caricare la categoria dal server
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/categories/${id}`);
          if (!response.ok) {
            throw new Error("Failed to load category data");
          }
          const data = await response.json();

          // Se i dati della categoria non sono trovati
          if (!data) {
            throw new Error("Category not found");
          }

          setCategory(data);
          setTitle(data.title);
          setDescription(data.description);
          setLoading(false);
        } catch (error) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
          setLoading(false);
          console.error("Error loading category:", error);
        }
      };

      fetchCategory();
    }
  }, [id]);

  // Funzione per gestire l'aggiornamento della categoria
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        MySwal.fire("Updated!", "Category updated successfully", "success");
        router.push("/dashboard/inventory/categories"); // Torna alla lista delle categorie
      } else {
        const errorData = await response.json();
        MySwal.fire({
          icon: "error",
          title: "Failed to update category",
          text: errorData.message || "Failed to update category.",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "An error occurred",
        text: "An error occurred while updating the category.",
      });
      console.error("Error updating category:", error);
    }
  };

  if (loading) return <p>Loading...</p>; // Mostra il messaggio di caricamento

  if (!category) return <p>Category not found</p>; // Mostra un messaggio se la categoria non esiste

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Edit Category</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-emerald-700 hover:bg-emerald-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
}
