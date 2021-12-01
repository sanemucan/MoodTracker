import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { AppProvider } from './App.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import SplashScreen from 'react-native-splash-screen';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide()
    
  }, [])
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator/>
      </NavigationContainer>
    </AppProvider>
  )
};
