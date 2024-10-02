import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Funzione GET per ottenere l'ultimo fornitore inserito
export async function GET() {
  try {
    const supplier = await prisma.supplier.findFirst({
      orderBy: {
        createdAt: "desc", // Ordina per data di creazione in ordine decrescente
      },
    });

    if (!supplier) {
      return NextResponse.json(
        { message: "No suppliers found." },
        { status: 404 }
      );
    }

    return NextResponse.json(supplier, { status: 200 });
  } catch (error) {
    console.error("Failed to load the last supplier", error);
    return NextResponse.json(
      { message: "Failed to load the last supplier" },
      { status: 500 }
    );
  }
}
