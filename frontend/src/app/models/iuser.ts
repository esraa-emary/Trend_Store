import { ApiResponse } from "./api-response";

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: String,
    isActive: Boolean,
    confirmOTP: String,
    OTPExpire: Date,
    resetToken: String,
    createdAt: Date,
    updatedAt: Date
}

export interface UserResponse extends ApiResponse<IUser[]> {
    results: number,
    totalUsers: number
}