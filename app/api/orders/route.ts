import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import {  NextResponse } from "next/server";
import { format } from "date-fns";

// CORS Headers

// GET handler for fetching orders
export const GET = async () => {
  try {
    await connectToDB(); // Connect to the database

    // Fetch all orders and sort by creation date in descending order
    const orders = await Order.find();

    // Map through the orders to format data
    const orderDetails = orders.map((order) => ({
      _id: order._id,
      customerName: order.customerName, // Default to "Unknown" if no customer found
      customerEmail: order.customerEmail,
      phoneNumber: order.phoneNumber, // Include phone number
      products: order.products.length,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: format(order.createdAt, "MMM d, yyyy"), // Format the date in "Month Day, Year"
      updatedAt: format(order.updatedAt, "MMM d, yyyy"), // Format the date
    }));
    console.log(orderDetails);
    // Return the response as JSON with status 200 and CORS headers
    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.error("[orders_GET]", err); // Log the error for debugging purposes
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
