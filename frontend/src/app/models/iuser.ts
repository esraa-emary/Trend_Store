import { ApiResponse } from "./api-response";

export interface IUser {
    _id: string,
    name: string,
    email: string,
    phoneNumber: string,
    role?: String,
    isActive: Boolean,
    createdAt: Date
}

export interface UserResponse extends ApiResponse<IUser[]> {
    results: number,
    totalProducts: number
}