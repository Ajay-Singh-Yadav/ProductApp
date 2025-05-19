import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const TopBarComp = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.row, {margin: 20, backgroundColor: '#fff'}]}>
      <Image
        source={require('../assets/images/Menu.png')}
        style={{height: 30, width: 30}}
      />

      <Image
        source={require('../assets/images/Logo.png')}
        style={{height: 35, width: 87, marginLeft: 30}}
      />

      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/images/Search.png')}
          style={{height: 30, width: 30}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/images/shoppingBag.png')}
            style={{height: 30, width: 30, marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBarComp;

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
  },
});
