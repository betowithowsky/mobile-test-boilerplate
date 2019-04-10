import React from 'react'
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from '../stores/index.js'

import Api from '../stores/api'
const api = new Api;

class YearModelScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Anos'
      };

    async getYearModels() {
        const { navigation } = this.props;
        const { uiStore } = this.props

        const modelCode = navigation.getParam('modelCode', 'NO-ID');
        uiStore.updateSomeData('modelCode', modelCode);

        const json = await api.getData(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${uiStore.someData.brandCode}/modelos/${uiStore.someData.modelCode}/anos`);
        uiStore.updateSomeData('yearModelCode', json);
    }

    componentWillMount() {

        this.getYearModels();

    }

    render() {

        const { uiStore } = this.props

        return (

            <FlatList
                data={uiStore.someData.yearModelCode}
                keyExtractor={(data) => data.codigo}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Price', { yearModelCode: item.codigo })}
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
