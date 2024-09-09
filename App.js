import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import EnterNameAgeScreen from './EnterNameAgeScreen';
import Dashboard from './Dashboard';
import GameScreen from './Game';
import SettingsScreen from './Settings';
import FunFactsScreen from './FunFactsScreen';
import Leaderboards from './Leaderboards';
import AboutCreator from './AboutCreator';
import UserProvider from './UserContext';

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleAnimationEnd = () => {
    setIsSplashVisible(false);
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isSplashVisible ? (
            <Stack.Screen name="Splash">
              {(props) => <SplashScreen {...props} onAnimationEnd={handleAnimationEnd} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="EnterNameAge" component={EnterNameAgeScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="GameScreen" component={GameScreen} />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
              <Stack.Screen name="FunFactsScreen" component={FunFactsScreen} />
              <Stack.Screen name="Leaderboards" component={Leaderboards} />
              <Stack.Screen name="AboutCreator" component={AboutCreator} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
