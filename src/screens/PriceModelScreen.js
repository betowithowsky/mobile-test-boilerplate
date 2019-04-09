import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'

class PriceModelScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valor: '',
            marca: '',
            modelo: '',
            ano: '',
            combustivel: ''
        };
    }

    async showModels() {

        const api = new Api;
        //const BrandCode = api.getCodeModels();
        //console.log(BrandCode);
        const json = await api.getPriceModelsCars(api.getCodeModels());
        this.setState({
            valor: json.Valor,
            marca: json.Marca,
            modelo: json.Modelo,
            ano: json.AnoModelo,
            combustivel: json.Combustivel
        });


    }

    componentWillMount() {

        this.showModels();

    }

    render() {

        return (
            <View style={styles.item}>
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
