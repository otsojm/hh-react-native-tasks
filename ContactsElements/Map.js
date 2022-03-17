import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';

export default function Map({ route }) {

  const [coordinates, setCoordinates] = useState({ "lat": 60.20179, "lng": 24.93396 });

  const getCoordinates = () => {

    const res = route.params.replace(/ /g, '')

    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=l5og1m6pmuWIoBuECDA2yiFmCDrBDtLy&location=${res}`)
      .then(response => response.json())
      .then(responseJson => setCoordinates({ "lat": responseJson.results[0].locations[0].latLng.lat, "lng": responseJson.results[0].locations[0].latLng.lng }))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  useEffect(() => {

    getCoordinates();
  }, []);


  return (

    <View style={StyleSheet.absoluteFillObject}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude: coordinates.lat, longitude: coordinates.lng, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }} >
        <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} title={route.params} />
      </MapView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} behavior="position">
      </View>
    </View>
  );
}