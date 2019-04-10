import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'
import axios from 'axios';

import Api from '../stores/api'
const api = new Api;

class BrandsScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Marcas'
  };

  async getBrands() {

    const { uiStore } = this.props
    
    const json = await api.getData('https://parallelum.com.br/fipe/api/v1/carros/marcas');
    uiStore.updateSomeData('brandsList', json);

  }

  componentWillMount() {

    this.getBrands();

  }

  render() {

    const { uiStore } = this.props

    return (
    

      <FlatList
        data={uiStore.someData.brandsList}
        keyExtractor={(data) => data.codigo}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Models', {brandCode: item.codigo})}
            >
              <View style={styles.item}>
                <Text>{item.nome}</Text>
              </View>

            </TouchableOpacity>
          );
        }}
      />
    )
  }
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#999',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
  }

});

export default connect(
  BrandsScreen,
  ['uiStore'],
)
