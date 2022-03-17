import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Button, TextInput, View } from 'react-native';

export default function App() {

    const [keyword, setKeyword] = useState('');
    const [coordinates, setCoordinates] = useState({ "lat": 60.1682102130725, "lng": 24.94182538558292 });
    const [places, setPlaces] = useState([]);

    async function getCoordinates() {

        const res = keyword.replace(/ /g, '')

        await fetch(`API${res}`)
            .then(response => response.json())
            .then(responseJson => setCoordinates({ "lat": responseJson.results[0].locations[0].latLng.lat, "lng": responseJson.results[0].locations[0].latLng.lng }))
            .catch(error => {
                Alert.alert('Error', error);
            });

        await fetch(`API`)
            .then(response => response.json())
            .then(responseJson => setPlaces(responseJson.results))
            .catch(error => {
                Alert.alert('Error', error);
            });
    }

    return (

        <View style={StyleSheet.absoluteFillObject}>
            <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude: coordinates.lat, longitude: coordinates.lng, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }} >
                {places.map((entry, index) => (

                    <Marker coordinate={{ latitude: entry.geometry.location.lat, longitude: entry.geometry.location.lng }} title={entry.name} key={index} />
                ))}
            </MapView>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} behavior="position">
                <TextInput style={{ width: '100%', height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }} value={keyword} onChangeText={value => setKeyword(value)} />
                <Button title='Restaurants within 2km' onPress={getCoordinates} ></Button>
            </View>
        </View>
    );
}
