import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import { Header, Input, Button, ListItem, Icon } from 'react-native-elements';
import { useState } from 'react';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);

  const buttonAdd = () => {

    setData([...data, { id: id, product: product, amount: amount }]);
    setId(id + 1);
  }

  const buttonDelete = item => {

    setData(data.filter(value => value.id !== item.id));
  }

  return (
    <View>
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#FFFFFF' } }}
      />
      <Input
        placeholder='Type your product' label='PRODUCT'
        onChangeText={value => setProduct(value)} value={product} />
      <Input
        placeholder='Type the amount' label='AMOUNT'
        onChangeText={value => setAmount(value)} value={amount} />
      <Button raised icon={{ name: 'save' }} onPress={buttonAdd} title="SAVE" />
      <FlatList data={data} renderItem={({ item }) => <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.product}</ListItem.Title>
          <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        
        </ListItem.Content>
        <Icon name="delete" color="red" onPress={() => buttonDelete(item)}/>
      </ListItem>} keyExtractor={(item, index) => index.toString()} />
      <StatusBar style="auto" />
    </View>
  );
}
