import React from "react";
import  { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    if (favMeals.length === 0) {
        return <View style={styles.emptyMsg}><DefaultText>No favorite meals found. Start adding some</DefaultText></View>
    }
    return <MealList navigation={props.navigation} listData={favMeals} />
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Favorites",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    )
}
};

const styles = StyleSheet.create({
    emptyMsg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default FavoritesScreen;
