import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBarComp from '../components/TopBarComp';
import ProductListScreen from '../components/ProductListScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TopBarComp />
      <ProductListScreen />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
