import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
//import { getAnalytics } from "firebase/analytics";

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [groceries, setGroceries] = useState([]);

  const firebaseConfig = {
    apiKey: "X",
    authDomain: "X",
    databaseURL: "X",
    projectId: "X",
    storageBucket: "X",
    messagingSenderId: "X",
    appId: "X",
    measurementId: "X"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  //const analytics = getAnalytics(app);

  const saveItem = () => {

    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
  }


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  useEffect(() => {

    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {

        setGroceries(Object.values(data));
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(product) => setProduct(product)}
        value={product} />
      <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount} />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping list</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        key={item => item.id}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.product} : {item.amount}</Text>
        </View>}
        data={groceries}
        ItemSeparatorComponent={listSeparator}
      />
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
