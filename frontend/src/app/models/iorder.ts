import { ApiResponse } from "./api-response";
import { IProduct } from "./iproduct";
import { IUser } from "./iuser";

export interface IOrderProduct {
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    _id: string;
    user: IUser;
    products: IOrderProduct[];
    totalPrice: number,
    isShipped: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface OrderResponse extends ApiResponse<IOrder[]> {
    results: number,
    totalOrders: number
}