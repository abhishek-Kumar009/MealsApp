import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image
} from 'react-native';

const Card = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableCmp activeOpacity={0.6} onPress={props.onSelect}>
        <View>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {props.title}
            </Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.duration}>{props.duration}m</Text>
            <Text style={styles.complexity}>{props.complexity}</Text>
            <Text style={styles.affordability}>{props.affordability}</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 200,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 170,
    // borderWidth: 2,
    overflow: 'hidden'
  },
  imgContainer: {
    alignItems: 'center'
  },
  titleContainer: {},
  image: {
    width: 150,
    height: 120
  },

  title: {
    fontFamily: 'open-sans-regular',
    fontSize: 14,
    textAlign: 'center',
    padding: 7
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150
  },
  duration: {
    fontFamily: 'open-sans-bold',
    fontSize: 11,
    marginRight: 5,
    textAlign: 'left'
  },
  complexity: {
    fontFamily: 'open-sans-bold',
    fontSize: 11,
    marginRight: 5
  },
  affordability: {
    fontFamily: 'open-sans-bold',
    fontSize: 11
  }
});

export default Card;
