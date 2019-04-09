import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'

class YearModelScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = { listaItens: [] };
    }

    async showModels() {

        //const BrandCode = api.getCodeModels();
        //console.log(BrandCode);
        const json = await api.getYearModelsCars(api.getCodeModels());
        this.setState({ listaItens: json });

    }

    componentWillMount() {

        this.showModels();

    }

    goPrice(codigo) {
        const api = new Api;
        api.setYearModels(codigo);
        return this.props.navigation.navigate('Price');
    }

    render() {

        return (

            <FlatList
                data={this.state.listaItens}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                        onPress={() => this.goPrice(item.codigo)}
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
    YearModelScreen,
    ['uiStore'],
)
