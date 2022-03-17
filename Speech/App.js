import { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [value, setValue] = useState('');

  const speak = () => {
    Speech.speak(value);
  };

  return (
    <View style={styles.container}>
      <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} value={value} onChangeText={value => setValue(value)} />
      <Button title="Press to hear some words" onPress={speak} />
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
