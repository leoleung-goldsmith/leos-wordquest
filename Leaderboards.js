import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Leaderboards = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboard = await AsyncStorage.getItem('@leaderboard');
        if (leaderboard) {
          const parsedLeaderboard = JSON.parse(leaderboard);
  
          // Sort by score (highest to lowest)
          parsedLeaderboard.sort((a, b) => b.score - a.score);
          setLeaderboardData(parsedLeaderboard);
        }
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaderboard();
  }, []);
  

  const renderLeaderboardItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.userName}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📈 Leaderboards</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
      ) : leaderboardData.length > 0 ? (
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noScoresText}>No scores available</Text>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Dashboard")} // Ensure correct navigation target
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#ffe0e0',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',  // Centers the list if it's shorter than the screen
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80,
    textAlign: 'center',
    color: '#360007',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#360007',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c62828',
  },
  noScoresText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default Leaderboards;
