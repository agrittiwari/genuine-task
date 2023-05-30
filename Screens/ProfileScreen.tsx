import React from "react";
import { View, Text, Button } from "react-native";
import { removeTokenFromStorage } from "../utils/storage";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = () => {
    // Remove the token from async storage
    removeTokenFromStorage();
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
