import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Alert } from "react-native";
import { getPictureList } from "../utils/apiService";

const PictureListScreen = () => {
  const [pictureList, setPictureList] = useState<any[]>([]);

  useEffect(() => {
    fetchPictureList();
  }, []);

  const fetchPictureList = async () => {
    try {
      const response = await getPictureList();
      if (response.status === "200") {
        setPictureList(response.data);
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error fetching picture list:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching the picture list."
      );
    }
  };

  const renderPictureItem = ({ item }: { item: any }) => (
    <View>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{item.tags}</Text>
    </View>
  );

  return (
    <View>
      <Text>Picture List Screen</Text>
      <FlatList
        data={pictureList}
        renderItem={renderPictureItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PictureListScreen;
