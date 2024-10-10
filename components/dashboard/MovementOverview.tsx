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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-8 text-center">
        Movement Overview
      </h1>

      <div className="flex space-x-4 w-full max-w-4xl">
        {/* Pulsante Nuovo Incasso */}
        <button
          className="flex-1 px-6 py-4 text-blue-600 hover:text-white hover:bg-blue-600 ring-1 ring-blue-600  rounded-lg shadow-lg"
          onClick={() => setIsIncassoOpen(true)}
        >
          <span className="block text-lg font-semibold">Nuovo Incasso</span>
          <span className="block text-sm font-light mt-1">
            Rilevato dalla chiusura del giorno
          </span>
        </button>

        {/* Pulsante Nuova Spesa */}
        <button
          className="flex-1 px-6 py-4 text-red-600 ring-1 ring-red-600 hover:bg-red-600 hover:text-white rounded-lg shadow-lg"
          onClick={() => setIsSpesaOpen(true)}
        >
          <span className="block text-lg font-semibold">Nuova Spesa</span>
          <span className="block text-sm font-light mt-1">
            Tutte le spese, sia fatture che altro
          </span>
        </button>

        {/* Pulsante Nuovo Ordine */}
        <button
          className="flex-1 px-6 py-4  text-emerald-600 ring-1 ring-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg shadow-lg"
          onClick={() => setIsOrdineOpen(true)}
        >
          <span className="block text-lg font-semibold">Nuovo Ordine</span>
          <span className="block text-sm font-light mt-1">
            Ordini dei prodotti ai fornitori
          </span>
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
