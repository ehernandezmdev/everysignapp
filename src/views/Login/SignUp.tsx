import React, {useEffect} from 'react';
import {View, StyleSheet, Platform, ScrollView} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {TheInput} from '../../components/TheInput';
import {TheButton} from '../../components/TheButton';
import {useForm} from '../../hooks/useForm';
import {SignUpRequest} from './Service/SignUpService';
import {useState} from 'react';
import {TheLoading} from '../../components/TheLoading';
import {TheModal} from '../../components/Modal/TheModal';
import {SafeAreaView} from 'react-native-safe-area-context';

export const SignUp = ({navigation}: any) => {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const {onChange, first_name, last_name, email, password1, password2} =
    useForm({
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
    });

  // Banderas de error que activan mensajes de erorr para cada campo
  const [fnError, setFNError] = useState(false);
  const [lnError, setLNError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ps1Error, setPS1Error] = useState(false);
  const [ps2Error, setPS2Error] = useState(false);

  //Mensaje de errores especiales que contemplan la respuesta
  const [emailErrorText, setEmailErrorText] = useState('');
  const [ps1ErrorText, setPS1ErrorText] = useState('');
  const [ps2ErrorText, setPS2ErrorText] = useState('');

  const errorPassEmail: any = {
    email: setEmailErrorText,
    password2: setPS2ErrorText,
    password1: setPS1ErrorText,
  };

  const errorFunct: any = {
    first_name: [fnError, setFNError],
    last_name: [lnError, setLNError],
    email: [emailError, setEmailError],
    password1: [ps1Error, setPS1Error],
    password2: [ps2Error, setPS2Error],
  };

  const validateForm = () => {
    const checkFields: any = {
      first_name,
      last_name,
      email,
      password1,
      password2,
    };
    for (const field in checkFields) {
      if (!checkFields[field]) {
        errorFunct[field][1](true);
        field in errorPassEmail
          ? errorPassEmail[field](`Please enter your ${field}`)
          : null;
      }
    }
    for (const key in errorFunct) {
      if (errorFunct[key][0]) {
        return false;
      }
    }
    return true;
  };

  const sendRequest = async () => {
    const isValid = validateForm();
    if (isValid && first_name && last_name && email && password1 && password2) {
      setLoadingRequest(true);
      const resp = await SignUpRequest({
        first_name,
        last_name,
        email,
        password1,
        password2,
      });
      if (resp?.valid) {
        setModalActive(true);
      } else {
        const errores: any = resp?.errores;
        for (const key in errores) {
          if (key in errorFunct) {
            errorFunct[key][1](true);
            errorPassEmail[key](errores[key]);
          }
        }
      }
      setLoadingRequest(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {loadingRequest ? <TheLoading /> : null}
          {modalActive ? (
            <TheModal
              title="Success!"
              message="Registered user successfully"
              onPress={() => {
                setModalActive(false);
                navigation.navigate('LogIn');
              }}
            />
          ) : null}
          <TheLoginHeader title="Join the EverySign Family!" />
          <View style={{width: '100%', paddingVertical: 15}}>
            <View>
              <View>
                <TheText text="First name" styles={styles.text} />
                <TheInput
                  placeholder="Enter your first name"
                  value={first_name}
                  onChangeText={(firstName: string) => {
                    firstName ? setFNError(false) : setFNError(true);
                    onChange(firstName, 'first_name');
                  }}
                />
                {fnError ? (
                  <TheText
                    text="Please enter your first name"
                    styles={styles.errorText}
                  />
                ) : null}
              </View>
            </View>
            <View>
              <View>
                <TheText text="Last name" styles={styles.text} />
                <TheInput
                  placeholder="Enter your last name"
                  value={last_name}
                  onChangeText={(lastName: string) => {
                    onChange(lastName, 'last_name');
                    lastName ? setLNError(false) : setLNError(true);
                  }}
                />
                {lnError ? (
                  <TheText
                    text="Please enter your last name"
                    styles={styles.errorText}
                  />
                ) : null}
              </View>
            </View>
            <View>
              <View>
                <TheText text="Email" styles={styles.text} />
                <TheInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(email: string) => {
                    onChange(email, 'email');
                    if (email) {
                      setEmailError(false);
                    } else {
                      setEmailError(true);
                      setEmailErrorText('Please enter your email');
                    }
                    if (
                      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        email,
                      )
                    ) {
                      setEmailError(true);
                      setEmailErrorText('Please enter a valid email');
                    }
                  }}
                  autoCapitalize="none"
                />
                {emailError ? (
                  <TheText text={emailErrorText} styles={styles.errorText} />
                ) : null}
              </View>
            </View>
            <View>
              <View>
                <TheText text="Password" styles={styles.text} />
                <TheInput
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  value={password1}
                  onChangeText={(password: string) => {
                    onChange(password, 'password1');
                    if (!password) {
                      setPS1Error(true);
                      setPS1ErrorText('Please enter your password');
                    } else if (password !== password2) {
                      setPS1Error(true);
                      setPS1ErrorText('Passwords do not match');
                    } else if (password.length < 8) {
                      setPS1Error(true);
                      setPS1ErrorText('Password min length is 8 characters');
                    } else {
                      setPS1Error(false);
                      setPS1ErrorText('');
                      setPS2Error(false);
                      setPS2ErrorText('');
                    }
                  }}
                  autoCapitalize="none"
                />
                {ps1Error ? (
                  <TheText text={ps1ErrorText} styles={styles.errorText} />
                ) : null}
              </View>
            </View>
            <View>
              <View>
                <TheText text="Confirm password" styles={styles.text} />
                <TheInput
                  placeholder="Enter your password again"
                  secureTextEntry={true}
                  value={password2}
                  onChangeText={(confirmPas: string) => {
                    onChange(confirmPas, 'password2');
                    if (!confirmPas) {
                      setPS2Error(true);
                      setPS2ErrorText('Please enter your password');
                    } else if (password1 !== confirmPas) {
                      setPS2Error(true);
                      setPS1ErrorText('Passwords do not match');
                      setPS2ErrorText('Passwords do not match');
                    } else if (confirmPas.length < 8) {
                      setPS2Error(true);
                      setPS2ErrorText('Password min length is 8 characters');
                    } else {
                      setPS1Error(false);
                      setPS1ErrorText('');
                      setPS2Error(false);
                      setPS2ErrorText('');
                    }
                  }}
                  autoCapitalize="none"
                />
                {ps2Error ? (
                  <TheText text={ps2ErrorText} styles={styles.errorText} />
                ) : null}
              </View>
            </View>

            <View style={styles.separteButton}>
              <TheButton
                title="Sign up"
                styles={styles.button}
                textColor="white"
                onPress={() => sendRequest()}
              />
              <TheButton
                title="Already a member? Log in"
                styles={styles.centerButton}
                onPress={() => navigation.navigate('LogIn')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    width: '100%',
  },
  centerButton: {
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    bottom: 10,
  },
});
