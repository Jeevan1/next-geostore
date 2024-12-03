export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
  subCategory?: Category[];
};

export type CartItem = {
  id: string;
  orderId: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  userId: string;
  createdAt: string;
};

export type Order = {
  id: number | string;
  orderId: string;
  userId: string;
  cartItems: CartItem[];
  subTotal: number;
  grandTotal: number;
  status: string;
  tax: number;
  timestamp: string;
};
