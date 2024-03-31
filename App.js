import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapComponent from "./Map";

function App() {
  const cHeight = 700;
  const cWidth = 1500;
  return (
    <View style={styles.container}>
      <View style={{ height: cHeight, width: cWidth }}>
        <MapComponent cHeight={cHeight} cWidth={cWidth} />
      </View>
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
