import React from 'react'
import { View, Text, Button } from 'react-native'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>See table fipe</Text>
        <Button title="Let's get it ----------" onPress={() => this.props.navigation.navigate('Brands')} />
      </View>
    )
  }
}

export default HomeScreen
