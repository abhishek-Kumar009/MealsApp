import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { toggleFavAction } from '../store/actions/recipes';

const RecipeScreen = props => {
  const recId = props.navigation.getParam('recId');
  const availableRecipes = useSelector(state => state.recipeRed.recipes);
  const selectedRec = availableRecipes.find(rec => rec.id === recId);

  const isFavRec = useSelector(state =>
    state.recipeRed.favoriteRecipes.some(rec => rec.id === recId)
  );

  useEffect(() => {
    props.navigation.setParams({ isFav: isFavRec });
  }, [isFavRec]);

  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavAction(recId));
  }, [recId, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler });
  }, [toggleFavHandler]);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={{ uri: selectedRec.imageUrl }}
            />
          </View>
          <View style={styles.ingredientsContainer}>
            <View style={styles.ingText}>
              <Text style={styles.ingredients}>Ingredients</Text>
            </View>
            <View style={styles.listOfIng}>
              {selectedRec.ingredients.map(ingredient => (
                <Text
                  numberOfLines={2}
                  key={ingredient}
                  style={styles.ingredientInfo}
                >
                  {' '}
                  {ingredient}{' '}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepsText}>
              <Text style={styles.steps}>Steps</Text>
            </View>
            <View style={styles.listOfSteps}>
              {selectedRec.steps.map(step => (
                <Text numberOfLines={5} key={step} style={styles.stepInfo}>
                  {step}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

RecipeScreen.navigationOptions = navigationData => {
  // const recId = navigationData.navigation.getParam('recId');
  // const selectedRec = RECIPES.find(rec => rec.id === recId);
  const recipeTitle = navigationData.navigation.getParam('recipeTitle');
  const isFavStatus = navigationData.navigation.getParam('isFav');
  let icon = 'ios-star-outline';
  if (isFavStatus) {
    icon = 'ios-star';
  }

  return {
    headerTitle: recipeTitle,
    headerTitleStyle: {
      fontSize: 14,
      fontFamily: 'open-sans-bold'
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='favorite'
          iconName={icon}
          onPress={() => {
            navigationData.navigation.getParam('toggleFav')();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  mainContainer: {
    padding: 10,
    alignItems: 'center'
  },
  imgContainer: {
    width: 330,
    height: 310,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginVertical: 15
  },
  image: {
    width: '100%',
    height: '100%'
  },
  ingText: {
    width: 300
  },
  ingredientsContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 15
  },
  ingredients: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'left'
  },
  listOfIng: {
    width: 300
  },
  ingredientInfo: {
    fontFamily: 'open-sans-regular',
    fontSize: 16
  },
  stepsContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    padding: 15
  },
  stepsText: {
    width: 300
  },
  steps: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'left'
  },
  listOfSteps: {
    width: 300
  },
  stepInfo: {
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    marginVertical: 3
  }
});
export default RecipeScreen;
