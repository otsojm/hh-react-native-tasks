import { React } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function SettingScreen({ route }) {

    return (
        <View style={styles.parent}>
            <View style={styles.container}>
                <View style={styles.history}>
                    <FlatList data={route.params} renderItem={({ item }) => <Text>{item.key}</Text>} keyExtractor={(item, index) => index.toString()} />
                </View>
            </View>
            <StatusBar style="auto" />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 0.3,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    parent: {
      flex: 1,
      justifyContent: 'center',
    },
    history: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  