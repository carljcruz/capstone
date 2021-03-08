import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FindADoctorScreen from './src/MainScreens/PatientScreens/FindADoctorScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={FindADoctorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
