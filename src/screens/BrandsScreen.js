import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
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
    uiStore.setIsFetching(true);
    const json = await api.getData('https://parallelum.com.br/fipe/api/v1/carros/marcas');
    uiStore.updateSomeData('brandsList', json);
    uiStore.setIsFetching(false);

  }

  renderBrandsList() {
    const { uiStore } = this.props

    if (uiStore.isFetching) {
      return (
        <ActivityIndicator size="large" />
      )
    }
    return (
      <FlatList
        data={uiStore.someData.brandsList}
        keyExtractor={(data) => data.codigo}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('Models', { brandCode: item.codigo })}}
            >
              <View style={styles.item}>
                <Text style={styles.text}>{item.nome}</Text>
              </View>

            </TouchableOpacity>
          );
        }}
      />
    )
  }

  componentWillMount() {

    this.getBrands();

  }

  render() {

    const { uiStore } = this.props

    return (

      <View style={{ flex: 1 }}>
        {this.renderBtnAcessar()}
      </View>

      
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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  }

});

export default connect(
  BrandsScreen,
  ['uiStore'],
)
