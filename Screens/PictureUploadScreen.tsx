import React, { useState } from "react";
import { View, Text, Button, Image, Alert, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPicture } from "../utils/apiService";

const PictureUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tags, setTags] = useState("");

  const handleImageUpload = async () => {
    if (!selectedImage) {
      Alert.alert("Image Upload Failed", "No image selected.");
      return;
    }

    try {
      const response = await uploadPicture(tags, selectedImage);
      if (response.status === "200") {
        Alert.alert("Image Upload Success", response.message);
        setSelectedImage(null);
        setTags("");
      } else {
        Alert.alert("Image Upload Failed", response.message);
      }
    } catch (error) {
      console.error("Error uploading picture:", error);
      Alert.alert(
        "Image Upload Failed",
        "An error occurred while uploading the picture."
      );
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Unable to access the camera roll.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View>
      <Text>Picture Upload Screen</Text>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Select Image" onPress={handleSelectImage} />
      <TextInput
        placeholder="Tags"
        onChangeText={(text) => setTags(text)}
        value={tags}
      />
      <Button title="Upload" onPress={handleImageUpload} />
    </View>
  );
};

export default PictureUploadScreen;
