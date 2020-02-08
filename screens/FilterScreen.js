import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { filterAction } from '../store/actions/recipes';

const FilterComponent = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
        value={props.value}
        onValueChange={props.onChangeFunc}
      />
    </View>
  );
};
const FilterScreen = props => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const { navigation } = props;

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
      lactoseFree: isLactoseFree
    };
    dispatch(filterAction(appliedFilters));
    console.log(appliedFilters);
  }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Available Filters</Text>
      <FilterComponent
        label='Gluten-free'
        value={isGlutenFree}
        onChangeFunc={newValue => setIsGlutenFree(newValue)}
      />
      <FilterComponent
        label='Lactose-Free'
        value={isLactoseFree}
        onChangeFunc={newValue => setIsLactoseFree(newValue)}
      />
      <FilterComponent
        label='Vegetarian'
        value={isVegetarian}
        onChangeFunc={newValue => setIsVegetarian(newValue)}
      />
      <FilterComponent
        label='Vegan'
        value={isVegan}
        onChangeFunc={newValue => setIsVegan(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    marginVertical: 20
  },
  filterLabel: {
    fontFamily: 'open-sans-regular',
    fontSize: 18
  },
  filterContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  }
});

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filters',

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='menu button'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='save button'
          iconName='md-checkmark'
          onPress={() => {
            navData.navigation.getParam('save')();
            navData.navigation.navigate({ routeName: 'MealFavTabBarScreen' });
          }}
        />
      </HeaderButtons>
    )
  };
};

export default FilterScreen;
