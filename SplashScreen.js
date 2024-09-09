import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const logo = require('./logoimg.png'); 

const SplashScreen = ({ onAnimationEnd }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationEnd());
  }, [fadeAnim, onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;
