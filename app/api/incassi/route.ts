import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Recupera i record dal database ordinandoli per la data nel campo "giorno" in ordine ascendente
    const records = await prisma.incasso.findMany({
      orderBy: {
        giorno: "asc",
      },
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero dei record:", error);
    return NextResponse.json(
      { message: "Errore durante il recupero dei dati." },
      { status: 500 }
    );
  }
}
