import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
    headerTitle: "A Screen"
};

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            // only effect if shifting === true
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === "android" ? <Text style={{ fontFamily: 'open-sans-bold'}}>Meals..</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-star"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === "android" ? <Text style={{ fontFamily: 'open-sans-bold'}}>My favs..</Text> : 'My favs'
        }
    }
};

const MealsFavTabNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
              // doesn't have label color so need tooverride with <Text  for android
              activeTintColor: "white",
              shifting: true,
              barStyle: {
                  // handy if shifting === false
                  backgroundColor: Colors.primaryColor
              }
          })
        : createBottomTabNavigator(tabScreenConfig, {
              tabBarOptions: {
                  labelStyle: {
                      fontFamily: 'open-sans-bold'
                  },
                  activeTintColor: Colors.accentColor
              }
          });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        // can put this here if you want or below
        // navigationOptions: {
        //     drawerLabel: 'Filter!!'
        // },
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals List'
        },
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);
