import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from './UserContext'; 

const logo = require('./logoimg.png'); 

const Dashboard = ({ navigation }) => {
  const { userName } = useContext(UserContext); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image 
        source={logo}
        style={styles.profilePic}
      />
      {/* Title */}
      <Text style={styles.title}>Leo's WordQuest</Text>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>👋 Welcome {userName}</Text>

      {/* Buttons */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('GameScreen')}
      >
        <Text style={styles.buttonText}>Play the Game</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboards')}
      >
        <Text style={styles.buttonText}>High Score Leaderboard</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('FunFactsScreen')}
      >
        <Text style={styles.buttonText}>Fun Facts Generator</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AboutCreator')}
      >
        <Text style={styles.buttonText}>About the Creator</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('SettingsScreen')}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    paddingVertical: 40,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff5c5c',
    marginBottom: 10, 
  },
  welcomeText: {
    fontSize: 22,
    color: '#ff5c5c',
    marginBottom: 30,
  },
  button: {
    width: '90%',
    backgroundColor: '#ff4c4c',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
