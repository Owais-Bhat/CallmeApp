import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Video } from "expo-av";
import UserCard from "../components/UserCard";
import { FavoritesContext } from "../context/FavoritesContext";
import userData from "../data/userData";

export default function MainScreen({ navigation }) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const handleFavorite = (user) => {
    if (favorites.some((fav) => fav.id === user.id)) {
      removeFavorite(user.id); // Remove from favorites
    } else {
      addFavorite(user); // Add to favorites
    }
  };

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
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-end",
            width: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              textAlign: "right",
              color: "white",
            }}
          >
            Discover Connects
          </Text>
        </View>
        <FlatList
          data={userData}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onFavorite={handleFavorite} // Handle the favorite action
              isFavorite={favorites.some((fav) => fav.id === item.id)} // Check if the item is in favorites
              showIcons={true} // Show favorite and delete icons
              navigation={navigation} // Pass navigation prop here
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.cardContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  listContainer: {
    flexGrow: 1,
    gap: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  favoritesButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  favoritesButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
