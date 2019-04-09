import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'

class ModelsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = { listaItens: [] };
    }

    async showModels() {

        const api = new Api;
        const json = await api.getModelsCars();
        this.setState({ listaItens: json });


    }

    componentWillMount() {

        this.showModels();

    }

    goYear(codigo){
      const api = new Api;
      api.setCodeModels(codigo);
      return this.props.navigation.navigate('Year');
    }

    render() {

        return (

            <FlatList
                data={this.state.listaItens}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                        onPress={() => this.goYear(item.codigo)}
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
    ModelsScreen,
    ['uiStore'],
)
