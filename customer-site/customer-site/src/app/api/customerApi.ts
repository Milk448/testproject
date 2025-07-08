import axios from 'axios';
import { Workshop, BookingConfirmation } from '@/types'; 
import { MyBooking } from '@/types'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// These types are for request bodies
interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface BookingData {
  workshopId: string;
  timeSlotId: string;
}

export const registerUser = (userData: UserData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = (credentials: UserData) => {
  return axios.post<{ token: string }>(`${API_BASE_URL}/auth/login`, credentials);
};

export const getPublicWorkshops = async (): Promise<Workshop[]> => {
    console.log('Fetching workshops from:', `${API_BASE_URL}/workshops`);
  const response = await axios.get<Workshop[]>(`${API_BASE_URL}/workshops`);
  return response.data;
};

export const createBooking = async (bookingData: BookingData, token: string): Promise<BookingConfirmation> => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post<BookingConfirmation>(`${API_BASE_URL}/bookings`, bookingData, config);
  return response.data;
};

export const getMyBookings = async (token: string): Promise<MyBooking[]> => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get<MyBooking[]>(`${API_BASE_URL}/bookings/my-bookings`, config);
    return response.data;
};

export const cancelBooking = async (bookingId: string, token: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_BASE_URL}/bookings/my-bookings/${bookingId}/cancel`, {}, config);
    return response.data;
};