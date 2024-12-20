"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// Assuming OrderColumnType is updated with customerName, customerEmail, phoneNumber, status, and updatedAt
export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => row.original.customerName || "N/A",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
    cell: ({ row }) => row.original.customerEmail || "N/A", // Display "N/A" if email is not available
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.original.phoneNumber || "N/A", // Display "N/A" if phone number is not available
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => `${row.original.products} item(s)`, // Format products count
  },
  {
    accessorKey: "totalAmount",
    header: "Total (₹)",
    cell: ({ row }) => `₹${row.original.totalAmount.toFixed(2)}`, // Format total amount with currency
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        pending: "text-yellow-500",
        accepted: "text-green-500",
        rejected: "text-red-500",
        shipped: "text-blue-500",
      };
      return <span className={statusColors[status]}>{status}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString(), // Format date
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleString(), // Format updated date
  },
];
