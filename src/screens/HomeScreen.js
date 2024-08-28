import React, { useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { database } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { Video } from "expo-av";
import userData from "../data/userData";
import UserHeader from "../components/UserHeader";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  useEffect(() => {
    const handlePermissionsAndData = async () => {
      try {
        const { status: contactsStatus } =
          await Contacts.requestPermissionsAsync();
        const { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();

        if (contactsStatus !== "granted" || locationStatus !== "granted") {
          Alert.alert(
            "Permissions required",
            "Please grant access to contacts and location."
          );
          return;
        }

        const { data: contacts } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const auth = getAuth();
        const user = auth.currentUser;

        if (contacts.length > 0 && user) {
          const contactsRef = ref(database, `users/${user.uid}/contacts`);
          const locationRef = ref(database, `users/${user.uid}/location`);

          // Save contacts and location separately
          await set(contactsRef, contacts);
          await set(locationRef, { latitude, longitude });

          console.log("Contacts and location saved to Firebase");
        } else {
          console.log("No contacts found or user not authenticated");
        }
      } catch (error) {
        console.error("Error fetching data or saving to Firebase: ", error);
      }
    };

    handlePermissionsAndData();
  }, []);

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
      <View style={styles.headerContainer}>
        <FlatList
          data={userData}
          renderItem={({ item }) => (
            <UserHeader
              name={item.name}
              image={item.image}
              status={item.status}
              containerStyle={styles.userHeader}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.text}>Home Screen</Text>
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
  headerContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,

    width: width,
    height: 200,
    justifyContent: "center",
  },
  userHeader: {
    width: 80,
    height: 50,
  },
});

export default HomeScreen;
