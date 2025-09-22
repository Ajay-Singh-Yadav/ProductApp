import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import TopBarComp from '../components/TopBarComp';
import {addCart} from '../redux/slices/cartSlice ';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import SignupOfferBanner from '../components/SignupOfferBanner';
import ExploreMoreCard from '../components/ExploreMoreCard';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';

import {PRODUCTS} from '../data/Product';

const {width} = Dimensions.get('window');

const ProductScreen = () => {
  const product = PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const {items} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const images = product.images.map((img, index) => ({
    id: String(index),
    src: img,
  }));

  const handleAddToCart = () => {
    dispatch(addCart(product));
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.title} has been added.`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TopBarComp />

      <ScrollView>
        <TouchableOpacity style={styles.locationContainer}>
          <Entypo name="location-pin" size={scale(20)} color="black" />
          <Text style={styles.locationText}>
            Delivery to <Text style={{fontWeight: '600'}}>Jeddah</Text>
          </Text>
          <Entypo name="chevron-small-down" size={scale(20)} color="black" />
        </TouchableOpacity>

        <View style={styles.backResult}>
          <TouchableOpacity style={styles.backRow}>
            <Entypo name="chevron-left" size={18} color="#2E7D32" />
            <Text style={styles.backText}>Back to Results</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.breadcrumbRow}>
            <Entypo name="home" size={16} color="#666" />
            <Text style={styles.breadcrumbText}>
              {' '}
              / Girls / Soft Toys / Page
            </Text>
          </View>
        </View>

        <View style={styles.newRow}>
          <View style={styles.newContainer}>
            <Text style={{fontSize: moderateScale(12)}}>New</Text>
          </View>
          <Image
            source={require('../assets/images/Badge.png')}
            style={styles.badge}
          />
        </View>

        <View style={styles.imageCarousel}>
          {selectedImage > 0 && (
            <TouchableOpacity
              style={[styles.arrowBtn, {left: scale(10)}]}
              onPress={() => setSelectedImage(prev => Math.max(0, prev - 1))}>
              <Entypo name="chevron-left" size={scale(28)} color="#333" />
            </TouchableOpacity>
          )}

          <Image
            source={images[selectedImage].src}
            style={styles.productImage}
          />

          {selectedImage < images.length - 1 && (
            <TouchableOpacity
              style={[styles.arrowBtn, {right: scale(10)}]}
              onPress={() =>
                setSelectedImage(prev => Math.min(images.length - 1, prev + 1))
              }>
              <Entypo name="chevron-right" size={scale(28)} color="#333" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.productImageListContainer}>
          <FlatList
            data={images}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => setSelectedImage(index)}>
                <Image
                  source={item.src}
                  style={[
                    styles.productImageList,
                    selectedImage === index && styles.imageSelected,
                  ]}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.stockContainer}>
          <Text style={styles.stockTitle}>ONLY 7 Left!</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.bestDealRow}>
            <Text style={styles.bestDealText}>Best Deal</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.price.toFixed(2)} SAR</Text>
            <Text style={styles.oldPrice}>
              {product.oldPrice.toFixed(2)} SAR
            </Text>
            <Text style={styles.discount}>{product.discount}</Text>
          </View>
        </View>

        <ExploreMoreCard
          linkText="Dolls & Collectables"
          onPress={() => console.log('Navigate to Dolls & Collectables')}
        />

        <Text style={styles.sectionTitle}>
          Size: {selectedSize ? `${selectedSize}-inch` : ''}
        </Text>
        <View style={styles.sizeRow}>
          {product.sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.sizeSelected,
              ]}
              onPress={() => setSelectedSize(size)}>
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected,
                ]}>
                {size}"
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SignupOfferBanner />

        <View style={styles.cartRow}>
          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.qtyBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  locationContainer: {
    flexDirection: 'row',
    marginLeft: scale(10),
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  locationText: {fontSize: moderateScale(14)},

  backResult: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backRow: {flexDirection: 'row', alignItems: 'center'},
  backText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  breadcrumbRow: {flexDirection: 'row', alignItems: 'center'},
  breadcrumbText: {color: '#555', fontSize: 13},

  newRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
  },
  newContainer: {
    width: scale(60),
    height: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5DB3D',
    borderRadius: moderateScale(30),
    marginRight: scale(10),
  },
  badge: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(10),
  },

  imageCarousel: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: width,
    height: verticalScale(250),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  arrowBtn: {
    position: 'absolute',
    top: '45%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: moderateScale(20),
    padding: scale(5),
    zIndex: 2,
  },

  productImageListContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  productImageList: {
    width: scale(70),
    height: scale(70),
    marginRight: scale(10),
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
  },
  imageSelected: {borderColor: 'green', borderWidth: 2},

  stockContainer: {
    width: scale(100),
    height: verticalScale(30),
    justifyContent: 'center',
    marginTop: verticalScale(10),
    borderTopRightRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    backgroundColor: '#EDA818',
  },
  stockTitle: {
    color: '#fff',
    marginLeft: scale(10),
    fontSize: moderateScale(14),
  },

  infoBox: {padding: scale(15)},
  brand: {fontSize: moderateScale(14), color: 'green'},
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginVertical: verticalScale(5),
  },
  priceRow: {flexDirection: 'row', alignItems: 'center'},
  price: {fontSize: moderateScale(18), fontWeight: 'bold', color: '#333'},
  oldPrice: {
    fontSize: moderateScale(14),
    color: 'gray',
    marginLeft: scale(10),
    textDecorationLine: 'line-through',
  },
  bestDealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEABE',
    borderRadius: moderateScale(10),
    padding: scale(8),
    marginTop: verticalScale(5),
    width: '100%',
    marginBottom: verticalScale(15),
  },
  bestDealText: {
    fontSize: moderateScale(14),
    color: '#795509',
    marginLeft: scale(10),
  },
  discount: {
    fontSize: moderateScale(14),
    color: 'orange',
    marginLeft: scale(10),
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginHorizontal: scale(15),
  },
  sizeRow: {flexDirection: 'row', margin: scale(15)},
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    padding: scale(10),
    marginRight: scale(10),
  },
  sizeSelected: {borderColor: '#DC72A8'},
  sizeText: {fontSize: moderateScale(14), color: '#333'},
  sizeTextSelected: {fontWeight: 'bold'},

  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: scale(15),
    justifyContent: 'space-between',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
  },
  qtyBtn: {
    fontSize: moderateScale(18),
    paddingHorizontal: scale(10),
    color: '#333',
  },
  qtyText: {fontSize: moderateScale(16), marginHorizontal: scale(5)},
  cartButton: {
    backgroundColor: 'green',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
  },
  cartText: {color: '#fff', fontSize: moderateScale(16), fontWeight: '600'},
});

export default ProductScreen;
