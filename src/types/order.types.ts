export interface CreateOrder {
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}
export type Orders = {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  _id: string;
  user: string;
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
    _id: string;
  }[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paystackReference?: string; // Optional field as it only appears in some objects
};

// type Orders = Order[];

export interface OrderResponseType {
  user: string;
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
    _id: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
