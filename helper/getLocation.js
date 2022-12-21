import * as Location from "expo-location";

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export default getLocation;
