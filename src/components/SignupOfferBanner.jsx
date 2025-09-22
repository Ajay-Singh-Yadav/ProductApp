import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const SignupOfferBanner = () => {
  const [showCoupons, setShowCoupons] = useState(false);

  const coupons = [
    {id: '1', code: 'TOYS10', desc: 'Save 10% off'},
    {id: '2', code: 'NEW50', desc: 'Flat 50 SAR off'},
  ];

  const toggleCoupons = () => {
    setShowCoupons(prev => !prev);
  };

  return (
    <View>
      <View style={styles.banner}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Signup and Get</Text>
          <Text style={styles.offer}>
            𐑂 50.00 <Text style={styles.offText}>off</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={toggleCoupons}>
          <Text style={styles.signupText}>
            {showCoupons ? 'Hide Coupons' : 'Signup Now'}
          </Text>
        </TouchableOpacity>
      </View>

      {showCoupons && (
        <FlatList
          data={coupons}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.couponRow}>
              <View style={styles.couponLeft}>
                <Icon
                  name="ticket-percent"
                  size={moderateScale(20)}
                  color="#1e293b"
                />
                <View style={{marginLeft: scale(6)}}>
                  <Text style={styles.couponDesc}>{item.desc}</Text>
                  <Text style={styles.learnMore}>Learn More</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.couponCodeBox}>
                <Text style={styles.couponCode}>{item.code}</Text>
                <Icon
                  name="content-copy"
                  size={moderateScale(16)}
                  color="#1e293b"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b9d9e8',
    padding: moderateScale(12),
    margin: moderateScale(15),
    borderRadius: moderateScale(8),
  },
  textContainer: {flexDirection: 'column'},
  title: {fontSize: moderateScale(14), color: '#000', fontWeight: '500'},
  offer: {fontSize: moderateScale(16), color: '#b45309', fontWeight: 'bold'},
  offText: {fontSize: moderateScale(14), color: '#b45309', fontWeight: '400'},
  signupButton: {
    backgroundColor: '#2f5d3f',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(6),
  },
  signupText: {color: '#fff', fontSize: moderateScale(14), fontWeight: '600'},

  couponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(12),
    marginHorizontal: moderateScale(15),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  couponLeft: {flexDirection: 'row', alignItems: 'center'},
  couponDesc: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1e293b',
  },
  learnMore: {
    fontSize: moderateScale(12),
    color: '#3b82f6',
    marginTop: verticalScale(2),
  },

  couponCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#475569',
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(4),
    marginLeft: scale(5),
    backgroundColor: '#f8fafc',
  },
  couponCode: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#166534',
    marginRight: scale(4),
  },
});

export default SignupOfferBanner;
