import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { loginUser } from "../utils/apiService";
import { storeTokenToStorage } from "../utils/storage";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.status === "200") {
        // Save the token to async storage
        console.log(response);
        storeTokenToStorage(response.data.auth_token);
        // navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", response.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Login Failed", "An error occurred while logging in.");
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
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
      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Register yourself"
        onPress={() => navigation?.navigate("Registration")}
      />
    </View>
  );
};

export default LoginScreen;
