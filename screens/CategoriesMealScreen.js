import React from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { CategoriesData } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../components/Card';

const CategoriesMealScreen = props => {
  //Alternative approach
  const catId = props.navigation.getParam('catId');
  const availableRecipes = useSelector(
    state => state.recipeRed.filteredRecipes
  );
  const displayedRecipes = availableRecipes.filter(
    rec => rec.categoryIds.indexOf(catId) >= 0
  );

  const recipeList = ItemData => {
    return (
      <Card
        title={ItemData.item.title}
        imageUrl={ItemData.item.imageUrl}
        duration={ItemData.item.duration}
        complexity={ItemData.item.complexity}
        affordability={ItemData.item.affordability}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'RecipeScreen',
            params: {
              recId: ItemData.item.id,
              recipeTitle: ItemData.item.title
            }
          });
        }}
      />
    );
  };
  if (displayedRecipes.length > 0) {
    return (
      <View style={styles.screen}>
        <FlatList
          numColumns={2}
          data={displayedRecipes}
          renderItem={recipeList}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.emptyScreen}>
        <Text>Oops! There are no meals for the provided filters.</Text>
      </View>
    );
  }
};

CategoriesMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('catId');
  const selectedCat = CategoriesData.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCat.title
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CategoriesMealScreen;
