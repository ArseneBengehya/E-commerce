import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
    }

    const { name, description, price, image, stock, categoryId, id } =
      await req.json();
    if (!name || !image || !categoryId || price < 0 || stock < 0) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 },
      );
    }

    const updateProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        image,
        stock,
        categoryId,
      },
      include: {
        category: true,
        orderItems: true,
      },
    });

    return NextResponse.json(
      {
        message: "Catégorie modifiée",
        data: updateProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
