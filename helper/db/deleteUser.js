import { ref, remove } from "firebase/database";
import { db } from "../../database";
import { AsyncStorage } from "react-native";

export const deleteUser = (userId) => {
  remove(ref(db, `users/${userId}`));

};
