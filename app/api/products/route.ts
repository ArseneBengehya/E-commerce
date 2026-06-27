import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Créer un produit
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: parseFloat(body.price),
        image: body.image,
        stock: parseInt(body.stock),
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur création" }, { status: 400 });
  }
}

// PATCH: Mettre à jour le stock
export async function PATCH(req: NextRequest) {
  try {
    const { id, stock } = await req.json();
    const product = await prisma.product.update({
      where: { id },
      data: { stock: parseInt(stock) },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 400 });
  }
}

// DELETE: Supprimer
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID requis");
    
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = (page - 1) * limit;

    const [totalProducts, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({ 
        skip, 
        take: limit, 
        include: { category: true }, 
        orderBy: { createdAt: "desc" } 
      }),
    ]);

    // Retourne toujours un objet JSON propre
    return NextResponse.json({
      metadata: { 
        totalProducts, 
        totalPages: Math.ceil(totalProducts / limit), 
        currentPage: page, 
        limit, 
        hasNextPage: page < Math.ceil(totalProducts / limit), 
        hasPrevPage: page > 1 
      },
      data: products || [], // Si products est null, on envoie un tableau vide
    });
  } catch (error) {
    console.error("API GET ERROR:", error);
    // En cas d'erreur serveur, on renvoie un JSON valide plutôt que rien
    return NextResponse.json({ metadata: {}, data: [] }, { status: 500 });
  }
}