import axios from "axios";

const BASE_URL = "https://genuinemark.org/piccollect/";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while logging in.");
  }
};
