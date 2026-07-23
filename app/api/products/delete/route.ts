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
    const { id } = await req.json();
    if (!id) throw new Error("ID requis");

    const product = await prisma.product.findFirst({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { message: "Le produit n'existe pas" },
        { status: 404 },
      );
    }

    if (product.isDelete) {
      return NextResponse.json(
        { message: "Ce produit a déjà été suprimée" },
        { status: 404 },
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        isDelete: true,
      },
      include: {
        category: true,
        orderItems: true,
      },
    });

    return NextResponse.json(
      {
        message: "Produit suprimé",
        updatedProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Erreur suppression" }, { status: 400 });
  }
}
