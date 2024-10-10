import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function processMonthlyTotals() {
  // Recupera tutti i dati dalla tabella 'Incasso'
  const incassi = await prisma.incasso.findMany();

  // Crea una mappa per raggruppare gli incassi per anno e mese
  const monthlyMap: Record<
    string,
    { incasso: number; elettronico: number; contanti: number }
  > = {};

  incassi.forEach((incasso) => {
    const anno = incasso.giorno.getFullYear(); // Estrai l'anno dal campo 'giorno'
    const mese = incasso.giorno.getMonth() + 1; // Estrai il mese dal campo 'giorno' (i mesi in JS sono indicizzati da 0)
    const key = `${anno}-${mese}`; // Crea una chiave per ogni anno-mese

    // Se non esiste ancora un gruppo per questo anno-mese, crealo
    if (!monthlyMap[key]) {
      monthlyMap[key] = { incasso: 0, elettronico: 0, contanti: 0 };
    }

    // Somma i valori di incasso, elettronico e contanti per ogni anno-mese
    monthlyMap[key].incasso += incasso.incasso.toNumber();
    monthlyMap[key].elettronico += incasso.elettronico.toNumber();
    monthlyMap[key].contanti += incasso.contanti.toNumber();
  });

  // Itera sui risultati raggruppati e aggiorna la tabella 'totali_mensili'
  for (const [key, totals] of Object.entries(monthlyMap)) {
    const [anno, mese] = key.split("-").map(Number); // Estrai anno e mese dalla chiave

    await prisma.totali_mensili.upsert({
      where: { anno_mese: { anno, mese } }, // Usa la chiave composta per evitare duplicati
      update: {
        totale_incasso: totals.incasso,
        totale_elettronico: totals.elettronico,
        totale_contanti: totals.contanti,
      },
      create: {
        anno,
        mese,
        totale_incasso: totals.incasso,
        totale_elettronico: totals.elettronico,
        totale_contanti: totals.contanti,
      },
    });
  }
}

// Chiama la funzione per avviare il processo
processMonthlyTotals().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
