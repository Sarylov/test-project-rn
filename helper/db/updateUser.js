import { ref, update } from "firebase/database";
import { db } from "../../database";

export const updateUser = (userId, pos) => {
  update(ref(db, `users/${userId}`), {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  });
};
