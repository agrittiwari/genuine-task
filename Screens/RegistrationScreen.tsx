import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../utils/apiService";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Implement registration API call here
    Alert.alert(
      "Registration",
      `Name: ${name}, Email: ${email}, Password: ${password}`
    );
  };

  return (
    <View>
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;
