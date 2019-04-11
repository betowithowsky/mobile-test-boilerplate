import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
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

        uiStore.setIsFetching(true);
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
        uiStore.setIsFetching(false);

    }

    renderVehicleInfos() {
        const { uiStore } = this.props

        if (uiStore.isFetching) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <View style={styles.item}>
                <Text style={styles.text}>Valor: {this.state.valor}</Text>
                <Text style={styles.text}>Marca: {this.state.marca}</Text>
                <Text style={styles.text}>Modelo: {this.state.modelo}</Text>
                <Text style={styles.text}>Ano: {this.state.ano}</Text>
                <Text style={styles.text}>Combustivel: {this.state.combustivel}</Text>
            </View>
        )
    }

    componentWillMount() {

        this.getVehicleInfo();
        
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.renderVehicleInfos()}
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
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }

});

export default connect(
    PriceModelScreen,
    ['uiStore'],
)
