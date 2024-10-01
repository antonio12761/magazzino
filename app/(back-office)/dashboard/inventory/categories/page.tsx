"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

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
    <div className="py-8 px-4 lg:px-16 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Categories</h1>
        <Link href="/dashboard/inventory/categories/new">
          <button className="px-2 lg:px-4 py-1 lg:py-2 mb-4 flex items-center rounded-md text-white bg-emerald-700 hover:bg-emerald-600 text-xs lg:text-base">
            <Plus className="w-4 lg:w-6 mr-1 lg:mr-2" />
            New Category
          </button>
        </Link>
      </div>

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

      {categories.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border">
            <thead>
              <tr>
                <th className="w-1/4 px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="w-1/4 px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortCategories(categories).map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 border">{category.title}</td>

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
                      <button className="mr-2 px-2 py-1 text-white bg-blue-500 rounded-md text-xs lg:text-base">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCategory(category.id)}
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
        <p>No categories available.</p>
      )}
    </div>
  );
}
