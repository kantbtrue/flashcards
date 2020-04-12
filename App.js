import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { lightGreen, white, black } from './utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Constants from 'expo-constants'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="DeckList"
      navigationOptions={{
        header: null
      }} 
      tabBarOptions = {{
        activeTintColor: white,
        inactiveTintColor: black,
        style: {
          height: 106,
          backgroundColor: Platform.OS === 'ios' ? white : lightGreen,
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        }
      }}
    >
      <Tabs.Screen
        name="DeckList"
        component={DeckList}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons 
                                            name='cards'
                                            size={30} 
                                            color={tintColor}
                                          />}}
      />
      <Tabs.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>}}
      />
    </Tabs.Navigator>
  )
}

const MainNavigator = createStackNavigator()

function MyMainNavigator() {
  return (
    <MainNavigator.Navigator
      screenOptions={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: lightGreen,
        }
      }} 
    >
      <MainNavigator.Screen name="Home" component={MyTabs} />
      <MainNavigator.Screen name="Deck" component={Deck} />
      <MainNavigator.Screen name="Quiz" component={Quiz} />
      <MainNavigator.Screen name="NewCard" component={NewCard} />
    </MainNavigator.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={lightGreen} barStyle='light-content' />
          <MyMainNavigator />
        </View>
      </NavigationContainer>
    </Provider>
  )
}