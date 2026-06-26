import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { order, orderItems } = await req.json();
    const session = await auth()

    console.log("Session complète :", session);

    await prisma.$transaction(async (tx) => {
      // 1. Créer la commande
      const orderWithUser = { ...order, userId: session?.user?.id };
      const newOrder = await tx.order.create({ data: orderWithUser });

      // 2. Créer les items liés
      const itemsWithOrderId = orderItems.map((item: any) => ({
        ...item,
        orderId: newOrder.id,
      }));
      await tx.orderItem.createMany({ data: itemsWithOrderId });

      // 3. DÉCRÉMENTER LE STOCK (Indispensable)
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }
    });

    // RETOURNER LA RÉPONSE AU STORE
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}