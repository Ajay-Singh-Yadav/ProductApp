import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {fetchPosts, resetPosts} from '../redux/slices/postsSlice';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {addCart} from '../redux/slices/cartSlice ';
import Toast from 'react-native-toast-message';

const ProductListScreen = () => {
  const navigation = useNavigation();

  const {items, loading, error, skip, hasMore} = useSelector(
    state => state.posts,
  );
  const dispatch = useDispatch();

  const [searchedText, setSearchedText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sectionData, setSectionData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchPosts(0));
  }, [dispatch]);

  const groupByCategory = items => {
    const grouped = {};

    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return Object.keys(grouped).map(category => ({
      title: category,
      data: grouped[category],
    }));
  };

  const categories = [...new Set(items.map(item => item.category))];

  useEffect(() => {
    let filtered = items;
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchedText.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchedText.toLowerCase()),
      );
    }
    setSectionData(groupByCategory(filtered));
  }, [searchedText, items, selectedCategory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(resetPosts());
    const randomSkip = Math.floor(Math.random() * 60);
    await dispatch(fetchPosts(randomSkip));
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPosts(skip));
    }
  };

  const getProductPrice = price => {
    const discount = price - (price * 20) / 100;
    return discount.toFixed(2);
  };

  return (
    <View
      style={{
        height: 1000,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 0,
      }}>
      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search products..."
          value={searchedText}
          onChangeText={setSearchedText}
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 10}}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            title={category}
            color={selectedCategory === category ? 'blue' : 'grey'}
            onPress={() =>
              setSelectedCategory(prev => (prev === category ? null : category))
            }>
            <View
              style={{
                margin: 10,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: selectedCategory === category ? 'blue' : 'grey',
                backgroundColor:
                  selectedCategory === category ? '#cce5ff' : '#fff',
                paddingHorizontal: 12,
                paddingVertical: 3,
              }}>
              <Text style={{fontFamily: 'TenorSans-Regular'}}>{category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item.id.toString() + index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={{uri: item.thumbnail}} style={styles.image} />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                marginStart: 50,
              }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: 140,
                    height: 30,
                    borderRadius: 15,
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <AntDesign name="star" size={20} color="#FFD700" />
                  <AntDesign name="star" size={20} color="#FFD700" />
                  <AntDesign name="star" size={20} color="#FFD700" />
                  <AntDesign name="star" size={20} color="#FFD700" />
                  <Text style={{fontSize: 15, marginLeft: 8}}>
                    {item.rating}
                  </Text>
                </View>
              </View>

              {/* Price */}
              <View
                style={{
                  width: 140,
                  height: 30,
                  borderRadius: 15,
                  marginTop: 8,
                  flexDirection: 'row',
                  //  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 40,
                }}>
                <Text style={{color: 'green', marginRight: 5}}>
                  <AntDesign name="arrowdown" size={20} />
                  20% off
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginRight: 8,
                    textDecorationLine: 'line-through',
                    textAlign: 'center',
                  }}>
                  ${item.price}
                </Text>
                <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                  ${getProductPrice(item.price)}
                </Text>
              </View>

              {/* Delivery */}
              <View
                style={{
                  width: 200,
                  height: 40,
                  borderRadius: 15,
                  marginTop: 8,
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/images/d.png')}
                  style={{width: 40, height: 30, marginRight: 10}}
                />
                <Text style={{fontSize: 14, fontFamily: 'TenorSans-Regular'}}>
                  EXPRESS 2 day delivery
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 16,
                  marginTop: 3,
                  opacity: 0.5,
                  fontFamily: 'TenorSans-Regular',
                }}>
                {item.warrantyInformation}
              </Text>

              {/* Button buy and add to cart */}
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonCard}>
                  <Text style={{fontSize: 13, fontFamily: 'TenorSans-Regular'}}>
                    Buy
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    dispatch(addCart(item));
                    Toast.show({
                      type: 'success',
                      text1: 'Added to Cart',
                      text2: `${item.title} was added successfully 👌`,
                    });
                  }}
                  style={[styles.buttonCard, {width: 120}]}>
                  <Text style={{fontSize: 13, fontFamily: 'TenorSans-Regular'}}>
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{paddingBottom: 100}}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 2,
  },
  title: {
    fontFamily: 'TenorSans-Regular',
    fontWeight: 500,
    width: 180,
    fontSize: 17,
  },
  image: {
    width: 160,
    height: 170,
    resizeMode: 'cover',
    marginTop: 8,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  searchView: {
    margin: 10,
    height: 50,
    width: '95%',
    paddingStart: 20,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'TenorSans-Regular',
    color: '#333',
  },
  buttonCard: {
    height: 40,
    width: 100,
    // borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    backgroundColor: '#cce5ff',
    marginRight: 30,
  },
});
