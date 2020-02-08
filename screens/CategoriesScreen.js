import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { CategoriesData } from '../data/dummy-data';
import GridComponent from '../components/GridComponent';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const CategoriesScreen = props => {
  const renderGridItems = ItemData => (
    <GridComponent
      color={ItemData.item.color}
      title={ItemData.item.title}
      onSelect={() => {
        props.navigation.navigate({
          routeName: 'CategoriesMealScreen',
          params: {
            catId: ItemData.item.id
          }
        });
      }}
    />
  );

  return (
    <View styles={styles.screen}>
      <FlatList
        numColumns={2}
        data={CategoriesData}
        renderItem={renderGridItems}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu button'
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
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CategoriesScreen;
