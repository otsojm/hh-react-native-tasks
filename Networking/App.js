import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';


  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {

    fetch(`API${keyword}`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const listSeparator = () => {

    return (

      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image source = {{uri: item.strMealThumb }}
   style = {{ width: 200, height: 200 }}></Image>
          </View>}
        data={recipes}
        ItemSeparatorComponent={listSeparator} />
      <View style={{ marginBottom: 50 }}>
        <TextInput style={{ fontSize: 18, width: 200 }} placeholder='keyword'
          onChangeText={text => setKeyword(text)} />
        <Button title="Find" onPress={getRecipes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});