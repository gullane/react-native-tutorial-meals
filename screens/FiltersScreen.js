import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = props => (
    <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
            thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
            trackColor={{ true: Colors.primaryColor }}
            value={props.value}
            onValueChange={props.onValueChange}
        />
    </View>
);

const FiltersScreen = props => {
    const { navigation } = props

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVeganFree, setIsVeganFree] = useState(false);
    const [isVegetarianFree, setIsVegetarianFree] = useState(false);

    // useCallback - this function only recreated if any dependency changes
    const saveFilters = useCallback(() => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        veganFree: isVeganFree,
        vegetarianFree: isVegetarianFree
      }
      console.log(appliedFilters)
    }, // dependencies
    [isGlutenFree, isLactoseFree,  isVeganFree, isVeganFree])

    // only called if dependencies changed
    // note if the dependencies array is empty [], useEffect is only called once
    useEffect(() => {
      navigation.setParams({ save: saveFilters })
    }, [saveFilters /* navigation  - this should be here but causes infinite loop */])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                value={isGlutenFree}
                onValueChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                value={isLactoseFree}
                onValueChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                value={isVeganFree}
                onValueChange={newValue => setIsVeganFree(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                value={isVegetarianFree}
                onValueChange={newValue => setIsVegetarianFree(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Filters",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-save"
                    onPress={() => {
                        const params = navData.navigation.getParam('save')()
                        console.log('saving filters')

                    }}
                />
            </HeaderButtons>
        )
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        margin: 20,
        alignItems: "center"
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 15
    }
});

export default FiltersScreen;
