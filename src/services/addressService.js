import apiClient from "./apiClient";

export const getAddresses = async () => {
  try {
    const response = await apiClient.get("/addresses?sort=createdAt:desc");
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createAddress = async (addressData) => {
  try {
    const response = await apiClient.post("/addresses", { data: addressData });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateAddress = async (id, addressData) => {
  try {
    const response = await apiClient.put(`/addresses/${id}`, { data: addressData });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await apiClient.delete(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
