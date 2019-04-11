import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'
const api = new Api;

class ModelsScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Modelos'
    };

    async getModels() {
        const { navigation } = this.props;
        const { uiStore } = this.props

        uiStore.setIsFetching(true);
        const brandCode = navigation.getParam('brandCode', 'NO-ID');
        uiStore.updateSomeData('brandCode', brandCode);

        const json = await api.getData(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${uiStore.someData.brandCode}/modelos`);
        uiStore.updateSomeData('modelsList', json.modelos);
        uiStore.setIsFetching(false);
    }

    renderBtnAcessar() {
        const { uiStore } = this.props

        if (uiStore.isFetching) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <FlatList
                data={uiStore.someData.modelsList}
                keyExtractor={(data) => data.codigo.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Year', { modelCode: item.codigo })}
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

        this.getModels();

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
    ModelsScreen,
    ['uiStore'],
)
