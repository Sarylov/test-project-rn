import { View, StyleSheet, Button, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { pushUser } from "./../helper/db/pushUser";
import Map from "../components/Map";
import { updateUser } from "./../helper/db/updateUser";
import { deleteUser } from "./../helper/db/deleteUser";
import { onValue, ref } from "firebase/database";
import { db } from "../database";
import { AsyncStorage } from "react-native";
import getLocation from "../helper/getLocation";

export default function MapScreen(props) {
  const { location, name, setLocation, userId, setUserId } = props;
  const [usersPos, setUsersPos] = useState(null);
  const intervalId = useRef();

  const setKey = async (uId) => {
    try {
      await AsyncStorage.setItem("userId", uId);
    } catch (error) {
      console.log(error);
    }
  };

  const startInterval = () => {
    const id = setInterval(() => {
      console.log("reload");
      update();
    }, 10000);

    intervalId.current = id;
  };

  useEffect(() => {
    onValue(ref(db, "users/"), (s) => setUsersPos(s.val()));
    if (!userId) {
      const uId = pushUser(name, location);
      setKey(uId);
      setUserId(uId);
    } else {
      update();
    }
    startInterval();

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const disable = () => {
    deleteUser(userId); //удаляет текущую запись из бд
    (async function removeKey() {
      try {
        await AsyncStorage.removeItem("userId");
      } catch (error) {
        console.log(error);
      }
    })();
    setUserId(null);
    setLocation(null);
  };

  const update = async () => {
    let response = await getLocation();
    let coords = response.coords;
    console.log(Math.abs(usersPos[userId].latitude - coords.latitude));
    if (
      Math.abs(usersPos[userId].latitude - coords.latitude) > 0.0001 ||
      Math.abs(usersPos[userId].longitude - coords.longitude) > 0.0001
    )
      if (coords) {
        setLocation(response);
        updateUser(userId, response);
      }
  };

  return (
    <View>
      {usersPos ? (
        <Map myPos={location} usersPos={usersPos} userId={userId} />
      ) : (
        <Text>loading...</Text>
      )}
      <View style={styles.btnWrapper}>
        {/* <Button title="обновить" onPress={updateUser(userId, location)} /> */}
        <Button title="отключиться" onPress={disable} />
        <Button title="обновить" onPress={update} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
});
