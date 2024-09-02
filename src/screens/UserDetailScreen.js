import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Linking from "expo-linking";

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("#FF69B4");
  const fadeAnim = new Animated.Value(0);
  const [descAnim] = useState(new Animated.Value(0));

  const handleChatPress = () => {
    setModalVisible(true);
  };

  const handleCallPress = () => {
    if (user.phone) {
      Linking.openURL(`tel:${user.phone}`);
    }
  };

  const handleRequestSend = () => {
    setButtonColor("#32CD32");
    setModalVisible(false);
  };

  // Animation for fading in the user details and sliding the description
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.timing(descAnim, {
      toValue: 1,
      duration: 1200,
      delay: 500,
      useNativeDriver: true,
    }).start();
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

      <View style={styles.overlay}>
        <Animated.View
          style={{ ...styles.contentContainer, opacity: fadeAnim }}
        >
          <Image source={user.image} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.iconRow}>
            <Ionicons name="location-outline" size={24} color="#FF69B4" />
            <Text style={styles.location}>{user.location}</Text>
          </View>

          <Animated.View style={{ opacity: descAnim }}>
            <Text style={styles.description}>{user.description.short}</Text>
            <Text style={styles.description}>{user.description.long}</Text>
          </Animated.View>

          {/* Hobbies Section */}
          <View style={styles.hobbiesContainer}>
            {user.hobbies.map((hobby, index) => (
              <View key={index} style={styles.hobbyItem}>
                <Ionicons name={hobby.icon} size={24} color="#FF69B4" />
                <Text style={styles.hobbyText}>{hobby.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleChatPress}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#fff"
              />
              <Text style={styles.buttonText}>Send Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.callButton]}
              onPress={handleCallPress}
            >
              <Ionicons name="call-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={user.image} style={styles.modalImage} />
            <Text style={styles.modalText}>Send Request to {user.name}?</Text>
            <TouchableOpacity
              style={[styles.requestButton, { backgroundColor: buttonColor }]}
              onPress={handleRequestSend}
            >
              <Text style={styles.requestButtonText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 15,
    borderWidth: 5,
    borderColor: "#FF69B4",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  location: {
    fontSize: 18,
    color: "#666",
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  hobbyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  hobbyText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: "#FF69B4",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    padding: 25,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#FF69B4",
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  requestButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  requestButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default UserDetailScreen;
