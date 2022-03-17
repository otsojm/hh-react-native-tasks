import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const buttonSum = () => {

    setData([...data, { key: value }]);
  }

  const buttonClear = () => {

    setData([]);
  }

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} value={value} onChangeText={value => setValue(value)} />
      </View>
      <View style={styles.buttons}>
        <Button title="Add" onPress={buttonSum} />
        <Button title="Clear" onPress={buttonClear} />
      </View>
      <View style={styles.history}>
        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Shopping List</Text>
        <FlatList data={data} renderItem={({ item }) => <Text>{item.key}</Text>} keyExtractor={(item, index) => index.toString()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    flex: 2,
    justifyContent: 'center',
  },
  buttons: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  history: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
