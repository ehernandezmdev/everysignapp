import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {TheButton} from '../TheButton';
import {TheInput} from '../TheInput';
import {TheText} from '../TheText';
import {useNavigation} from '@react-navigation/native';

interface Credentials {
  styles?: Object;
  mainButtonText: string;
  forgotOrLogIn: string;
  signUpButton: boolean;
  navigation: {
    navigate: (arg: string) => {};
    goBack: () => {};
  };
}

export const TheCredentials = ({
  styles,
  mainButtonText,
  forgotOrLogIn,
  signUpButton,
  navigation,
}: Credentials) => {
  const goBack = useNavigation();

  return (
    <View style={[styles, credStyles.container]}>
      <View>
        <TheText text="Email" styles={credStyles.text} />
        <TheInput placeholder="Enter your email address" />
      </View>
      <View style={credStyles.separteButton}>
        <View>
          <TheText text="Password" styles={credStyles.text} />
          <TheInput placeholder="Enter your password" />
        </View>
        <View>
          <TheButton
            title={mainButtonText}
            styles={credStyles.button}
            textColor="white"
          />
          <TheButton title={forgotOrLogIn} styles={credStyles.centerButton} />
          {signUpButton ? (
            <TheButton
              title="Not a member? Sing Up"
              styles={credStyles.centerButton}
              onPress={() => navigation.navigate('SignUp')}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const credStyles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 30,
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
