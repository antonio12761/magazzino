// app/api/incassi/check/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    console.error("Parametro 'date' mancante.");
    return NextResponse.json(
      { message: "Parametro 'date' mancante." },
      { status: 400 }
    );
  }

  try {
    // Parsifica la data 'YYYY-MM-DD' come data locale
    const [year, month, day] = dateParam.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);
    parsedDate.setHours(0, 0, 0, 0);

    // Imposta l'inizio e la fine del giorno
    const startOfDay = new Date(parsedDate);
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Data ricevuta:", dateParam);
    console.log("Data parsata:", parsedDate);
    console.log("Inizio del giorno:", startOfDay);
    console.log("Fine del giorno:", endOfDay);

    // Trova qualsiasi record con la data all'interno di questo intervallo
    const existingRecord = await prisma.incasso.findFirst({
      where: {
        giorno: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    console.log("Record esistente:", existingRecord);

    return NextResponse.json({ exists: !!existingRecord }, { status: 200 });
  } catch (error) {
    console.error("Errore durante il controllo della registrazione:", error);
    return NextResponse.json(
      { message: "Errore durante il controllo della registrazione." },
      { status: 500 }
    );
  }
}
