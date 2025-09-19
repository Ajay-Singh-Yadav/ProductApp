import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather for compass icon

const ExploreMoreCard = ({label, linkText, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="compass" size={18} color="#4a7c59" style={styles.icon} />
      <Text style={styles.text}>
        <Text style={styles.bold}>Explore more in </Text>
        <Text style={styles.link}>{linkText}</Text>
      </Text>
      <Icon
        name="chevron-right"
        size={18}
        color="#4a7c59"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: '600',
  },
  link: {
    color: '#2e6b4e',
    fontWeight: '500',
  },
  arrow: {
    marginLeft: 5,
  },
});

export default ExploreMoreCard;
