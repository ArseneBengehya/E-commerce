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
      include: {
        products: true,
      },
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

    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });

    let category;

    if (existingCategory) {
      if (existingCategory.isDelete) {
        category = await prisma.$transaction(async (tx) => {
          const suffix = `_old_${Date.now()}`;
          await tx.category.update({
            where: { id: existingCategory.id },
            data: {
              name: `${existingCategory.name}${suffix}`,
              slug: `${existingCategory.slug}${suffix}`,
            },
          });

          const newCategory = await tx.category.create({
            data: { name, slug },
          });

          return newCategory;
        });
      } else {
        return NextResponse.json(
          { message: "Cette catégorie existe déjà." },
          { status: 400 },
        );
      }
    } else {
      category = await prisma.category.create({
        data: { name, slug },
      });
    }

    return NextResponse.json(
      { message: "Catégorie ajoutée avec succès", category },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Cette catégorie (nom ou slug) existe déjà." },
        { status: 400 },
      );
    }

    if (
      error.code === "P1001" ||
      error.code === "P2024" ||
      error.name === "PrismaClientInitializationError"
    ) {
      return NextResponse.json(
        {
          message:
            "Délai de connexion dépassé ou base de données inaccessible.",
        },
        { status: 504 },
      );
    }

    console.error("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
