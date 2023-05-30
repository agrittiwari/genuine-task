import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { loginUser } from "../utils/apiService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      // Handle successful login
      Alert.alert("Login", response.message);
    } catch (err) {
      // Handle login error
      Alert.alert("Login Error", err.message);
    }
  };

  return (
    <View>
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
    </View>
  );
};

export default LoginScreen;
