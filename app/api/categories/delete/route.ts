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

    const category = await prisma.category.findFirst({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { message: "La catégorie n'existe pas" },
        { status: 404 },
      );
    }

    if (category.isDelete) {
      return NextResponse.json(
        { message: "Cette catégorie a déjà été suprimée" },
        { status: 404 },
      );
    }

    const products = await prisma.product.updateMany({
      where: { categoryId: id },
      data: {
        isDelete: true,
        include: {
          products: true,
        },
      },
    });

    const categories = await prisma.category.update({
      where: { id },
      data: {
        isDelete: true,
        include: {
          products: true,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Catégorie suprimée",
        products,
        categories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Erreur suppression" }, { status: 400 });
  }
}
