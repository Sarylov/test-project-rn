import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import Map from "./components/Map";
import getLocation from "./helper/getLocation";
import { ref, set, update, onValue, push } from "firebase/database";
import { db } from "./database";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      {!location ? (
        <HomeScreen name={name} setName={setName} setLocation={setLocation} />
      ) : (
        <MapScreen name={name} location={location} setLocation={setLocation} />
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
