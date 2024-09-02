import React, { useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { database } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import userData from "../data/userData";
import UserHeader from "../components/UserHeader";
import HomeTabs from "../navigation/HomeTabs";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
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
    <LinearGradient
      colors={["#FFC6C6", "#fff"]}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FlatList
            data={userData}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("UserDetail", { user: item })
                }
              >
                <UserHeader
                  name={item.name}
                  image={item.image}
                  status={item.status}
                  containerStyle={styles.userHeader}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.mainContainer}>
          <HomeTabs />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "absolute",
    top: "8%",
    left: "0%",
    right: "0%",
    width: width,
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  userHeader: {
    width: 80,
    height: 60,
    marginBottom: 10, // Corrected
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    marginTop: "30%", // Adjusted to ensure it's below the header
  },
});

export default HomeScreen;
