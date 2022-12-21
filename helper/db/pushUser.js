import { ref, push } from "firebase/database";
import { db } from "../../database";

export const pushUser = (name, pos) => {
  let pushRef = push(ref(db, "users/"), {
    username: name,
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  });

  return pushRef.key;
};
