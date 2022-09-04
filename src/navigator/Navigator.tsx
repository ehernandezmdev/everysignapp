import React, {useContext} from 'react';
import {Login} from '../views/Login/Login';
import {SignUp} from '../views/Login/SignUp';
import {RecoverPassword} from '../views/Login/ResetPassword';
import {CreateNewPassword} from '../views/Login/CreateNewPassword';
import {UpdatePassConfirmation} from '../views/Login/UpdatePassConfirmation';
import {Home} from '../views/Signatures/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/authContext';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{headerShown: false}}>
      {status === 'authenticated' ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};
