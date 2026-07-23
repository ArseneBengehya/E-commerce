import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
    }

    const body = await req.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json({ message: "ID requis" }, { status: 400 });
    }

    const category = await prisma.category.findFirst({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "La catégorie n'existe pas" },
        { status: 404 },
      );
    }

    if (category.isDelete) {
      return NextResponse.json(
        { message: "Cette catégorie a déjà été supprimée" },
        { status: 400 },
      );
    }

    const [updatedProducts, updatedCategory] = await prisma.$transaction([
      prisma.product.updateMany({
        where: { categoryId: id },
        data: { isDelete: true },
      }),
      prisma.category.update({
        where: { id },
        data: { isDelete: true },
        include: { products: true },
      }),
    ]);

    return NextResponse.json(
      {
        message: "Catégorie supprimée avec succès",
        products: updatedProducts,
        category: updatedCategory,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}