"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

interface Record {
  id: number;
  giorno: string;
  incasso: number;
  elettronico: number;
  contanti: number;
}

const DailyIncassi = () => {
  // Stato per memorizzare i record filtrati
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Recupera i record dal database ordinandoli per la data nel campo "giorno" in ordine ascendente
        const records = await fetch("/api/incassi").then((res) => res.json());

        // Converte i valori in numeri e prepara i record per lo stato
        const formattedRecords = records.map((record: any) => ({
          id: record.id,
          giorno: record.giorno,
          incasso: Number(record.incasso),
          elettronico: Number(record.elettronico),
          contanti: Number(record.contanti),
        }));

        setRecords(formattedRecords);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []); // Effetto eseguito solo al primo rendering

  // Raggruppa i record per anno e mese
  const recordsByYear = records.reduce((acc, record) => {
    const date = new Date(record.giorno);
    const yearKey = date.getFullYear(); // Ottiene l'anno
    const monthKey = date.toLocaleString("it-IT", {
      month: "long",
    }); // Ottiene il mese come nome lungo

    // Se l'anno non esiste ancora, lo aggiungiamo
    if (!acc[yearKey]) {
      acc[yearKey] = {};
    }

    // Se il mese non esiste per quell'anno, lo aggiungiamo
    if (!acc[yearKey][monthKey]) {
      acc[yearKey][monthKey] = [];
    }

    // Aggiunge il record al mese corrispondente
    acc[yearKey][monthKey].push(record);
    return acc;
  }, {} as { [year: number]: { [month: string]: Record[] } });

  return (
    <div>
      {/* <h1>Tabella degli Incassi Giornalieri</h1> */}
      <Tabs className="p-8">
        <TabList className="text-xs">
          {Object.keys(recordsByYear).map((year) => (
            <Tab key={year}>{year}</Tab>
          ))}
        </TabList>

        {Object.entries(recordsByYear).map(([year, months]) => (
          <TabPanel key={year}>
            {/* <h2>Incassi dell'Anno {year}</h2> */}
            <Tabs>
              <TabList className="text-xs">
                {Object.keys(months).map((month) => (
                  <Tab key={month}>{month}</Tab>
                ))}
              </TabList>

              {Object.entries(months).map(([month, monthRecords]) => (
                <TabPanel key={month}>
                  {/* <h3>
                    Incassi di {month} {year}
                  </h3> */}
                  <table className="text-xs">
                    <thead>
                      <tr>
                        <th className="w-1/12">Giorno</th>
                        <th className="w-1/12">Incasso</th>
                        <th className="w-1/12">Elettronico</th>
                        <th className="w-1/12">Totale z</th>
                        <th className="w-1/12">Contanti</th>
                        <th className="w-1/12">Totale giorno</th>
                        <th className="w-1/12">Eccedenza</th>
                        <th className="w-1/12">Percentuale Eccedenza</th>{" "}
                        {/* Nuova colonna per la percentuale */}
                      </tr>
                    </thead>
                    <tbody>
                      {monthRecords.map((record) => {
                        const totaleZ = record.incasso + record.elettronico; // Calcola Totale Z
                        const totaleGiorno = totaleZ + record.contanti; // Calcola Totale Giorno
                        const eccedenza = record.contanti - record.incasso; // Calcola Eccedenza

                        // Calcola la percentuale dell'eccedenza rispetto al totale giorno
                        const percentualeEccedenza =
                          totaleGiorno > 0
                            ? (eccedenza / totaleGiorno) * 100
                            : 0; // Evita la divisione per zero

                        return (
                          <tr key={record.id} className="odd:bg-gray-100">
                            <td className="text-end">
                              {new Date(record.giorno).toLocaleDateString(
                                "it-IT",
                                {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                  year: "2-digit",
                                }
                              )}
                            </td>
                            <td className="text-end">
                              {record.incasso.toFixed(2)}
                            </td>
                            <td className="text-end">
                              {record.elettronico.toFixed(2)}
                            </td>
                            <td className="text-end">{totaleZ.toFixed(2)}</td>{" "}
                            {/* Totale Z */}
                            <td className="text-end">
                              {record.contanti.toFixed(2)}
                            </td>
                            <td className="text-end">
                              {totaleGiorno.toFixed(2)}
                            </td>{" "}
                            {/* Totale Giorno */}
                            <td className="text-end">
                              {eccedenza.toFixed(2)}
                            </td>{" "}
                            {/* Eccedenza */}
                            <td className="text-end">
                              {percentualeEccedenza.toFixed(2)}%{" "}
                              {/* Percentuale Eccedenza */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Nuova tabella per le somme totali */}
                  <table className="text-xs mt-4">
                    <thead>
                      <tr>
                        <th className="w-1/12">Mese</th>
                        <th className="w-1/12">Incasso</th>
                        <th className="w-1/12">Elettronico</th>
                        <th className="w-1/12">Totale Z</th>
                        <th className="w-1/12">Contanti</th>
                        <th className="w-1/12">Totale Giorno</th>
                        <th className="w-1/12">Eccedenza</th>
                        <th className="w-1/12">Eccedenza %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        // Raggruppa i record per mese
                        const recordsByMonth = monthRecords.reduce(
                          (acc, record) => {
                            const date = new Date(record.giorno);
                            const monthKey = `${date.getFullYear()}-${
                              date.getMonth() + 1
                            }`; // Chiave per l'anno e mese

                            if (!acc[monthKey]) {
                              acc[monthKey] = [];
                            }

                            acc[monthKey].push(record);
                            return acc;
                          },
                          {} as { [key: string]: Record[] }
                        );

                        // Variabili cumulative per sommare i valori mese per mese
                        let sommaIncassoCumulativa = 0;
                        let sommaElettronicoCumulativa = 0;
                        let sommaContantiCumulativa = 0;

                        // Itera attraverso i mesi e calcola i totali cumulativi
                        return Object.entries(recordsByMonth).map(
                          ([month, records], index) => {
                            // Somma per il mese corrente
                            const totaleIncassoMese = records.reduce(
                              (sum, record) => sum + record.incasso,
                              0
                            );
                            const totaleElettronicoMese = records.reduce(
                              (sum, record) => sum + record.elettronico,
                              0
                            );
                            const totaleContantiMese = records.reduce(
                              (sum, record) => sum + record.contanti,
                              0
                            );

                            // Calcolo per il mese corrente
                            const totaleZMese =
                              totaleIncassoMese + totaleElettronicoMese;
                            const totaleGiornoMese =
                              totaleZMese + totaleContantiMese;
                            const eccedenzaMese =
                              totaleContantiMese - totaleIncassoMese;
                            const eccedenzaPercentualeMese =
                              totaleGiornoMese > 0
                                ? (eccedenzaMese / totaleGiornoMese) * 100
                                : 0;

                            // Aggiorna i totali cumulativi mese per mese (aggiungendo i mesi precedenti)
                            sommaIncassoCumulativa += totaleIncassoMese;
                            sommaElettronicoCumulativa += totaleElettronicoMese;
                            sommaContantiCumulativa += totaleContantiMese;

                            console.log(
                              "sommaIncassoCumulativa",
                              sommaIncassoCumulativa,
                              "sommaElettronicoCumulativa",
                              sommaElettronicoCumulativa,
                              "sommaContantiCumulativa",
                              sommaContantiCumulativa
                            );

                            // Calcolo cumulativo
                            const totaleZCumulativo =
                              sommaIncassoCumulativa +
                              sommaElettronicoCumulativa;

                            const totaleGiornoCumulativo =
                              totaleZCumulativo + sommaContantiCumulativa;
                            const eccedenzaCumulativa =
                              sommaContantiCumulativa - sommaIncassoCumulativa;
                            const eccedenzaPercentualeCumulativa =
                              totaleGiornoCumulativo > 0
                                ? (eccedenzaCumulativa /
                                    totaleGiornoCumulativo) *
                                  100
                                : 0;

                            return (
                              <React.Fragment key={month}>
                                {/* Prima riga: valori del mese corrente */}
                                <tr className="bg-gray-200">
                                  <td className="text-end font-bold">
                                    {month}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleIncassoMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleElettronicoMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleZMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleContantiMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleGiornoMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {eccedenzaMese.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {eccedenzaPercentualeMese.toFixed(2)}%
                                  </td>
                                </tr>

                                {/* Seconda riga: valori cumulativi fino al mese corrente */}
                                <tr className="bg-gray-300">
                                  <td className="text-end font-bold">
                                    Cumulativo
                                  </td>
                                  <td className="text-end font-bold">
                                    {sommaIncassoCumulativa.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {sommaElettronicoCumulativa.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleZCumulativo.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {sommaContantiCumulativa.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {totaleGiornoCumulativo.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {eccedenzaCumulativa.toFixed(2)}
                                  </td>
                                  <td className="text-end font-bold">
                                    {eccedenzaPercentualeCumulativa.toFixed(2)}%
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          }
                        );
                      })()}
                    </tbody>
                  </table>
                </TabPanel>
              ))}
            </Tabs>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default DailyIncassi;
