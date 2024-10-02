// components/dashboard/Popup.tsx
import React from "react";

type PopupProps = {
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

const Popup: React.FC<PopupProps> = ({
  title,
  phone,
  email,
  address,
  contactPerson,
  supplierCode,
  paymentTerms,
  taxID,
  notes,
}) => {
  return (
    <div className="absolute left-[-110px] lg:left-[-475px] top-10 lg:-top-20 w-[18rem] lg:w-[28rem] bg-gray-100 border p-4 rounded-md shadow-lg z-10">
      {/* Title in alto */}
      <p className="font-bold mb-4">{title}</p>

      {/* Tabella per i dati */}
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Phone:</td>
            <td className="px-2 py-1 text-sm">{phone}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Email:</td>
            <td className="px-2 py-1 text-sm">{email}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Address:</td>
            <td className="px-2 py-1 text-sm">{address}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Contact Person:</td>
            <td className="px-2 py-1 text-sm">{contactPerson}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Supplier Code:</td>
            <td className="px-2 py-1 text-sm">{supplierCode}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Payment Terms:</td>
            <td className="px-2 py-1 text-sm">{paymentTerms}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Tax ID:</td>
            <td className="px-2 py-1 text-sm">{taxID}</td>
          </tr>
          <tr>
            <td className="px-2 py-1 text-sm font-medium">Notes:</td>
            <td className="px-2 py-1 text-sm">{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Popup;
