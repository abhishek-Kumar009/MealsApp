import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';

const FavoriteScreen = props => {
  const FavoritesData = useSelector(state => state.recipeRed.favoriteRecipes);
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
  if (FavoritesData.length > 0) {
    // console.log(FavoritesData);
    return (
      <View style={styles.screen}>
        <FlatList numColumns={2} data={FavoritesData} renderItem={recipeList} />
      </View>
    );
  } else {
    return (
      <View style={styles.emptyScreen}>
        <Text>Add a Favorite to see here.</Text>
      </View>
    );
  }
};

FavoriteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favorites',
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
    )
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

export default FavoriteScreen;
