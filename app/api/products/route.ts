import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // 1. Récupérer les paramètres de l'URL (ex: ?page=1&limit=50)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // Calculer le nombre d'éléments à sauter
    const skip = (page - 1) * limit;

    // 2. Lancer les requêtes en parallèle : le total pour la pagination + les produits paginés
    const [totalProducts, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    // 3. Calculer les métadonnées de pagination pour aider le Front-end
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json(
      {
        metadata: {
          totalProducts,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits paginés :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}