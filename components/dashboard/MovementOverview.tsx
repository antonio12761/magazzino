"use client";

import React, { useState } from "react";
import NewIncasso from "@/components/dashboard/NewIncasso";
import NewSpesa from "@/components/dashboard/NewSpesa";
import NewOrdine from "@/components/dashboard/NewOrdine";

export default function MovementOverview() {
  const [isIncassoOpen, setIsIncassoOpen] = useState(false);
  const [isSpesaOpen, setIsSpesaOpen] = useState(false);
  const [isOrdineOpen, setIsOrdineOpen] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Movement Overview</h1>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsIncassoOpen(true)}
        >
          Nuovo Incasso
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setIsSpesaOpen(true)}
        >
          Nuova Spesa
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={() => setIsOrdineOpen(true)}
        >
          Nuovo Ordine
        </button>
      </div>

      {/* Modali */}
      <NewIncasso
        isOpen={isIncassoOpen}
        onClose={() => setIsIncassoOpen(false)}
      />
      <NewSpesa isOpen={isSpesaOpen} onClose={() => setIsSpesaOpen(false)} />
      <NewOrdine isOpen={isOrdineOpen} onClose={() => setIsOrdineOpen(false)} />
    </div>
  );
}
