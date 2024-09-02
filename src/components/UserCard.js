import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const UserCard = ({
  user,
  onFavorite,
  isFavorite,
  showIcons,
  onDelete,
  navigation,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("UserDetail", { user })}
      disabled={!navigation}
    >
      <LinearGradient colors={["#FFFFFF", "#FFC6C6"]} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={user.image} style={styles.image} />
          {showIcons && (
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => onFavorite(user)}
              >
                <MaterialIcons
                  name={isFavorite ? "favorite" : "favorite-border"}
                  size={24}
                  color="#F05A7E"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={16} color="black" />
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="description" size={16} color="black" />
            <Text style={styles.description}>{user.description.short}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 300,
    backgroundColor: "transparent",
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#FFC6C6",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
  },
  icon: {
    marginLeft: 10,
  },
  details: {
    flex: 1,
    width: "100%",
    height: "30%",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    color: "white",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: "white",
    fontSize: 10,
  },
  description: {
    fontSize: 10,
    textAlign: "left",
    color: "white",
    flexWrap: "wrap",
  },
});

export default UserCard;
