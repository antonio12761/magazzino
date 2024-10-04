"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Edit, Plus, Trash2 } from "lucide-react";
import Header from "@/components/dashboard/Header";

type Category = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"createdAt" | "alphabetical">(
    "alphabetical"
  );

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        console.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const sortCategories = (categories: Category[]) => {
    if (sortOption === "alphabetical") {
      return [...categories].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...categories].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This category will be deleted!",
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
        const response = await fetch(`/api/categories/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchCategories();
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Error",
            errorData.message || "Failed to delete category.",
            "error"
          );
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while deleting the category.",
        "error"
      );
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-4 max-w-full overflow-x-hidden">
      <Header nameSection="Categories"/>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 ml-4 text-sm">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as "createdAt" | "alphabetical")
          }
          className="w-36 border text-sm border-gray-300 rounded px-2 py-1"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="createdAt">Date Created</option>
        </select>
      </div>

      {categories.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border">
            <tbody>
              {sortCategories(categories).map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 border text-center w-3/12">
                    {category.title}
                  </td>

                  {/* Dynamically truncate the description to show only `...` when narrow */}
                  <td className="px-4 py-2 border truncate text-ellipsis whitespace-nowrap overflow-hidden max-w-none lg:max-w-[400px] md:max-w-[300px] sm:max-w-[150px]">
                    {category.description ? (
                      <span className="sm:hidden">
                        {category.description.slice(0, 20)}...
                      </span>
                    ) : (
                      <span className="sm:hidden">No description...</span>
                    )}
                    <span className="hidden sm:inline">
                      {category.description || "No description available"}
                    </span>{" "}
                    {/* Testo completo su schermi medi e grandi */}
                  </td>

                  <td className="px-4 py-2 border flex justify-center space-x-2">
                    <Link
                      href={`/dashboard/inventory/categories/edit/${category.id}`}
                    >
                      <button className="baseButton editButton">
                        <Edit className="mr-1 w-4" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="baseButton deleteButton"
                    >
                      <Trash2 className="mr-1 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}
