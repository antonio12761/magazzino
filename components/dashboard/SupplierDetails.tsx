// components/SupplierDetails.tsx
import React from "react";

type SupplierDetailsProps = {
  supplier: {
    title: string;
    phone: string;
    email: string;
    address: string;
    contactPerson: string;
    supplierCode: string;
    paymentTerms: string;
    taxID: string;
    notes: string;
  };
  onClose: () => void;
};

const SupplierDetails: React.FC<SupplierDetailsProps> = ({
  supplier,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white w-full max-w-lg mx-auto p-8 rounded-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{supplier.title}</h2>
        <table className="min-w-full bg-white border">
          <tbody>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Phone:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.phone}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Email:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Address:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.address}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Contact Person:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.contactPerson}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Supplier Code:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.supplierCode}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Payment Terms:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.paymentTerms}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Tax ID:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.taxID}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">
                <strong>Notes:</strong>
              </td>
              <td className="px-4 py-2 border">{supplier.notes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDetails;
