import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfYear, subDays } from "date-fns";

export async function GET() {
  try {
    const inizioAnno = startOfYear(new Date());
    const ieri = subDays(new Date(), 1);

    const totali = await prisma.totali_mensili.aggregate({
      _sum: {
        totale_incasso: true,
        totale_elettronico: true,
        totale_contanti: true,
      },
      where: {
        anno: new Date().getFullYear(),
      },
    });

    if (!totali || !totali._sum) {
      return NextResponse.json(
        { message: "Nessun dato trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      totaleIncasso: totali._sum.totale_incasso || 0,
      totaleElettronico: totali._sum.totale_elettronico || 0,
      totaleContanti: totali._sum.totale_contanti || 0,
    });
  } catch (error) {
    console.error("Errore durante il recupero dei totali:", error);
    return NextResponse.json(
      { message: "Errore interno del server" },
      { status: 500 }
    );
  }
}
