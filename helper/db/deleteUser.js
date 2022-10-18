import { ref, remove } from "firebase/database";
import { db } from "../../database";

export const deleteUser = (userId) => {
  remove(ref(db, `users/${userId}`));
};
