import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const funFacts = [
    "Wordle was created by a software engineer named Josh Wardle and became wildly popular in 2021.",
    "The game Wordle only allows players to play one word per day, which increased its addictive nature.",
    "The first version of Wordle had over 12,000 five-letter words, but only 2,315 of them are in the final version.",
    "Many Wordle clones have appeared, such as Nerdle for math equations and Quordle, which allows players to solve four words simultaneously.",
    "Wordle was bought by The New York Times in 2022 and remains free for users.",
    "Wordle's color-coding system helps you guess letters: green means correct letter and correct position, yellow means correct letter but wrong position, and gray means incorrect letter.",
    "One of the original purposes of Wordle was to share scores without revealing the answer to friends, making it a viral social game.",
    "Word-based games like Wordle are proven to help improve your vocabulary and cognitive abilities.",
    "Wordle’s simplicity is what made it such a viral hit, requiring no app downloads, just a simple web browser.",
    "There’s a hard mode in Wordle where you must use revealed hints in your next guess, making the game more challenging.",
    "The maximum number of possible guesses in Wordle is six, forcing players to strategize their guesses carefully.",
    "Scrabble is one of the oldest word-based games, invented in 1938 by Alfred Butts, and has influenced many other word games.",
    "In Scrabble, the highest possible score from a single word is 1,782 points with 'oxyphenbutazone.'",
    "In Boggle, players must find as many words as possible in a grid, but words must be at least three letters long.",
    "There are over 171,000 words in the English dictionary, but not all of them are allowed in games like Scrabble or Wordle.",
    "Anagram-based games like Wordscapes challenge players to create as many words as possible using a limited set of letters.",
    "The longest word in the English dictionary, 'pneumonoultramicroscopicsilicovolcanoconiosis,' has 45 letters.",
    "Word-building games can help improve memory, cognitive function, and even mental agility.",
    "Quordle, an advanced Wordle variant, requires players to solve four words simultaneously with shared guesses.",
    "Playing word games regularly is known to improve spelling, vocabulary, and overall language skills."
  ];

const FunFactsScreen = () => {
  const [fact, setFact] = useState("Press the button to generate a random fun fact about word games!");
  const navigation = useNavigation();

  const generateRandomFact = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFact(randomFact);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leo's WordQuest Fun Facts</Text>
      
      <View style={styles.card}>
        <Text style={styles.factText}>{fact}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={generateRandomFact}>
        <Text style={styles.buttonText}>Generate Random Fact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5c5c',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    alignItems: 'center',
  },
  factText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff4c4c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default FunFactsScreen;
