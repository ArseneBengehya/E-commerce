import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { auth } from "@/auth";

// Récupérer tous les utilisateurs
export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(users);
}

// Modifier le rôle d'un utilisateur
export async function PATCH(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
  }

  const { userId, role } = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json(updatedUser);
}
