import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = (props) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
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
            latitude: props.position.coords.latitude,
            longitude: props.position.coords.longitude,
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
            latitude: 46.30,
            longitude: 44.25,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;
