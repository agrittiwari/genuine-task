import React from "react";
import { View, Text, Button, Alert } from "react-native";

const ProfileScreen = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    Alert.alert("Logout", "Logged out successfully");
  };

  return (
    <View>
      <Text>Profile Fragment</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
