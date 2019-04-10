import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'
const api = new Api;

class PriceModelScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Veículo Infos'
      };

    constructor(props) {
        super(props);

        this.state = {
            valor: '',
            marca: '',
            modelo: '',
            ano: '',
            combustivel: '',
            codigoFipe: ''
        };
    }

    async getVehicleInfo() {

        const { navigation } = this.props;
        const { uiStore } = this.props

        const yearModelCode = navigation.getParam('yearModelCode', 'NO-ID');
        uiStore.updateSomeData('yearModelCode', yearModelCode);
        
        const json = await api.getData(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${uiStore.someData.brandCode}/modelos/${uiStore.someData.modelCode}/anos/${uiStore.someData.yearModelCode}`);
        this.setState({
            valor: json.Valor,
            marca: json.Marca,
            modelo: json.Modelo,
            ano: json.AnoModelo,
            codigoFipe: json.CodigoFipe,
            combustivel: json.Combustivel
        });

    }

    componentWillMount() {

        this.getVehicleInfo();
        
    }

    render() {

        return (
            <View style={styles.item} key={this.state.codigoFipe}>
                <Text>Valor: {this.state.valor}</Text>
                <Text>Marca: {this.state.marca}</Text>
                <Text>Modelo: {this.state.modelo}</Text>
                <Text>Ano: {this.state.ano}</Text>
                <Text>Combustivel: {this.state.combustivel}</Text>
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
    }

});

export default connect(
    PriceModelScreen,
    ['uiStore'],
)
