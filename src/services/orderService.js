import apiClient from "./apiClient";

export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post("/orders", { data: orderData });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMyOrders = async () => {
  try {
    const response = await apiClient.get("/orders?sort=createdAt:desc");
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
