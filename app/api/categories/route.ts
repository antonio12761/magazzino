//   api/categories
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/lib/db";
import prisma from "@/lib/prisma";

// Funzione POST per creare una nuova categoria
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required!" },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: { title, description },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione della categoria:", error);
    return NextResponse.json(
      { message: "Failed to create a category. Please try again later." },
      { status: 500 }
    );
  }
}

// Funzione GET per ottenere tutte le categorie
export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Failed to load categories", error);
    return NextResponse.json(
      { message: "Failed to load categories" },
      { status: 500 }
    );
  }
}
