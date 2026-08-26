export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  isActive: boolean;
}