import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc", 
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des catégories" },
      { status: 500 }
    );
  }
}