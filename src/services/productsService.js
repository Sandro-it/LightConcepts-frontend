// import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_BACKEND_URL || "http://localhost:1337/api/products";

// export const fetchProducts = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

import axios from "axios";

const API_URL = "http://116.203.106.75:1337/api/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};
