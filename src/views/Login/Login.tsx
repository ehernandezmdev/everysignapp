import {TheButton} from '../../components/TheButton';
import {TheInput} from '../../components/TheInput';
import React from 'react';
import {View, StyleSheet, Platform, ScrollView} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {useState, useContext} from 'react';
import {LogInRequest} from './Service/LoginService';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TheLoading} from '../../components/TheLoading';

export const Login = ({navigation, route}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genericError, setGenericError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {signIn} = useContext(AuthContext);

  const formErrors: any = {
    emailError,
    passwordError,
  };

  const checkErrors = () => {
    for (const key in formErrors) {
      if (formErrors[key]) {
        return false;
      }
    }

    makeRequest();
  };

  const makeRequest = async () => {
    setLoading(true);
    try {
      if (email && password) {
        setGenericError(false);
        const response: any = await LogInRequest({email, password});
        if (response.data.valid) {
          await AsyncStorage.setItem('userData', response.data.user);
          signIn(response.data.user);
        } else {
          setGenericError(true);
        }
      } else {
        if (!email) {
          setEmailError(true);
        }
        if (!password) {
          setPasswordError(true);
        }
      }
    } catch (e) {
      setGenericError(true);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? <TheLoading /> : null}
      <TheLoginHeader title="Welcome Back!" />
      <View style={[styles.credentials, {width: '100%', margin: 30}]}>
        <View>
          <TheText text="Email" styles={styles.text} />
          <TheInput
            placeholder="Enter your email address"
            value={email}
            autoCapitalize="none"
            onChangeText={(email: string) => {
              setEmail(email);
              if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              ) {
                setEmailError(true);
              } else {
                setEmailError(false);
              }
            }}
            autoCorrect={false}
          />
          {emailError ? (
            <TheText
              text="Please, enter a valid email"
              styles={{color: 'red', alignSelf: 'center'}}
            />
          ) : null}
        </View>
        <View style={styles.separteButton}>
          <View>
            <TheText text="Password" styles={styles.text} />
            <TheInput
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={(password: string) => {
                setPassword(password);
                password ? setPasswordError(false) : setPasswordError(true);
              }}
            />
            {passwordError ? (
              <TheText
                text="Please, enter a password"
                styles={{color: 'red', alignSelf: 'center'}}
              />
            ) : null}

            {genericError ? (
              <TheText
                text="There was an error, please try again"
                styles={{color: 'red', alignSelf: 'center'}}
              />
            ) : null}
          </View>
          <View>
            <TheButton
              title="Log in"
              styles={styles.button}
              textColor="white"
              onPress={() => checkErrors()}
            />
            <TheButton
              title="Forgot password"
              styles={styles.centerButton}
              onPress={() => navigation.navigate('RecoverPassword')}
            />
            <TheButton
              title="Not a member? Sing Up"
              styles={styles.centerButton}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262B40',
  },
  credentials: {
    height: '50%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#262B40',
  },
  button: {
    alignSelf: 'center',
    shadowColor: '#262B40',
    backgroundColor: '#262B40',
  },
  separteButton: {
    flex: 1,
    ...Platform.select({
      ios: {
        justifyContent: 'space-evenly',
      },
      android: {
        justifyContent: 'space-between',
      },
    }),
  },
  centerButton: {
    alignSelf: 'center',
  },
});
