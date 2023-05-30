import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const PicUploadingScreen = () => {
  const [tag, setTag] = useState("");

  const handleImageUpload = () => {
    // Implement picture upload API call here
    Alert.alert("Picture Upload", `Tag: ${tag}`);
  };

  return (
    <View>
      <TextInput
        placeholder="Picture Tag"
        onChangeText={(text) => setTag(text)}
        value={tag}
      />
      <Button title="Upload Picture" onPress={handleImageUpload} />
    </View>
  );
};

export default PicUploadingScreen;
