import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { ref, set } from "firebase/database";
import { database } from "../services/firebase"; // Update path as needed
import { getAuth } from "firebase/auth";

const PreferenceScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [interestedIn, setInterestedIn] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    async function loadVideo() {
      const asset = Asset.fromModule(require("../../assets/videos/video1.mp4"));
      await asset.downloadAsync();
      setVideoSource(asset.localUri);
    }

    loadVideo();
  }, []);

  const handleSavePreferences = async () => {
    if (!interestedIn || !name || !age || !profileImage) {
      Alert.alert("Please complete all fields");
      return;
    }

    const userPreferences = {
      name,
      age,
      interestedIn,
      profileImage,
    };

    try {
      const userId = getAuth().currentUser.uid; // Get user ID from authenticated user
      const preferencesRef = ref(database, `users/${userId}/preferences`); // Save under "preferences" key
      await set(preferencesRef, userPreferences);

      // Navigate to home screen after saving preferences
      navigation.navigate("BottomTabs");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      Alert.alert("Failed to save preferences");
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {videoSource && (
        <Video
          source={{ uri: videoSource }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          isMuted
          shouldPlay
          isLooping
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.title}>Set Up Your Profile</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Image
                source={require("../../assets/camera.png")}
                style={styles.cameraIcon}
              />
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Your Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.subTitle}>Interested In</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              interestedIn === "male" && styles.selectedOption,
            ]}
            onPress={() => setInterestedIn("male")}
          >
            <Image
              source={require("../../assets/male.png")}
              style={styles.genderIcon}
            />
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              interestedIn === "female" && styles.selectedOption,
            ]}
            onPress={() => setInterestedIn("female")}
          >
            <Image
              source={require("../../assets/female.png")}
              style={styles.genderIcon}
            />
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSavePreferences}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    margin: 10,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#F05A7E",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  genderIcon: {
    width: 50,
    height: 50,
  },
  saveButton: {
    backgroundColor: "#F05A7E",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default PreferenceScreen;
