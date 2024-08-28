import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { Asset } from "expo-asset";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videoSource, setVideoSource] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadVideo() {
      const asset = Asset.fromModule(require("../../assets/videos/video1.mp4"));
      await asset.downloadAsync();
      setVideoSource(asset.localUri);
    }

    loadVideo();
  }, []);

  const handleSignup = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Navigate to Home screen on successful signup
      navigation.navigate("Preference");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {videoSource && (
          <Video
            source={{ uri: videoSource }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            isMuted={true}
            shouldPlay
            isLooping
          />
        )}
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.overlay}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor={"gray"}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholder="Enter your password"
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <LinearGradient
            colors={["#C75B7A", "#F05A7E"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
    marginBottom: 20,
    width: "100%",
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    zIndex: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  signupButton: {
    alignItems: "center",
    marginTop: 30,
  },
  gradient: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignupScreen;
