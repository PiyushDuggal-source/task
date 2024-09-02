import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type LoginValues = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export const loginUser = async (
  values: LoginValues
): Promise<{ loggedIn: boolean; user: User | null }> => {
  try {
    const response = await axiosClient.post("/auth/login", values);
    console.log("Login successful:", response.data);
    return { loggedIn: true, user: response.data.user };
  } catch (error: any) {
    const mes = error.response.data.message;
    toast.error(mes);
    console.error("Error:", error);
  }
  return { loggedIn: false, user: null };
};

export const registerUser = async (
  values: RegisterValues
): Promise<{ registered: boolean; user: User | null }> => {
  try {
    const response = await axiosClient.post("/auth/register", values);
    console.log("Registration successful:", response.data);
    return { registered: true, user: response.data.user };
  } catch (error: any) {
    const mes = error.response.data.message;
    toast.error(mes);
    console.error("Error:", error);
  }
  return { registered: false, user: null };
};

export const meCall = async (): Promise<{
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
  status: number;
}> => {
  try {
    const response = await axiosClient.get("/auth/me");
    console.log("Me:", response);
    return { user: response.data.user, status: response.status };
  } catch (error) {
    console.error("Error:", error);
  }
  return { user: null, status: 500 };
};

export const logoutUser = async (): Promise<{ loggedOut: boolean }> => {
  try {
    const response = await axiosClient.post("/auth/logout");
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
  return { loggedOut: false };
};
