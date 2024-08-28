import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { Asset } from "expo-asset";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
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

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.navigate("HomeTabs");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleForgotPassword = async () => {
    const auth = getAuth();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          "Password Reset",
          "A password reset link has been sent to your email."
        );
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please enter your email address first.");
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
        colors={["rgba(0,0,0,0.7)", "transparent"]}
        style={styles.overlay}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email Address"
          placeholderTextColor={"#fff"}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholder="Password"
            placeholderTextColor={"#fff"}
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={["#C75B7A", "#F05A7E"]}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
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
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
    marginBottom: 20,
    width: "100%",
    color: "#fff",
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  forgotPasswordText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  loginButton: {
    marginTop: 30,
    alignItems: "center",
  },
  gradientButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
