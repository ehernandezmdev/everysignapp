import React from 'react';
import {Login} from './src/views/Login/Login';
import {SignUp} from './src/views/Login/SignUp';
import {RecoverPassword} from './src/views/Login/ResetPassword';
import {CreateNewPassword} from './src/views/Login/CreateNewPassword';
import {UpdatePassConfirmation} from './src/views/Login/UpdatePassConfirmation';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './src/views/Signatures/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <SafeAreaView style={{backgroundColor: '#F2F1F6', flex: 1}}>
    //   {/* <Login /> */}
    //   {/* <SignUp /> */}
    //   {/* <RecoverPassword /> */}
    //   {/* <CreateNewPassword /> */}
    //   {/* <UpdatePassConfirmation /> */}
    // {/* </SafeAreaView> */}
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{title: 'Forgot password'}}
        />
        <Stack.Screen
          name="UpdatePassConfirmation"
          component={UpdatePassConfirmation}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPassword}
          options={{title: 'New password'}}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
