type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
  }
  
  type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  type OrderColumnType = {
    _id: string;
    customerName: string;
    customerEmail: string;
    phoneNumber?: string; // Optional phone number field
    products: number;
    totalAmount: number;
    status: "pending" | "accepted" | "rejected" | "shipped"; // Added order status
    createdAt: string;
    updatedAt: string; // Added `updatedAt` field for tracking updates
  };
  
  type OrderItemType = {
    product: ProductType
    color: string;
    size: string;
    quantity: number;
  }
  
  type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
  }