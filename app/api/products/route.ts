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