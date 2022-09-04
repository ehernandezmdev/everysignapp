import React, {createContext, useReducer} from 'react';
import {authReducer, AuthState} from './authReducer';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

export type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: (token: string) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: '',
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userData');
    console.log(token);
    if (!token) return dispatch({type: 'notAuthenticated'});

    dispatch({
      type: 'signIn',
      payload: {
        token,
      },
    });
  };

  const signIn = (token: string) => {
    dispatch({type: 'signIn', payload: {token}});
  };
  const signUp = () => {};
  const logOut = () => {
    dispatch({type: 'logOut'});
  };
  const removeError = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
