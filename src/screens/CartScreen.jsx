import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {clearCart, removeCart} from '../redux/slices/cartSlice ';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopBarComp from '../components/TopBarComp';
import {addCart} from '../redux/slices/cartSlice ';

const CartScreen = () => {
  // Safely get cart items and totals from Redux store
  const cart = useSelector(state => state.cart || {items: []});
  const items = cart.items || [];

  const dispatch = useDispatch();

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateDiscount = subtotal => {
    // Apply a flat 10% discount if subtotal is above 500
    return subtotal > 10 ? subtotal * 0.1 : 0;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount;

  const getProductPrice = price => {
    const discount = price - (price * 20) / 100;
    return discount.toFixed(2);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopBarComp />

      {items.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <View style={{marginBottom: 250}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'TenorSans-Regular',
              margin: 15,
              fontWeight: 'bold',
            }}>
            Added in Cart
          </Text>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 30, marginTop: 10}}
            renderItem={({item}) => (
              <View style={styles.card}>
                {/* Top Row */}

                <View style={styles.topRow}>
                  <Image source={{uri: item.thumbnail}} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={styles.title}>${item.title}</Text>
                    <Text style={styles.subtitle}>Brand:{item.brand}</Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.rating}>{item.rating}</Text>
                      <AntDesign name="star" size={15} color="#FFD700" />
                      <AntDesign name="star" size={16} color="#FFD700" />
                      <AntDesign name="star" size={17} color="#FFD700" />
                      <AntDesign name="star" size={18} color="#FFD700" />
                      <AntDesign name="star" size={19} color="#FFD700" />

                      <Ionicons
                        name="shield-checkmark"
                        size={18}
                        color="#1e90ff"
                        style={{marginLeft: 15}}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text style={styles.quantity}>Quantity:</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(removeCart(item))}>
                        <AntDesign
                          name="minuscircleo"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(addCart(item))}>
                        <AntDesign name="pluscircleo" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Price Row */}

                <View style={styles.priceSections}>
                  <View style={styles.priceRow}>
                    <Text style={styles.discount}>20% off</Text>
                    <Text style={styles.strikePrice}>${item.price}</Text>
                    <Text style={styles.finalPrice}>
                      {' '}
                      ${getProductPrice(item.price)}
                    </Text>
                  </View>

                  <Text style={styles.packingFees}>
                    $ +2 Secure Packing Fee
                  </Text>
                  <Text style={styles.coinsPrice}>
                    or Pay ${getProductPrice(item.price)} + 100 SuperCoins with
                    much more offers
                  </Text>
                </View>

                {/* Delivery  info */}

                <View style={styles.deliveryRow}>
                  <Ionicons name="location-sharp" size={16} color="#1e90ff" />
                  <Text style={styles.deliveryText}>
                    EXPRESS Delivery in 2 days
                  </Text>
                  <Text style={styles.freeText}>Free</Text>
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeCart(item.id))}
                    style={[styles.actionButton, {paddingVertical: 8}]}>
                    <MaterialIcons
                      name="delete-outline"
                      size={20}
                      color="#1e90ff"
                    />
                    <Text style={styles.actionText}>Remove</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, {paddingVertical: 8}]}>
                    <FontAwesome name="bookmark-o" size={20} color="#1e90ff" />
                    <Text style={styles.actionText}>Save for later</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.buyThisButton,
                      {paddingVertical: 8},
                    ]}>
                    <Text style={[styles.actionText, {color: 'white'}]}>
                      Buy this now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
      <View style={styles.bottomBar}>
        <View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>₹{discount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, {fontWeight: 'bold'}]}>
              Total:
            </Text>
            <Text style={[styles.totalValue, {fontWeight: 'bold'}]}>
              ₹{total.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginRight: 20,
            flexDirection: 'row',
            height: 50,
            marginTop: 15,
          }}>
          <TouchableOpacity style={[styles.actionButton, {paddingVertical: 0}]}>
            <Text style={[styles.actionText]}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(clearCart(items))}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    margin: 8,
    shadowColor: '#000',
  },
  topRow: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'TenorSans-Regular',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
    fontFamily: 'TenorSans-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'TenorSans-Regular',
    marginRight: 10,
  },
  reviews: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
    marginLeft: 10,
    fontFamily: 'TenorSans-Regular',
  },
  image: {
    width: 150,
    height: 150,
  },
  priceSections: {
    marginTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'green',
    fontFamily: 'TenorSans-Regular',
  },
  strikePrice: {
    fontSize: 12,
    color: '#777',
    textDecorationLine: 'line-through',
    marginRight: 5,
    fontFamily: 'TenorSans-Regular',
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'TenorSans-Regular',
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'TenorSans-Regular',
  },
  packingFees: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontFamily: 'TenorSans-Regular',
  },
  coinsPrice: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontFamily: 'TenorSans-Regular',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  deliveryText: {
    fontSize: 14,
    fontFamily: 'TenorSans-Regular',
    marginLeft: 8,
  },
  freeText: {
    fontSize: 14,
    color: '#1e90ff',
    marginLeft: 8,
    fontFamily: 'TenorSans-Regular',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionText: {
    fontFamily: 'TenorSans-Regular',
    marginLeft: 12,
    marginTop: 4,
  },
  buyThisButton: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
    fontFamily: 'TenorSans-Regular',
  },
  quantity: {
    fontFamily: 'TenorSans-Regular',
    marginRight: 10,
  },
  quantityButton: {
    borderColor: '#1e90ff',
    fontFamily: 'TenorSans-Regular',
    marginHorizontal: 20,
  },
  quantityButtonText: {
    fontFamily: 'TenorSans-Regular',
    fontSize: 40,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 15,
    borderWidth: 2,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#1e90ff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    marginHorizontal: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'TenorSans-Regular',
    color: '#555',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'TenorSans-Regular',
    color: '#000',
    marginLeft: 60,
  },
});
