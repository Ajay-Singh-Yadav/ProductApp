import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts, resetProducts} from '../redux/slices/productSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {items, loading, skip, hasMore} = useSelector(state => state.products);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    const randomSkip = Math.floor(Math.random() * 160);
    dispatch(resetProducts());
    await dispatch(fetchProducts(randomSkip));
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(skip));
    }
  };

  // Group products by category
  const groupByCategory = products => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    return Object.keys(grouped).map(category => ({
      title: category,
      data: grouped[category],
    }));
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
  );

  return (
    <SectionList
      sections={groupByCategory(items)}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        !loading && items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        ) : null
      }
      contentContainerStyle={styles.container}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: 'green',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});
