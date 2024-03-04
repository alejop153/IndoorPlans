import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapComponent from "./Map";

function App() {
  return (
    <View style={styles.container}>
      <MapComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
