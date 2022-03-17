import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Button, TextInput, View } from 'react-native';

export default function App() {

    const [keyword, setKeyword] = useState('Haaga-Helia');
    const [coordinates, setCoordinates] = useState({ "lat": 60.20179, "lng": 24.93396 });

    const getCoordinates = () => {

        const res = keyword.replace(/ /g, '')

        fetch(`API${res}`)
            .then(response => response.json())
            .then(responseJson => setCoordinates({ "lat": responseJson.results[0].locations[0].latLng.lat, "lng": responseJson.results[0].locations[0].latLng.lng }))
            .catch(error => {
                Alert.alert('Error', error);
            });
    }

    return (

        <View style={StyleSheet.absoluteFillObject}>
            <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude: coordinates.lat, longitude: coordinates.lng, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }} >
                <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} title={keyword} />
            </MapView>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} behavior="position">
                <TextInput style={{ width: '100%', height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }} value={keyword} onChangeText={value => setKeyword(value)} />
                <Button title='SHOW' onPress={getCoordinates} ></Button>
            </View>
        </View>
    );
}
