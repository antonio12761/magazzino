// components/dashboard/ItemPopup.tsx

import React from "react";

type ItemPopupProps = {
  title: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
  buyingPrice: number;
  taxRate: number;
};

const ItemPopup: React.FC<ItemPopupProps> = ({
  title,
  sku,
  quantity,
  sellingPrice,
  buyingPrice,
  taxRate,
}) => {
  return (
    <div className="absolute z-10 bg-white shadow-lg border rounded-md p-4 w-64">
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>SKU:</strong> {sku}
      </p>
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>
      <p>
        <strong>Selling Price:</strong> {sellingPrice}
      </p>
      <p>
        <strong>Buying Price:</strong> {buyingPrice}
      </p>
      <p>
        <strong>Tax Rate:</strong> {taxRate}%
      </p>
    </div>
  );
};

export default ItemPopup;
