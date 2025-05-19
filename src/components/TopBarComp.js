import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const TopBarComp = () => {
  const cartItem = useSelector(state => state.cart.items);

  const itemCount = cartItem.length;

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
          <View style={{position: 'relative'}}>
            <Image
              source={require('../assets/images/shoppingBag.png')}
              style={{height: 30, width: 30, marginLeft: 10}}
            />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBarComp;

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
