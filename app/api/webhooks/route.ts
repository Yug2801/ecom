import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming webhook body as JSON
    const eventData = await req.json();

    // Example webhook event payload structure (customize as needed)
    const { orderId, products, totalAmount } = eventData;

    if (!orderId || !products || !totalAmount) {
      return new NextResponse("Invalid event data", { status: 400 });
    }

    // Connect to your database
    await connectToDB();

    // Create a new order using the data from the webhook payload
    const newOrder = new Order({
      orderId,
      products,
      totalAmount,
    });

    // Save the new order in the database
    await newOrder.save();

    // Respond with a success message
    return new NextResponse("Order created successfully", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
