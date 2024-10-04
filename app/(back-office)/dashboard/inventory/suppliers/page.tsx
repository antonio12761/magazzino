"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react"; // Import delle icone
import toast from "react-hot-toast";
import Popup from "../../../../../components/dashboard/Popup"; // Import del componente Popup
import SupplierDetails from "../../../../../components/dashboard/SupplierDetails"; // Import del componente SupplierDetails
import Header from "@/components/dashboard/Header";

// Definisci il tipo per i dati del fornitore
type Supplier = {
  id: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  contactPerson: string;
  supplierCode: string;
  paymentTerms: string;
  taxID: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSupplier, setHoveredSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  ); // Stato per la scheda

  // Funzione per caricare i dati dei fornitori
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers");
        const data = await response.json();
        setSuppliers(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load suppliers");
        console.error("Error loading suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  // Funzione per gestire la cancellazione del fornitore
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Supplier deleted successfully!");
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
      } else {
        toast.error("Failed to delete supplier.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the supplier.");
      console.error("Error deleting supplier:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-8 px-4 max-w-full overflow-x-hidden min-h-screen">
      <Header nameSection="Suppliers" />

      <table className="min-w-full bg-white">
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="relative">
              <td className="px-4 py-2 border w-10/12">{supplier.title}</td>
              <td className="px-4 py-2 border flex space-x-2 justify-center items-center w-auto">
                {/* View button */}
                <div
                  onMouseEnter={() => setHoveredSupplier(supplier)}
                  onMouseLeave={() => setHoveredSupplier(null)}
                  className="relative"
                >
                  <button
                    onClick={() => setSelectedSupplier(supplier)} // Mostra scheda al clic
                    className="baseButton viewButton"
                  >
                    <Eye className="mr-1 w-4" /> View
                  </button>

                  {/* Popup visibile al passaggio del mouse */}
                  {hoveredSupplier && hoveredSupplier.id === supplier.id && (
                    <Popup
                      title={supplier.title}
                      phone={supplier.phone}
                      email={supplier.email}
                      address={supplier.address}
                      contactPerson={supplier.contactPerson}
                      supplierCode={supplier.supplierCode}
                      paymentTerms={supplier.paymentTerms}
                      taxID={supplier.taxID}
                      notes={supplier.notes}
                    />
                  )}
                </div>

                {/* Edit button */}
                <Link
                  href={`/dashboard/inventory/suppliers/edit/${supplier.id}`}
                  className="baseButton editButton"
                >
                  <Edit className="mr-1 w-4" /> Edit
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="baseButton deleteButton"
                >
                  <Trash2 className="mr-1 w-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scheda dettagli del fornitore */}
      {selectedSupplier && (
        <SupplierDetails
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)} // Nascondi la scheda al clic su "Close"
        />
      )}
    </div>
  );
}
