import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import BrandsScreen from './screens/BrandsScreen'
import ModelsScreen from './screens/ModelsScreen'
import YearModelScreen from './screens/YearModelScreen'
import PriceModelScreen from './screens/PriceModelScreen'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Brands: {
    screen: BrandsScreen,
  },
  Models: {
    screen: ModelsScreen,
  },
  Year: {
    screen: YearModelScreen,
  },
  Price: {
    screen: PriceModelScreen,
  },
})

export default createAppContainer(AppNavigator)
