import {View, Text} from 'react-native';
import {useState} from 'react';
import axios from 'axios';

const FetchingData = async ({setData, setLoading}) => {
  try {
    setLoading(true);
    const response = await axios.get('https://dummyjson.com/products');
    setData(response.data.products);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export default FetchingData;
