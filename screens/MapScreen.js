import { View, StyleSheet, Button, LogBox } from "react-native";
import { useEffect, useState } from "react";
import { pushUser } from "./../helper/db/pushUser";
import Map from "../components/Map";
import { updateUser } from "./../helper/db/updateUser";
import { deleteUser } from "./../helper/db/deleteUser";
import { onValue, ref } from "firebase/database";
import { db } from "../database";

export default function MapScreen(props) {
  const { location, name, setLocation } = props;

  const [userId, setUserId] = useState(null);
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    onValue(ref(db, "users/"), (s) => setUserPos(s));
    setUserId(pushUser(name, location));
  }, []);

  const disable = () => {
    setLocation(null); //переключает на home
    deleteUser(userId); //удаляет текущую запись из бд
  };

  return (
    <View>
      <Map myPos={location} />
      <View style={styles.btnWrapper}>
        {/* <Button title="обновить" onPress={updateUser(userId, location)} /> */}
        <Button title="отключиться" onPress={disable} />
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
