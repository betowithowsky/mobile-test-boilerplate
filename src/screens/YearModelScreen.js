import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'
const api = new Api;

class YearModelScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Ano'
    };

    async getYearModels() {
        const { navigation } = this.props;
        const { uiStore } = this.props

        uiStore.setIsFetching(true);
        const modelCode = navigation.getParam('modelCode', 'NO-ID');
        uiStore.updateSomeData('modelCode', modelCode);

        const json = await api.getData(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${uiStore.someData.brandCode}/modelos/${uiStore.someData.modelCode}/anos`);
        uiStore.updateSomeData('yearModelList', json);
        uiStore.setIsFetching(false);
    }

    renderModelYearList() {
        const { uiStore } = this.props

        if (uiStore.isFetching) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <FlatList
                data={uiStore.someData.yearModelList}
                keyExtractor={(data) => data.codigo}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Price', { yearModelCode: item.codigo })}
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

        this.getYearModels();

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
    YearModelScreen,
    ['uiStore'],
)
