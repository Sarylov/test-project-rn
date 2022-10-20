import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
  const { usersPos, userId } = props;
  const kays = Object.keys(usersPos);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 46.3078,
          longitude: 44.2558,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {kays.map((kay) => {
          return (
            <Marker
              title={usersPos[[kay]].username}
              pinColor={kay === userId ? "#ff0000" : "#0080FF"}
              coordinate={{
                latitude: usersPos[[kay]].latitude,
                longitude: usersPos[[kay]].longitude,
              }}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Map;
