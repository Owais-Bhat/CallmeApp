// src/navigation/HomeTabs.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainScreen from "../screens/MainScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#F05A7E",
          height: 2,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
