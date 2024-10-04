// components/dashboard/ItemDetails.tsx

import React from "react";

type ItemDetailsProps = {
  item: {
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
  onClose: () => void;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Item Details</h2>
        <p>
          <strong>Title:</strong> {item.title}
        </p>
        <p>
          <strong>SKU:</strong> {item.sku}
        </p>
        <p>
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p>
          <strong>Selling Price:</strong> {item.sellingPrice}
        </p>
        <p>
          <strong>Buying Price:</strong> {item.buyingPrice}
        </p>
        <p>
          <strong>Tax Rate:</strong> {item.taxRate}%
        </p>
        {item.description && (
          <p>
            <strong>Description:</strong> {item.description}
          </p>
        )}
        {item.notes && (
          <p>
            <strong>Notes:</strong> {item.notes}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
