import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch the orders for the specific customer by customerId
    const orders = await Order.find({
      customerClerkId: params.customerId,
    }).populate({
      path: "products.product",
      model: Product,
    });

    // Ensure products are structured consistently
    const sanitizedOrders = orders.map((order) => ({
      ...order.toObject(),
      items: order.products || [], // Ensure 'items' is an array even if 'products' is undefined
    }));

    // Return the orders as a JSON response
    return NextResponse.json(sanitizedOrders, { status: 200 });
  } catch (err) {
    // Log the error for debugging
    console.error("[customerId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Forces dynamic rendering of this handler
export const dynamic = "force-dynamic";
