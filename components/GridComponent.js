import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

const GridComponent = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={props.onSelect}
      >
        <View style={{ backgroundColor: props.color, ...styles.container }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    borderRadius: 3,
    elevation: 5
  },
  container: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
    borderRadius: 3
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 21,
    textAlign: 'right'
  }
});

export default GridComponent;
