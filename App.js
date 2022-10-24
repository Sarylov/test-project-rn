import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <View style={styles.container}>
      {!location ? (
        <HomeScreen
          userId={userId}
          setUserId={setUserId}
          name={name}
          setName={setName}
          setLocation={setLocation}
        />
      ) : (
        <MapScreen
          userId={userId}
          setUserId={setUserId}
          name={name}
          location={location}
          setLocation={setLocation}
        />
      )}
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
