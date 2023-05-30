import React from "react";
import { View, Text, Button } from "react-native";
import { removeTokenFromStorage } from "../utils/storage";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = () => {
    // Remove the token from async storage
    removeTokenFromStorage();
    navigation.navigate("Login");
  };

  const handleUploadPicture = () => {
    navigation.navigate("PictureUpload");
  };

  const handleViewPictures = () => {
    navigation.navigate("PictureList");
  };

  const handleViewProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Upload Picture" onPress={handleUploadPicture} />
      <Button title="View Pictures" onPress={handleViewPictures} />
      <Button title="View Profile" onPress={handleViewProfile} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
