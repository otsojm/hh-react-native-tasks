import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import { Header, Input, Button, ListItem, Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('addresses.db');

export default function History({ navigation }) {

  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresses (id integer primary key not null, address text);');
    });
    updateList();
  }, []);

  // Save address
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresses (address) values (?);', [address]);
    }, null, updateList
    )
  }

  // Update addresses
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses;', [], (_, { rows }) =>
        setData(rows._array)
      );
    });
  }

  // Delete address
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where id = ?;`, [id]);
      }, null, updateList
    )
  }

  return (
    <View>
      <Header centerComponent={{ text: 'PLACEFINDER APP', style: { color: '#FFFFFF' } }} />
      <Input
        placeholder='Type in address' label='ADDRESS'
        onChangeText={value => setAddress(value)} value={address} />
      <Button raised icon={{ name: 'save' }} onPress={saveItem} title="SAVE" />
      <FlatList data={data} renderItem={({ item }) => <ListItem onLongPress={() => deleteItem(item.id)}>
        <ListItem.Content>
          <ListItem.Title>{item.address}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Title style={{ fontSize: 10 }}>Show on map</ListItem.Title>
        <Icon name='chevron-right' onPress={() => navigation.navigate('Map', item.address)}></Icon>
      </ListItem>} keyExtractor={(item, index) => index.toString()} />
      <StatusBar style="auto" />
    </View>
  );
};