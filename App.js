// App.js
import 'react-native-get-random-values';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../MoonAir/src/screens/CustomDrawer';

import OnboardingScreen from '../MoonAir/src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerificationCodeScreen from './src/screens/VerificationCodeScreen';
import SearchLocationScreen from './src/screens/SearchLocationScreen';
import BookingDetail from './src/screens/BookingDetail';
import DriverInfo from './src/screens/DriverInfo';
import TripFeedback from './src/screens/TripFeedback';
import Payment from './src/screens/Payment';
import TransactionHistory from './src/screens/TransactionHistory';
import TripHistory from './src/screens/TripHistory';
import DriverDetails from './src/screens/DriverDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="SearchLocationScreen" component={SearchLocationScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetail} />
      <Stack.Screen name="DriverInfo" component={DriverInfo} />
      <Stack.Screen name="TripFeedback" component={TripFeedback} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#000',
          width: '80%',
        },
      }}>
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingScreen"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          {/* Remove this line - don't register SearchLocationScreen directly here */}
          {/* <Stack.Screen name= "SearchLocationScreen" component = {SearchLocationScreen}/> */}
          <Stack.Screen
            name="VerificationCodeScreen"
            component={VerificationCodeScreen}
          />
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
          <Stack.Screen name="TripHistory" component={TripHistory} />
          <Stack.Screen name="DriverDetails" component= {DriverDetails}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;