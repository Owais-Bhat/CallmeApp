import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import { Video } from "expo-av";
import { ref, onValue, update } from "firebase/database";
import { getAuth, updatePassword } from "firebase/auth";
import { database } from "../services/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const HERE_API_KEY = "Q2GZ6LJ10iNyk7DK0xPrwTVt5sA96XwhnToQHJoEI-k";

const getAddressFromCoordinates = ({ latitude, longitude }) => {
  return new Promise((resolve, reject) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&at=${latitude},${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson && resJson.items && resJson.items.length > 0) {
          resolve(resJson.items[0].address.label);
        } else {
          reject("Address not found");
        }
      })
      .catch((e) => {
        reject(`Fetch error: ${e}`);
      });
  });
};

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [address, setAddress] = useState("");
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const preferencesRef = ref(database, `users/${userId}/preferences`);
    const locationRef = ref(database, `users/${userId}/location`);

    const unsubscribePreferences = onValue(preferencesRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData(data);
    });

    const unsubscribeLocation = onValue(locationRef, (snapshot) => {
      const locationData = snapshot.val();
      if (locationData) {
        const { latitude, longitude } = locationData;
        getAddressFromCoordinates({ latitude, longitude })
          .then((address) => setAddress(address))
          .catch((err) => console.error("Address fetch error:", err));
      }
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      unsubscribePreferences();
      unsubscribeLocation();
    };
  }, []);

  const handleUpdatePassword = () => {
    if (!newPassword) {
      Alert.alert("Error", "Password cannot be empty!");
      return;
    }
    updatePassword(auth.currentUser, newPassword)
      .then(() => Alert.alert("Success", "Password updated successfully!"))
      .catch((error) => Alert.alert("Error", error.message));
  };

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const { name, age, interestedIn, email, profileImage } = profileData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Video
        source={require("../../assets/videos/video1.mp4")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />

      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.overlay}
      >
        <Animated.View
          style={{ ...styles.contentContainer, opacity: fadeAnim }}
        >
          <View style={styles.profileHeader}>
            <TouchableOpacity>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.age}>{age} years old</Text>
              <View style={styles.infoRow}>
                <FontAwesome name="genderless" size={20} color="#ff5c5c" />
                <Text style={styles.interestedIn}>
                  Interested in: {interestedIn}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="map-marker" size={20} color="#ff5c5c" />
                <Text style={styles.location}>
                  Location: {address || "Fetching location..."}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("Preference")}
          >
            <Ionicons name="create-outline" size={24} color="#fff" />
            <Text style={styles.editButtonText}>Edit Preferences</Text>
          </TouchableOpacity>

          <View style={styles.passwordContainer}>
            <Text style={styles.infoText}>Update Password:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdatePassword}
            >
              <Text style={styles.updateButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ff5c5c",
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  age: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
  },
  interestedIn: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginLeft: 10,
  },
  location: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
  passwordContainer: {
    marginTop: 10,
    width: "100%",
    padding: 15,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ProfileScreen;
