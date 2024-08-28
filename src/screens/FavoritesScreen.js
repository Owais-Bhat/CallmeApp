import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/video1.mp4")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Favorites Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
