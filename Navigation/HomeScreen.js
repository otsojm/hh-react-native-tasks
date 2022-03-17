import { StatusBar } from 'expo-status-bar';
import { View, Button, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { React, useState } from 'react';

export default function HomeScreen({ navigation }) {

    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);

    const buttonSum = () => {

        let value = Number(firstValue) + Number(secondValue);

        setTotal(Number(firstValue) + Number(secondValue));
        setData([...data, { key: firstValue + " + " + secondValue + " = " + value }]);
    }

    const buttonSub = () => {

        let value = Number(firstValue) - Number(secondValue);

        setTotal(Number(firstValue) - Number(secondValue));
        setData([...data, { key: firstValue + " - " + secondValue + " = " + value }]);
    }

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
                <Button onPress={() => navigation.navigate('History', data)} title="History" />
            </View>
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
    parent: {
        flex: 2,
        justifyContent: 'center',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
