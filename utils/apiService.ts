const API_BASE_URL = "https://genuinemark.org/piccollect";
import axios, { AxiosResponse } from "axios";
import {
  storeTokenToStorage,
  getTokenFromStorage,
  removeTokenFromStorage,
} from "./storage";

interface ApiResponse {
  status: string;
  message: string;
  errors?: any;
  data?: any;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    console.log("Register User Request Body:", formData);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/user/register`,
      formData,
      {
        headers,
      }
    );

    const data: ApiResponse = response.data;

    console.log("Register User Response:", data);

    return data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw new Error("An error occurred while registering user.", err);
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    console.log("Login User Request Body:", formData);

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/user/login`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data: ApiResponse = response.data;

    console.log("Login User Response:", data);

    if (data.status === "200") {
      // Store the token in async storage
      const token = data.data.auth_token;
      await storeTokenToStorage(token);
    }

    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("An error occurred while logging in user.");
  }
};

export const uploadPicture = async (
  tags: string,
  image: any
): Promise<ApiResponse> => {
  try {
    const token = await getTokenFromStorage();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    formData.append("tags", tags);
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg", // Modify the type as per your image type
      name: "image.jpg",
    });

    console.log("Upload Picture Request Body:", formData);

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/picture/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: token,
        },
      }
    );

    const data: ApiResponse = response.data;

    console.log("Upload Picture Response:", data);

    return data;
  } catch (error) {
    console.error("Error uploading picture:", error);
    throw new Error("An error occurred while uploading the picture.");
  }
};

export const getPictureList = async (): Promise<ApiResponse> => {
  try {
    const token = await getTokenFromStorage();
    if (!token) {
      throw new Error("User not authenticated");
    }

    console.log("Get Picture List Request");

    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_BASE_URL}/picture/listAll`,
      {
        headers: {
          Token: token,
        },
      }
    );

    const data: ApiResponse = response.data;

    console.log("Get Picture List Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching picture list:", error);
    throw new Error("An error occurred while fetching the picture list.");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await removeTokenFromStorage();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("An error occurred while logging out user.");
  }
};
