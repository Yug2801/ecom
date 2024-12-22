"use client"

import { DataTable } from "@/components/custom ui/DataTable"
import Loader from "@/components/custom ui/Loader"
import { columns } from "@/components/orders/OrderColumns"
import { Separator } from "@/components/ui/separator"

import { useEffect, useState } from "react"

// Define the Order type based on the expected fields in your data
interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  phoneNumber?: string; // Optional phone number field
  products: number;
  totalAmount: number;
  status: "pending" | "accepted" | "rejected" | "shipped"; // Added order status
  createdAt: string;
  updatedAt: string; // Assuming createdAt is a string (ISO format date)
}

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<OrderColumnType[]>([])

  const getOrders = async () => {
    try {
      
      const res = await fetch("/api/orders", {
        method: "GET",
        cache: "no-store",
      });
      const data= await res.json()

      console.log(data)
      setOrders(data)
      setLoading(false)
    } catch (err) {
      console.log("[orders_GET]", err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5"/>
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  )
}
export const dynamic = "force-dynamic";

export default Orders
