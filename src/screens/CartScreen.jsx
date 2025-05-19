import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartScreen = () => {
  // Safely get cart items and totals from Redux store
  const cart = useSelector(state => state.cart || {items: []});
  const items = cart.items || [];

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateDiscount = subtotal => {
    // Apply a flat 10% discount if subtotal is above 500
    return subtotal > 500 ? subtotal * 0.1 : 0;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount;

  return (
    <View style={{padding: 20, marginBottom: 30}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Cart
      </Text>

      {items.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 30}}
          renderItem={({item}) => (
            <View style={styles.card}>
              {/* Top Row */}

              <View style={styles.topRow}>
                <Image source={{uri: item.thumbnail}} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.title}>title</Text>
                  <Text style={styles.subtitle}>Sub Title</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.rating}>4.5</Text>
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <Text style={styles.reviews}>(1,54,058)</Text>
                    <Ionicons
                      name="shield-checkmark"
                      size={16}
                      color="#1e90ff"
                    />
                  </View>
                </View>
              </View>

              {/* Price Row */}

              <View style={styles.priceSections}>
                <View style={styles.priceRow}>
                  <Text style={styles.discount}>41% off</Text>
                  <Text style={styles.strikePrice}>Rs 33,999</Text>
                  <Text style={styles.finalPrice}>Rs 20,999</Text>
                </View>
                <Text style={styles.offerPrice}>Rs 18, 999</Text>
                <Text style={styles.packingFees}>
                  Rs +69 Secure Packing Fee
                </Text>
                <Text style={styles.coinsPrice}>
                  or Pay Rs 20,999 + 100 SuperCoins
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
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color="#1e90ff"
                  />
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <FontAwesome name="bookmark-o" size={20} color="#1e90ff" />
                  <Text style={styles.actionText}>Save for later</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.buyThisButton]}>
                  <Text style={[styles.actionText, {color: 'white'}]}>
                    Buy this now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <View style={{marginTop: 20}}>
        <Text>Subtotal: ₹{subtotal.toFixed(2)}</Text>
        <Text>Discount: ₹{discount.toFixed(2)}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Total: ₹{total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    // width: '100%',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#777',
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
  },
  strikePrice: {
    fontSize: 12,
    color: '#777',
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  packingFees: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  coinsPrice: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  deliveryText: {
    fontSize: 14,
    marginLeft: 8,
  },
  freeText: {
    fontSize: 14,
    color: '#1e90ff',
    marginLeft: 8,
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
    paddingVertical: 8,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionText: {
    marginLeft: 12,
    marginTop: 4,
  },
  buyThisButton: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
});
