"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ItemPopup from "../../../../../components/dashboard/ItemPopup";
import ItemDetails from "../../../../../components/dashboard/ItemDetails";
import Header from "@/components/dashboard/Header";

type Item = {
  id: string;
  title: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
  buyingPrice: number;
  taxRate: number;
  description?: string;
  notes?: string;
};

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Carica i dati degli item
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data.items);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load items");
        console.error("Error loading items:", error);
      }
    };

    fetchItems();
  }, []);

  // Funzione per cancellare un item
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Item deleted successfully!");
        setItems(items.filter((item) => item.id !== id));
      } else {
        toast.error("Failed to delete item.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item.");
      console.error("Error deleting item:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-4 max-w-full overflow-x-hidden min-h-screen">
      <Header nameSection="Items" />

      <table className="min-w-full bg-white">
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="relative">
              <td className="px-4 py-2 border w-10/12">{item.title}</td>
              <td className="px-4 py-2 border flex justify-end space-x-2">
                {/* View button */}
                <div
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <button
                    onClick={() => setSelectedItem(item)} // Mostra scheda al clic
                    className="baseButton viewButton"
                  >
                    <Eye className="mr-1 w-4" /> View
                  </button>

                  {/* Popup visibile al passaggio del mouse */}
                  {hoveredItem && hoveredItem.id === item.id && (
                    <ItemPopup
                      title={item.title}
                      sku={item.sku}
                      quantity={item.quantity}
                      sellingPrice={item.sellingPrice}
                      buyingPrice={item.buyingPrice}
                      taxRate={item.taxRate}
                    />
                  )}
                </div>

                {/* Edit button */}
                <Link
                  href={`/dashboard/inventory/items/edit/${item.id}`}
                  className="baseButton editButton"
                >
                  <Edit className="mr-1 w-4" /> Edit
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="baseButton deleteButton"
                >
                  <Trash2 className="mr-1 w-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scheda dettagli dell'item */}
      {selectedItem && (
        <ItemDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)} // Nascondi la scheda al clic su "Close"
        />
      )}
    </div>
  );
}
