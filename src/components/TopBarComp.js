import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const TopBarComp = () => {
  const cartItem = useSelector(state => state.cart.items);

  const itemCount = cartItem.length;

  return (
    <View
      style={[styles.row, {margin: 10, backgroundColor: '#fff', opacity: 0.9}]}>
      <View style={styles.leftIcons}>
        <View
          style={{
            marginRight: 10,
            backgroundColor: '#fff',
            borderRadius: 30,
          }}>
          <Ionicons name="menu" size={30} color="black" />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,

            padding: 5,
          }}>
          <EvilIcons name="user" size={30} color="black" />
        </View>
      </View>

      <Image
        source={require('../assets/images/logo.jpg')}
        style={{height: 40, width: 87, resizeMode: 'contain'}}
      />

      <View style={styles.rightContainerIcons}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 30,
          }}>
          <Ionicons name="search" size={24} color="#1A2637" />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'relative',
              borderRadius: 30,
              paddingHorizontal: 10,
            }}>
            <EvilIcons name="cart" size={24} color="black" />
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
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    padding: 5,
  },
  rightContainerIcons: {
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    padding: 5,
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -8,
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
