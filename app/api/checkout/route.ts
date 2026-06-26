// app/api/checkout/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { cart } = await req.json();

  try {
    await prisma.$transaction(async (tx) => {
      for (const item of cart) {
        // 1. Vérifier le stock
        const product = await tx.product.findUnique({ where: { id: item.id } });
        if (!product || product.stock < item.quantity) {
          throw new Error(`Stock insuffisant pour ${item.name}`);
        }
        // 2. Décrémenter le stock
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } }
        });
      }
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
  }
}