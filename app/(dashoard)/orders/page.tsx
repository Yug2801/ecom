"use client"

import { DataTable } from "@/components/custom ui/DataTable"
import Loader from "@/components/custom ui/Loader"
import { columns } from "@/components/orders/OrderColumns"
import { Separator } from "@/components/ui/separator"

import { useEffect, useState } from "react"

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`)
      const data = await res.json()

      // Sort orders by status, putting "pending" orders first
      const sortedOrders = data.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") {
          return -1; // "pending" comes first
        }
        if (a.status !== "pending" && b.status === "pending") {
          return 1; // "pending" comes first
        }
        return 0; // If both are the same, maintain order
      })

      console.log(sortedOrders)
      setOrders(sortedOrders)
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
