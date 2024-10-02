import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { transferStockQty, recievingBranchId, notes } = await request.json();

    if (!transferStockQty || !recievingBranchId || !notes) {
      const missingFields: string[] = []; // Specifica il tipo dell'array come string[]

      if (!transferStockQty) missingFields.push("transferStockQty");
      if (!recievingBranchId) missingFields.push("recievingBranchId");
      if (!notes) missingFields.push("notes");

      // Se i campi sono vuoti, ritorna un errore 400
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const adjustment = { transferStockQty, recievingBranchId, notes };
    // Qui puoi aggiungere la logica per salvare la categoria nel database

    // Simulazione della logica per salvare la categoria nel database
    console.log("Adjustment saved:", adjustment);

    return NextResponse.json({ adjustment }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione della adjustment:", error);

    return NextResponse.json(
      { message: "Failed to create a adjustment. Please try again later." },
      { status: 500 }
    );
  }
}
