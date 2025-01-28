// src/services/hotelService.ts
import axios from 'axios';
import { ApiResponse } from '../types/hotel';

const API_BASE_URL = 'https://hotel-manager-tp1o.onrender.com/api';

export const fetchRooms = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/rooms?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Failed to fetch rooms');
  }
};
