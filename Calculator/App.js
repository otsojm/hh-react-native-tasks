import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [total, setTotal] = useState(0);

  const buttonSum = () => { setTotal(Number(firstValue) + Number(secondValue)); }

  const buttonSub = () => { setTotal(Number(firstValue) - Number(secondValue)); }

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <Text>Result: {total}</Text>
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} numericvalue keyboardType={'numeric'} value={firstValue} onChangeText={value => setFirstValue(value)} />
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} numericvalue keyboardType={'numeric'} value={secondValue} onChangeText={value => setSecondValue(value)} />
      </View>
      <View style={styles.buttons}>
        <Button title="Sum +" onPress={buttonSum} />
        <Button title="Subtract -" onPress={buttonSub} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    flex: 2,
    justifyContent: 'center',
  },
  buttons: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
