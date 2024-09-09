import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  Modal,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { UserContext } from './UserContext'; 

const { width } = Dimensions.get("window");
const isSmallDevice = width < 360;
const gridSquareSize = width * 0.15;

const Block = ({ index, guess, word, guessed }) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles = [styles.guessSquare];
  const textStyles = [styles.guessLetter];

  if (letter === wordLetter && guessed) {
    blockStyles.push(styles.guessCorrect);
    textStyles.push(styles.guessedLetter);
  } else if (word.includes(letter) && guessed) {
    blockStyles.push(styles.guessInWord);
    textStyles.push(styles.guessedLetter);
  } else if (guessed) {
    blockStyles.push(styles.guessNotInWord);
    textStyles.push(styles.guessedLetter);
  }

  return (
    <View style={blockStyles}>
      <Text style={textStyles}>{letter}</Text>
    </View>
  );
};

const GuessRow = ({ guess, word, guessed }) => {
  return (
    <View style={styles.guessRow}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Block key={index} index={index} guess={guess} word={word} guessed={guessed} />
      ))}
    </View>
  );
};

const KeyboardRow = ({ letters, onKeyPress }) => (
  <View style={styles.keyboardRow}>
    {letters.map((letter) => (
      <TouchableOpacity onPress={() => onKeyPress(letter)} key={letter} style={styles.keyWrapper}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"];

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress("ENTER")} style={styles.keyWrapper}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const words = [
  "LIGHT",
  "TIGHT",
  "GOING",
  "WRUNG",
  "COULD",
  "PERKY",
  "MOUNT",
  "WHACK",
  "SUGAR",
];

const defaultGuess = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
};

export default function GameScreen() {
  const { userName } = useContext(UserContext); 
  const [activeWord, setActiveWord] = useState(words[0]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState(defaultGuess);
  const [gameComplete, setGameComplete] = useState(false);
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ visible: false, message: "" });
  const navigation = useNavigation();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to store data:", e);
    }
  };
  
  const getLeaderboardData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Failed to retrieve leaderboard data:", e);
      return [];
    }
  };
  
  // Function to update leaderboard
  const updateLeaderboard = async (userName, score) => {
    const leaderboardKey = '@leaderboard';
    const existingLeaderboard = await getLeaderboardData(leaderboardKey);
  
    // Create a new entry for the current game
    const newEntry = { userName, score };
  
    // Add the new entry to the existing leaderboard
    const updatedLeaderboard = [...existingLeaderboard, newEntry];
  
    // Store the updated leaderboard
    storeData(leaderboardKey, updatedLeaderboard);
  };
  
  const handleKeyPress = async (letter) => {
    const guess = guesses[guessIndex];
  
    if (letter === "ENTER") {
      if (guess.length !== 5) {
        setErrorModal({ visible: true, message: "Word too short." });
        return;
      }
  
      if (!words.includes(guess)) {
        setErrorModal({ visible: true, message: "Not a valid word." });
        return;
      }
  
      if (guess === activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        const newScore = score + (6 - tries);
        setScore(newScore);
  
        // Update the leaderboard
        await updateLeaderboard(userName, newScore);
  
        setShowModal(true);
        return;
      }
  
      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
        setTries(tries + 1);
      } else {
        setGameComplete(true);
        setShowModal(true);
        return;
      }
    }
  
    if (letter === "⌫") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) });
      return;
    }
  
    if (guess.length >= 5) {
      return;
    }
  
    setGuesses({ ...guesses, [guessIndex]: guess + letter });
  };
  
  useEffect(() => {
    if (!gameComplete) {
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      setGuesses(defaultGuess);
      setGuessIndex(0);
      setTries(0);
    }
  }, [gameComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <GuessRow
            key={index}
            guess={guesses[index]}
            word={activeWord}
            guessed={guessIndex > index}
          />
        ))}
      </View>
      <View style={styles.scoreWrapper}>
        <Text style={styles.scoreText}>Tries: {tries}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <Keyboard onKeyPress={handleKeyPress} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Correct Word:</Text> {activeWord}
            </Text>
            <Button
              title="Reset"
              onPress={() => {
                setGameComplete(false);
                setShowModal(false);
              }}
            />
            <Button
              title="Go to Leaderboard"
              onPress={() => navigation.navigate("Leaderboards")}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModal.visible}
        onRequestClose={() => setErrorModal({ visible: false, message: "" })}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorModal.message}</Text>
            <Button
              title="OK"
              onPress={() => setErrorModal({ visible: false, message: "" })}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    guessRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 6,
    },
    guessSquare: {
      borderColor: "#d3d6da",
      borderWidth: 2,
      width: gridSquareSize,
      height: gridSquareSize,
      alignItems: "center",
      justifyContent: "center",
      margin: 2,
      borderRadius: 18,
      backgroundColor: "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 20,
    },
    guessLetter: {
      fontSize: isSmallDevice ? 24 : 28,
      fontWeight: "bold",
      color: "#333",
      textTransform: "uppercase",
    },
    guessedLetter: {
      color: "#ffffff",
    },
    guessCorrect: {
      backgroundColor: "#c62828",  
      borderColor: "#c62828",
    },
    guessInWord: {
      backgroundColor: "#f57f17",  
      borderColor: "#f57f17",
    },
    guessNotInWord: {
      backgroundColor: "#616161", 
      borderColor: "#616161",
    },
    container: {
      justifyContent: "space-between",
      flex: 1,
      backgroundColor: "#ffe0e0",  
      paddingVertical: 30,
      paddingHorizontal: isSmallDevice ? 10 : 20,
      marginTop: 40,
    },
    keyboard: {
      flexDirection: "column",
      backgroundColor: "#e57373", 
      paddingVertical: 1,
      borderRadius: 12,
      marginHorizontal: 1,
      paddingBottom: 2,
    },
    keyboardRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 2,
    },
    keyWrapper: {
      flex: 1, 
      alignItems: "center", 
      marginBottom: 12
    },
    key: {
      backgroundColor: "#b71c1c",  
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 4,
      minWidth: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    keyLetter: {
      fontWeight: "600",
      fontSize: 18,
      color: "#ffffff",
      textTransform: "uppercase",
    },
    modalWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333",
    },
    scoreWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      alignItems: "center",
      marginVertical: 5,
    },
    scoreText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    bold: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#c62828",
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
  