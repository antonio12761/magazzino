// app/api/categories/[id]/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma"; // Assicurati che questo percorso sia corretto

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "ID categoria non valido" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Categoria non trovata" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero della categoria:", error);
    return NextResponse.json(
      { message: "Impossibile recuperare la categoria" },
      { status: 500 }
    );
  }
}

// Funzione DELETE per eliminare una categoria in base all'ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(
      { message: "Category deleted successfully!", deletedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante la cancellazione della categoria:", error);
    return NextResponse.json(
      { message: "Failed to delete category." },
      { status: 500 }
    );
  }
}

// Funzione PUT per aggiornare una categoria esistente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required!" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { title, description },
    });

    return NextResponse.json(
      { message: "Category updated successfully!", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Failed to update category." },
      { status: 500 }
    );
  }
}
