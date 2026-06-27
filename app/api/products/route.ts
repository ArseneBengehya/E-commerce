import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const skip = (page - 1) * limit;

  const [totalProducts, products] = await prisma.$transaction([
    prisma.product.count(),
    prisma.product.findMany({ skip, take: limit, include: { category: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({
    metadata: { totalProducts, totalPages: Math.ceil(totalProducts / limit), currentPage: page, limit, hasNextPage: page < Math.ceil(totalProducts / limit), hasPrevPage: page > 1 },
    data: products,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest) {
  const { id, stock } = await req.json();
  const product = await prisma.product.update({ where: { id }, data: { stock } });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}