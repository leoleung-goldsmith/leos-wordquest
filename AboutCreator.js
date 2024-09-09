import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const AboutCreator = () => {
  const navigation = useNavigation(); 
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Picture */}
      <Image 
        source={require('./creator.png')}
        style={styles.profilePic}
      />

      <View style={styles.card}>
        <Text style={styles.infoTitle}>Student Name:</Text>
        <Text style={styles.infoText}>Leo Leung</Text>

        <Text style={styles.infoTitle}>Student ID:</Text>
        <Text style={styles.infoText}>230500901</Text>

        <Text style={styles.infoTitle}>Course Name:</Text>
        <Text style={styles.infoText}>CM3070 Final Project</Text>
      </View>

      <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("Dashboard")}
        >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
  },
  profilePic: {
    width: 300,
    height: 300,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ff5c5c',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5c5c',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#360007',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},

  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: '#1e000f',
  },
});

export default AboutCreator;
