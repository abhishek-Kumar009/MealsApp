import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors';
import { Platform, Text } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import RecipeScreen from '../screens/RecipeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilterScreen from '../screens/FilterScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsContainer = createStackNavigator(
  {
    CategoriesScreen: {
      screen: CategoriesScreen
    },
    CategoriesMealScreen: {
      screen: CategoriesMealScreen
    },
    RecipeScreen: RecipeScreen
  },
  {
    mode: 'modal',
    defaultNavigationOptions: defaultNavOptions
  }
);

const FavStackNavigator = createStackNavigator(
  {
    FavScreen: {
      screen: FavoriteScreen,
      navigationOptions: {
        headerTitle: 'Favorites',
        headerStyle: {
          backgroundColor: Colors.accentColor
        }
      }
    },
    RecipeScreen: RecipeScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const screenLoader = {
  Meal: {
    screen: MealsContainer,
    navigationOptions: {
      tabBarIcon: tabBarInfo => (
        <Ionicons
          name='ios-restaurant'
          size={25}
          color={tabBarInfo.tintColor}
        />
      ),
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        )
    }
  },
  Favorites: {
    screen: FavStackNavigator,
    navigationOptions: {
      tabBarIcon: tabBarInfo => (
        <Ionicons name='ios-star' size={25} color={tabBarInfo.tintColor} />
      ),
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        )
    }
  }
};

const MealFavTabBar =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(screenLoader, {
        activeColor: 'white',
        shifting: true
        // barStyle: {
        //   backgroundColor: Colors.primary
        // }
      })
    : createBottomTabNavigator(screenLoader, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
          labelStyle: {
            fontFamily: 'open-sans-bold'
          }
        }
      });

const FilterNav = createStackNavigator(
  {
    FilterNavScreen: FilterScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MealDrawerNav = createDrawerNavigator(
  {
    MealFavTabBarScreen: {
      screen: MealFavTabBar,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    FilterNavScreen: {
      screen: FilterNav,
      navigationOptions: {
        drawerLabel: 'Filter'
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-regular'
      }
    }
  }
);

export default createAppContainer(MealDrawerNav);
