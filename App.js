/*
npm install react-native-screens
npm install react-navigation-header-buttons
npm install react-navigation-tabs
npm install react-navigation-stack
npm install react-navigation-material-bottom-tabs
npm install react-native-paper
npm install @expo/vector-icons
npm install redux react-redux

click r twice on android
cmd R on ios

JS Debugging  = (open development overlay via CTRL + M / CMD + M on Android devices, CMD + D

*/
import React, { useState } from "react";
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { useScreens } from 'react-native-screens'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import MealsNavigator from './navigation/MealsNavigator'
import mealsReducer from './store/reducers/meals'
import { createStackNavigator } from "react-navigation-stack";

useScreens()

const rootReducer = combineReducers({
    meals: mealsReducer
})
/*
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());
*/
const store = createStore(rootReducer)

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)
    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={err => console.log(err)} />
        )
    }
    return <Provider store={store}><MealsNavigator /></Provider>
}
