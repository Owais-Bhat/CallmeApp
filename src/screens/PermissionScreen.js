import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import { database, ref, set } from "../services/firebase";

const PermissionScreen = ({ navigation }) => {
  const requestPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        // Save contacts to Firebase Realtime Database
        const userId = "someUserId"; // Replace with actual user ID
        await set(ref(database, "contacts/" + userId), data);
        // Alert.alert("Contacts saved successfully!");
        navigation.navigate("Home");
      }
    } else {
      Alert.alert("Permission denied");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Allow Contacts" onPress={requestPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default PermissionScreen;
