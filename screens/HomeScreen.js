import { Alert, Button, Text, TextInput, View, StyleSheet } from "react-native";
import getLocation from "../helper/getLocation";

export default function HomeScreen(props) {
  const { name, setName, setLocation } = props;

  const start = async () => {
    let response = await getLocation();

    if (response.coords) setLocation(response);
    else
      Alert.alert("ошибка подключения", [
        {
          text: "обновить",
          onPress: start,
        },
        { text: "закрыть", style: "cancel" },
      ]);
  };

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
