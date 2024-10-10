import React, { useState, useEffect } from "react";
import FormIncasso from "./incasso/FormIncasso";
import PieCharts from "./incasso/PieCharts";

interface NewIncassoProps {
  isOpen: boolean; // Definiamo il tipo per isOpen
  onClose: () => void; // Definiamo il tipo per onClose
}

export default function NewIncasso({ isOpen, onClose }: NewIncassoProps) {
  const [totaliPrecedenti, setTotaliPrecedenti] = useState({
    totaleIncasso: 0,
    totaleElettronico: 0,
    totaleContanti: 0,
    totaleEccedenza: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/totali-fino-ad-ieri");
        if (response.ok) {
          const data = await response.json();
          console.log("Dati caricati:", data); // Log per controllare i dati
          setTotaliPrecedenti({
            totaleIncasso: parseFloat(data.totaleIncasso), // Converti in numero
            totaleElettronico: parseFloat(data.totaleElettronico), // Converti in numero
            totaleContanti: parseFloat(data.totaleContanti), // Converti in numero
            totaleEccedenza: Math.max(
              parseFloat(data.totaleContanti) - parseFloat(data.totaleIncasso),
              0
            ), // Calcola eccedenza
          });
        } else {
          console.error("Errore nel caricamento dei dati", response.status);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
      }
    }
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full text-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-bold text-center">Nuovo Incasso</h2>

        <FormIncasso onClose={onClose} />

        <div className="flex justify-between mb-6">
          <PieCharts totaliPrecedenti={totaliPrecedenti} />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Salva
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
