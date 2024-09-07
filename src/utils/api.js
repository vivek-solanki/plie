// api.js
import axios from "axios";

const API_BASE_URL = "http://3.7.81.243/projects/plie-api/public/api";
const apiClient = axios.create({ baseURL: API_BASE_URL });

export const login = async (email, password) => {
  try {
    const response = await apiClient.post(
      "/login",
      new URLSearchParams({ email, password }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error?.response?.data || error.message);
    throw error?.response?.data?.message || "An error occurred during login";
  }
};

export const getEvents = async (token) => {
  try {
    const response = await apiClient.post("/events-listing", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Event Listing API Error:",
      error?.response?.data || error.message
    );
    throw (
      error?.response?.data?.message ||
      "An error occurred while fetching events"
    );
  }
};
