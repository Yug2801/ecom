import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

interface ProductItem {
  productId: string; // ID of the product
  color?: string;     // Optional color of the product
  size?: string;      // Optional size of the product
  quantity: number;   // Quantity of the product
}

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// GET handler for fetching orders
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB(); // Connect to the database

    // Fetch all orders and sort by creation date in descending order
    const orders = await Order.find().sort({ createdAt: -1 });

    // Map through the orders and fetch customer data for each order
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({ clerkId: order.customerClerkId });

        // Return the order details including customer name, phone number, and formatted date
        return {
          _id: order._id,
          customerName: order.customerName, // Default to "Unknown" if no customer found
          customerEmail: order.customerEmail,
          phoneNumber: order.phoneNumber , // Include phone number
          products: order.products.length,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: format(order.createdAt, "MMM d, yyyy"), // Format the date in "Month Day, Year"
          updatedAt: format(order.updatedAt, "MMM d, yyyy") // Format the date in "
        };
      })
    );

    // Return the response as JSON with status 200 and CORS headers
    return NextResponse.json(orderDetails, { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("[orders_GET]", err); // Log the error for debugging purposes
    return new NextResponse("Internal Server Error", { status: 500, headers: corsHeaders });
  }
};
