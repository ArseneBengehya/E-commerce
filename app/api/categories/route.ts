import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des catégories" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
    }

    const { id, name, slug } = await req.json();

    const updatedUser = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
      },
      include:{
        products:true
      }
    });

    return NextResponse.json(
      {
        message: "Catégorie modifiée",
        data: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, slug } = await req.json();
    if (!name || !slug) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(
      { message: "Catégorie ajoutée avec succès", category },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
