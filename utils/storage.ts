import AsyncStorage from "@react-native-async-storage/async-storage";
export const API_BASE_URL = "https://genuinemark.org/piccollect/";

export const storeTokenToStorage = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getTokenFromStorage = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeTokenFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
