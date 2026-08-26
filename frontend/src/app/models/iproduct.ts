import { ApiResponse } from "./api-response";

export interface IProduct {
    _id: string,
    name: string,
    price: number,
    category: string,
    quantity: number,
    image: string,
    description: string,
    isDeleted: Boolean,
    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date
}

export interface ProductResponse extends ApiResponse<IProduct[]> {
    results: number,
    totalProducts: number
}