// app/api/brands/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required!" },
        { status: 400 }
      );
    }

    const brand = await prisma.brand.create({
      data: { title },
    });

    return NextResponse.json({ brand }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione del brand:", error);
    return NextResponse.json(
      { message: "Failed to create a brand. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.error("Failed to load brands", error);
    return NextResponse.json(
      { message: "Failed to load brands" },
      { status: 500 }
    );
  }
}
