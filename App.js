import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import Map from "./components/Map";
import getLocation from "./helper/useLocation";
import { ref, set, update, onValue, push } from "firebase/database";
import { db } from "./database";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      // const data = snapshot.val();
      // console.log(snapshot);
    });

    return () => {
      console.log("close");
    };
  }, []);

  function writeUserData(name, pos) {
    let pushRef = push(ref(db, "users/"), {
      username: name,
      latitude: pos.latitude,
      longitude: pos.longitude,
    });
    console.log(pushRef.key);
    setUserId(pushRef.key);
  }

  function updateUserData(pos) {
    update(ref(db, `users/${userId}`), {
      latitude: pos.latitude,
      longitude: pos.longitude,
    });
  }

  const start = async () => {
    setIsLoading(true);
    let response = await getLocation();
    if (response.coords) {
      setLocation(response);
      writeUserData(name, response.coords);
      setIsLoading(false);
    } else setErrorMsg("ошибка подключения");
  };

  const reload = async () => {
    setIsLoading(true);
    let response = await getLocation();
    if (response.coords) {
      setLocation(response);
      updateUserData(response.coords);
      setIsLoading(false);
    } else setErrorMsg("ошибка подключения");
  };

  const disable = () => {
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      {!location && (
        <Text style={styles.info}>имя видно всем пользователям</Text>
      )}
      {!location && (
        <TextInput
          style={styles.input}
          placeholder="имя"
          value={name}
          onChangeText={(text) => setName(text)}
          autoFocus={true}
        />
      )}
      {!location && (
        <Button
          title="начать"
          onPress={start}
          disabled={name == "" ? true : false}
        />
      )}
      {location && <Map position={location} />}
      {location && (
        <View style={styles.btnWrapper}>
          <Button title="обновить" onPress={reload} />
          <Button title="отключиться" onPress={disable} />
        </View>
      )}
      {isLoading && <Text>waiting...</Text>}
      {errorMsg && <Text>{errorMsg}</Text>}
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

  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },

  info: {
    color: "gray",
  },

  input: {
    minWidth: "50%",
    margin: 15,
    borderWidth: 1,
    padding: 10,
  },
});
