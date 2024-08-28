import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Video } from "expo-av";
import { Asset } from "expo-asset";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    async function loadVideo() {
      const asset = Asset.fromModule(require("../../assets/videos/video1.mp4"));
      await asset.downloadAsync();
      setVideoSource(asset.localUri);
    }

    loadVideo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.overlay}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.view}
          >
            <LinearGradient
              colors={["#C75B7A", "#F05A7E"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.view2}
          >
            <LinearGradient
              colors={["#C75B7A", "#F05A7E"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    justifyContent: "flex-end",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent overlay to make text and buttons stand out
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    justifyContent: "center",
    flexDirection: "row",
    gap: 40,
    marginTop: 120,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
    marginVertical: 120,
    alignItems: "center",
    width: "55%",
  },
  loginButton: {
    backgroundColor: "#007BFF",
  },
  signupButton: {
    backgroundColor: "#28A745",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 50,
    alignSelf: "center",
    // Change the logo color to white when in the overlay.
    color: "#FFFFFF",
  },
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "fle-end",
    alignItems: "flex-end",
  },
  view2: {
    width: "100%",
    height: "100%",
    justifyContent: "fle-end",
    alignItems: "flex-start",
  },
});

export default WelcomeScreen;
