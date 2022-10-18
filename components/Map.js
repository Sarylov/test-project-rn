import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
  const { myPos } = props;

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
        <Marker
          title="Я"
          description="мое местоположение"
          coordinate={{
            latitude: myPos.coords.latitude,
            longitude: myPos.coords.longitude,
          }}
        />

        <Marker
          title="Максим"
          description="мой друг"
          pinColor="#0080FF"
          coordinate={{
            latitude: 46.3078,
            longitude: 44.2558,
          }}
        />
        <Marker
          title="Наталья"
          description="моя подруга"
          pinColor="#0080FF"
          coordinate={{
            latitude: 46.3,
            longitude: 44.25,
          }}
        />
      </MapView>
    </>
  );
};

export default Map;
