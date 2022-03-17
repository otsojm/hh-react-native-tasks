import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [startingValue, setStartingValue] = useState('');
  const [startingCurrency, setStartingCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [converted, setConverted] = useState(0);

  const buttonConvert = () => {

    fetch("API")
      .then(response => response.json())
      .then(responseJson => setConverted(parseFloat(Number(startingValue / responseJson.rates[startingCurrency])).toFixed(2)))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const fetchData = () => {

    fetch("API")
      .then(response => response.json())
      .then(responseJson => setCurrencies(Object.keys(responseJson.rates)))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/04/23/17/05/blue-39105_960_720.png' }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 20 }}>{converted} €</Text>
      <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} numericvalue keyboardType={'numeric'} value={startingValue} onChangeText={value => setStartingValue(value)} />
      <Picker
        selectedValue={startingCurrency}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setStartingCurrency(itemValue)}
      >
        {currencies.map((entry, index) => (
          <Picker.Item label={entry} value={entry} key={index} />
        ))}
      </Picker>
      <Button title="Convert" onPress={buttonConvert} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
