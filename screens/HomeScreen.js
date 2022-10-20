import { useEffect } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import getLocation from "../helper/getLocation";
import { AsyncStorage } from "react-native";

export default function HomeScreen(props) {
  const { userId, setUserId, name, setName, setLocation } = props;

  const start = async () => {
    console.log("home " + userId);

    if (userId) {
      setLocation(true);
    } else {
      let response = await getLocation();
      if (response.coords) setLocation(response);
    }
  };

  const getKey = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        setUserId(value);
        return;
      }
    } catch (error) {
      console.log("error " + error);
    }
  };

  useEffect(() => {
    getKey();
  }, []);

  useEffect(() => {
    if (userId) setLocation(true);
  }, [userId]);

  return (
    <View>
      <Text style={styles.info}>имя видно всем пользователям</Text>

      <TextInput
        style={styles.input}
        placeholder="имя"
        value={name}
        onChangeText={(text) => setName(text)}
        autoFocus={true}
      />

      <Button
        title="начать"
        onPress={start}
        disabled={name == "" ? true : false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
