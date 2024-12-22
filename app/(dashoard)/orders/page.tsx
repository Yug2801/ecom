import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { Separator } from '@/components/ui/separator'
import Order from '@/lib/models/Order'
import { connectToDB } from '@/lib/mongoDB'

const Orders = async () => {
  await connectToDB();

  // Fetch all orders and sort them by creation date (newest first)
  const orders = await Order.find().sort({ createdAt: -1 });

  // Convert Mongoose documents to plain objects using .lean() (if needed)
  const plainOrders = orders.map(order => order.toObject ? order.toObject() : order);

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Orders</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={plainOrders} searchKey='_id'/>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Orders;
