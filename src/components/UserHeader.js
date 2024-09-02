import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserHeader = ({ name, image, status, containerStyle, navigation }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={image} style={styles.image} />

      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: status === "online" ? "lightgreen" : "red" },
        ]}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    fontSize: 14,
    color: "#F05A7E",
    marginTop: 10,
  },
  statusIndicator: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default UserHeader;
