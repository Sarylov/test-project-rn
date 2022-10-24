import { View, StyleSheet, Button, Text } from "react-native";
import { useEffect, useState } from "react";
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

  const setKey = async (uId) => {
    try {
      await AsyncStorage.setItem("userId", uId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onValue(ref(db, "users/"), (s) => setUsersPos(s.val()));
    if (!userId) {
      const uId = pushUser(name, location);
      setKey(uId);
      setUserId(uId);
    }
  }, []);

  const disable = () => {
    setLocation(null); //переключает на home
    deleteUser(userId); //удаляет текущую запись из бд
    // setKey(null);
    (async function removeKey() {
      try {
        await AsyncStorage.removeItem("userId");
      } catch (error) {
        console.log(error);
      }
    })();
    setUserId(null);
  };

  const update = async () => {
    let response = await getLocation();
    if (response.coords) {
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
