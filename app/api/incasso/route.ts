import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Importa solo Prisma Client

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { giorno, incasso, elettronico, contanti } = body;

    if (!giorno) {
      return NextResponse.json(
        { message: "Parametro 'giorno' mancante." },
        { status: 400 }
      );
    }

    // Parsifica la data 'YYYY-MM-DD'
    const [year, month, day] = giorno.split("-").map(Number);
    let parsedDate = new Date(year, month - 1, day);

    parsedDate.setHours(0, 0, 0, 0); // Assicurati che l'ora sia impostata correttamente

    // Imposta l'inizio e la fine del giorno
    const startOfDay = new Date(parsedDate);
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Controlla se esiste già un incasso per la data specificata
    const existingRecord = await prisma.incasso.findFirst({
      where: {
        giorno: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingRecord) {
      return NextResponse.json(
        { message: "Registrazione incasso per questa data già effettuata" },
        { status: 400 }
      );
    }

    // Crea un nuovo record di incasso
    const newIncasso = await prisma.incasso.create({
      data: {
        giorno: parsedDate,
        incasso: parseFloat(incasso),  // Non è necessario un tipo `Decimal` qui
        elettronico: parseFloat(elettronico),  // Non è necessario un tipo `Decimal` qui
        contanti: parseFloat(contanti),  // Non è necessario un tipo `Decimal` qui
      },
    });

    // Aggiorna i totali mensili
    await updateMonthlyTotals(year, month, parseFloat(incasso), parseFloat(elettronico), parseFloat(contanti));

    return NextResponse.json(
      { message: "Dati salvati con successo!", newIncasso },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Errore durante il salvataggio:", error);
    return NextResponse.json(
      { message: "Errore durante il salvataggio dei dati." },
      { status: 500 }
    );
  }
}

// Funzione per aggiornare i totali mensili
async function updateMonthlyTotals(anno: number, mese: number, incasso: number, elettronico: number, contanti: number) {
  // Trova il record del mese corrente con findFirst
  const meseRecord = await prisma.totali_mensili.findFirst({
    where: {
      anno: anno,
      mese: mese
    }
  });

  if (meseRecord) {
    // Aggiorna i totali aggiungendo i nuovi valori giornalieri
    await prisma.totali_mensili.update({
      where: {
        id: meseRecord.id
      },
      data: {
        totale_incasso: meseRecord.totale_incasso.add(incasso),  // Prisma gestisce il tipo Decimal internamente
        totale_elettronico: meseRecord.totale_elettronico.add(elettronico),  // Prisma gestisce il tipo Decimal internamente
        totale_contanti: meseRecord.totale_contanti.add(contanti)  // Prisma gestisce il tipo Decimal internamente
      }
    });
  } else {
    // Se il record per il mese corrente non esiste, creane uno nuovo
    await prisma.totali_mensili.create({
      data: {
        anno,
        mese,
        totale_incasso: incasso,  // Non è necessario un tipo `Decimal` qui
        totale_elettronico: elettronico,  // Non è necessario un tipo `Decimal` qui
        totale_contanti: contanti  // Non è necessario un tipo `Decimal` qui
      }
    });
  }
}
