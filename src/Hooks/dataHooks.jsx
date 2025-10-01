import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const client = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "X-Api-Key": import.meta.env.VITE_APP_API_KEY,
    },
})

/**
 * @param {string} endpoint
 * @param {string} query
 */
const getItems = (endpoint) => client.get(endpoint);

/**
 * @param {string} endpoint
 * @param {number} id 
 */

const getItemById = (endpoint, id) => client.get(`${endpoint}/${id}`);

// Custom hook to fetch a list of items (e.g., sets or cards)
export const useFetchList = (endpoint) => {
  return useQuery({
    queryKey: ['fetchList',endpoint],
    queryFn: async () => {
      const response = await getItems(endpoint);
      return response.data;
    },
    enabled: !!endpoint,  // ✅ prevents execution when endpoint is null
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

/**
 * Custom hook to fetch a single item by ID (e.g., a specific card)
 * @param {string} endpoint - API endpoint
 * @param {string|number} id - Item ID
 * @returns {object} - React Query result
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