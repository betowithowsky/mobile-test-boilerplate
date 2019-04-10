import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'
import axios from 'axios';

import Api from '../stores/api'

const api = new Api;

class BrandsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      brandCode: null,
      listaItens: []
    };
  }

  async showBrands() {
    
    const json = await api.getData('https://parallelum.com.br/fipe/api/v1/carros/marcas');
    this.setState({ listaItens: json });

  }

  goModels(codigo) {
    api.setBrandModels(codigo);
    console.log(api.getBrandModels());
    return this.props.navigation.navigate('Models');
  }

  componentWillMount() {

    this.showBrands();

  }

  render() {

    return (

      <FlatList
        data={this.state.listaItens}
        keyExtractor={(data) => data.codigo}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => this.goModels(item.codigo)}
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
