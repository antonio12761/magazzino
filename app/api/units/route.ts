// api/units/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, abbreviation } = await request.json();

    if (!title || !abbreviation) {
      return NextResponse.json(
        { message: "Title and abbreviation are required!" },
        { status: 400 }
      );
    }

    const unit = await prisma.unit.create({
      data: { title, abbreviation },
    });

    return NextResponse.json({ unit }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione dell'unità:", error);
    return NextResponse.json(
      { message: "Failed to create a unit. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const units = await prisma.unit.findMany();
    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    console.error("Failed to load units", error);
    return NextResponse.json(
      { message: "Failed to load units" },
      { status: 500 }
    );
  }
}
