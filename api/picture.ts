import { API_BASE_URL, getTokenFromStorage } from "../utils/storage";

export const uploadPicture = async (
  tags: string,
  imageUri: string
): Promise<any> => {
  const token = await getTokenFromStorage();

  const formData = new FormData();
  formData.append("tags", tags);
  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  const response = await fetch(`${API_BASE_URL}/picture/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Token: token,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const getPictureList = async (): Promise<any> => {
  const token = await getTokenFromStorage();

  const response = await fetch(`${API_BASE_URL}/picture/listAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  });

  const data = await response.json();
  return data;
};
