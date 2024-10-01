//  api/categories/last

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assicurati che Prisma sia configurato correttamente

// Funzione GET per ottenere l'ultima categoria inserita nel database
export async function GET() {
  try {
    // Trova l'ultima categoria inserita ordinando per `createdAt` in ordine decrescente
    const lastCategory = await prisma.category.findFirst({
      orderBy: {
        createdAt: "desc", // Assicurati di avere un campo `createdAt` nel modello Prisma
      },
    });

    // Verifica se esiste una categoria
    if (!lastCategory) {
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 }
      );
    }

    // Ritorna l'ultima categoria trovata
    return NextResponse.json(lastCategory, { status: 200 });
  } catch (error) {
    console.error("Failed to load last category", error);
    return NextResponse.json(
      { message: "Failed to load last category" },
      { status: 500 }
    );
  }
}
