import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// Funzione GET per ottenere l'ultimo warehouse inserito
export async function GET() {
  try {
    const lastWarehouse = await prisma.warehouse.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(lastWarehouse, { status: 200 });
  } catch (error) {
    console.error(
      "Errore durante il caricamento dell'ultimo warehouse:",
      error
    );
    return NextResponse.json(
      { message: "Errore durante il caricamento dell'ultimo warehouse" },
      { status: 500 }
    );
  }
}
