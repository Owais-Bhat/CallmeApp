import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Video } from "expo-av";
import UserCard from "../components/UserCard";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

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
            Favorite One's
          </Text>
        </View>
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onDelete={() => removeFavorite(item.id)}
              showIcons={false} // Hide icons in favorites
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />
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
  backButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FavoritesScreen;
