import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";
import StatusButtons from "@/components/ui/StatusButtons";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  try {
    const res = await fetch(`$/api/orders/${params.orderId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch order details");
    }

    const { orderDetails, customer } = await res.json();

    return (
      <div className="flex flex-col p-10 gap-5">
        <p className="text-base-bold">
          Order ID: <span className="text-base-medium">{orderDetails._id}</span>
        </p>
        <p className="text-base-bold">
          Customer Name: <span className="text-base-medium">{customer.name}</span>
        </p>
        
          <p className="text-base-bold">
            Phone Number: <span className="text-base-medium">{orderDetails.phoneNumber}</span>
          </p>
        
        <p className="text-base-bold">
          Total Paid: <span className="text-base-medium">₹{orderDetails.totalAmount}</span>
        </p>
       

        <StatusButtons orderId={params.orderId} />

        <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching order details:", error);
    return (
      <div className="flex flex-col p-10 gap-5">
        <p className="text-body-bold">Failed to load order details. Please try again later.</p>
      </div>
    );
  }
};

export default OrderDetails;
