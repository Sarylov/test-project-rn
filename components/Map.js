import React from "react";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
  const { usersPos, userId } = props;
  const keys = Object.keys(usersPos);

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
        {keys.map((key) => {
          return (
            <Marker
              title={usersPos[[key]].username}
              pinColor={key == userId ? "#ff0000" : "#0080FF"}
              coordinate={{
                latitude: usersPos[[key]].latitude,
                longitude: usersPos[[key]].longitude,
              }}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Map;
