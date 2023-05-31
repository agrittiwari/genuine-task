import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../utils/apiService";
import { storeTokenToStorage } from "../utils/storage";

const RegistrationScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await registerUser(name, email, password);
      if (response.status === "200") {
        // Save the token to async storage
        // storeTokenToStorage(response.data.token); as this does not send the token
        navigation.navigate("Login");
      } else {
        Alert.alert("Registration Failed", response.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      Alert.alert(
        "Registration Failed",
        "An error occurred while registering."
      );
    }
  };

  return (
    <View>
      <Text>Registration Screen</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
