import { AsyncStorage } from "react-native";

export const setKey = async (uId) => {
  try {
    await AsyncStorage.setItem("userId", uId);
  } catch (error) {
    console.log(error);
  }
};
