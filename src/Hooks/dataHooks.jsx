import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Axios client setup
const client = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
  },
});

// Generic function to fetch a list of items
const getItems = (endpoint) => client.get(endpoint);

// Generic function to fetch a single item by ID
const getItemById = (endpoint, id) => client.get(`${endpoint}/${id}`);

/**
 * Custom hook to fetch a list of items (e.g., sets or cards)
 * @param {string} endpoint
 */
export const useFetchList = (endpoint) => {
  return useQuery({
    queryKey: ['fetchList', endpoint],
    queryFn: async () => {
      const response = await getItems(endpoint);
      console.log('Axios response:', response);
      return response.data;
    },
    enabled: !!endpoint, // Only run if endpoint exists
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

/**
 * Custom hook to fetch a single item by ID
 * @param {string} endpoint
 * @param {string|number} id
 */
export const useFetchById = (endpoint, id) => {
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      const response = await getItemById(endpoint, id);
      return response.data;
    },
    enabled: !!id, // Only run if ID exists
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default client;
