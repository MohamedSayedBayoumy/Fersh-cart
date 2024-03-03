import { Product } from "./products";

export interface OrderDtails {
    details: string;
    phone:   string;
    city:    string;
}
export interface OrderItemsDetails {
    shippingAddress:   ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: string;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         CartItem[];
    paidAt:            Date;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
}
export interface ShippingAddress {
    details: string;
    city:    string;
    phone:   string;
}
export interface CartItem {
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}

export interface User {
    _id:   string;
    name:  string;
    email: string;
    phone: string;
}