import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/customers/CustomerColumns'
import { Separator } from '@/components/ui/separator'
import Customer from '@/lib/models/Customer'
import { connectToDB } from '@/lib/mongoDB'

const Customers = async () => {
  await connectToDB()

  // Fetch unique customers based on clerkId
  const customers = await Customer.aggregate([
    { $group: { _id: "$clerkId", customer: { $first: "$$ROOT" } } }, // Group by clerkId and select the first entry for each group
    { $replaceRoot: { newRoot: "$customer" } } // Replace the root with the customer object
  ]);

  // Convert Mongoose documents to plain objects using .lean() (if needed)
  const plainCustomers = customers.map(customer => customer.toObject ? customer.toObject() : customer);

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={plainCustomers} searchKey='name'/>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Customers;
