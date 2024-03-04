import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ImageMapper from "react-image-mapper";

export default function App() {
  const URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";
  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "1",
        shape: "poly",
        coords: [25, 33, 27, 300, 128, 240, 128, 94],
        // preFillColor: "pink",
        image: "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg",
      },
      {
        name: "2",
        shape: "poly",
        coords: [219, 118, 220, 210, 283, 210, 284, 119],
        // preFillColor: "pink",
        image: "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg",
      },
      // ... rest of the areas
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageMapper
          src={URL}
          map={MAP}
          width={500}
          fillColor="red"
          onClick={(area) => {
            console.log("Area clicked: ", area);
          }}
        />
        {MAP.areas.map((area, index) => (
          <Image
            key={index}
            style={{
              zIndex: 100,
              position: "absolute",
              top: area.coords[1], // Adjust these values according to your needs
              left: area.coords[0], // Adjust these values according to your needs
              width: 50, // Adjust these values according to your needs
              height: 50, // Adjust these values according to your needs
            }}
            source={{ uri: area.image }}
          />
        ))}
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
  imageContainer: {
    position: "relative",
    width: 500, // Adjust this value according to your needs
    height: 500, // Adjust this value according to your needs
  },
});
