"use client"
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";
import StatusButtons from "@/components/ui/StatusButtons";

type OrderDetailsType = {
  orderDetails: {
    _id: string;
    phoneNumber?: string;
    totalAmount: number;
    products: OrderItemType[];
  };
  customer: CustomerType;
};

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType["orderDetails"] | null>(null);
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/orders/${params.orderId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data: OrderDetailsType = await res.json();
        setOrderDetails(data.orderDetails);
        setCustomer(data.customer);
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.orderId]);

  if (isLoading) {
    return (
      <div className="flex flex-col p-10 gap-5">
        <p className="text-body-bold">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col p-10 gap-5">
        <p className="text-body-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails?._id}</span>
      </p>
      <p className="text-base-bold">
        Customer Name: <span className="text-base-medium">{customer?.name}</span>
      </p>
      {orderDetails?.phoneNumber && (
        <p className="text-base-bold">
          Phone Number: <span className="text-base-medium">{orderDetails.phoneNumber}</span>
        </p>
      )}
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">₹{orderDetails?.totalAmount}</span>
      </p>

      <StatusButtons orderId={params.orderId} />

      <DataTable
        columns={columns}
        data={orderDetails?.products || []}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
