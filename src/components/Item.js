import React, { Component } from 'react'
import { View, Text, } from 'react-native'

export default class Item extends Component {
    render() {
        return (
            <TouchableOpacity>
                <View>
                    <Text>{this.props.item.nome}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
