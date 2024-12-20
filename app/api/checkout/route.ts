import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests (OPTIONS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle POST request to submit order details
export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Get the request data
    const { cartItems, customer, phoneNumber } = await req.json();

    // Validate input data
    if (!cartItems || !customer || !phoneNumber) {
      return new NextResponse("Not enough data to checkout", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Calculate the total amount for the order
    const totalAmount = cartItems.reduce((total: number, item: any) => {
      return total + item.item.price * item.quantity;
    }, 0);

    // Collect the order details
    const orderDetails = {
      customerClerkId: customer.id,
      customerName: customer.fullName,
      customerEmail: customer.emailAddresses[0].emailAddress,
      phoneNumber,
      products: cartItems.map((item: any) => ({
        product: item.item._id,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "pending",
    };

    // Create a new order document
    console.log(cartItems)
    const newOrder = new Order(orderDetails);

    // Check if the customer exists in the database
    let existingCustomer = await Customer.findOne({ clerkId: customer.id });

    if (existingCustomer) {
      // Add the new order to the customer's orders
      existingCustomer.orders.push(newOrder._id);
      await existingCustomer.save();
    } else {
      // Create a new customer and add the order
      const newCustomer = new Customer({
        clerkId: customer.id,
        name: customer.fullName,
        email: customer.emailAddresses[0].emailAddress,
        orders: [newOrder._id],
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      });

      await newCustomer.save();
    }

    // Save the new order to the database
    await newOrder.save();

    // Return a success response
    return NextResponse.json(
      { message: "Order created successfully", orderId: newOrder._id },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("[order_submission_POST]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
