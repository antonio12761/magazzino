//   app/categories
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

// Funzione DELETE per eliminare una categoria in base all'ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required!" },
        { status: 400 }
      );
    }

    const deletedCategory = await db.category.delete({
      where: { id: parseInt(id) },
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

 