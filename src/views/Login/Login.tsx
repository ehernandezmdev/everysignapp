import {TheButton} from '../../components/TheButton';
import {TheInput} from '../../components/TheInput';
import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {useState} from 'react';
import {LogInRequest} from './Service/LoginService';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEror, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formErrors: any = {
    emailEror,
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
    const response: any = await LogInRequest({email, password});
    console.log(response);
    response.valid ? navigation.navigate('Home') : null;
    if (!response?.error) {
      response.data.valid ? navigation.navigate('Home') : null;
    } else {
      setEmailError(true);
    }
  };

  return (
    <View style={styles.container}>
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
          />
          {emailEror ? (
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
    </View>
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
