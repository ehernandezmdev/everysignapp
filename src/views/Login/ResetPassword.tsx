import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {TheInput} from '../../components/TheInput';
import {TheButton} from '../../components/TheButton';
import {baseURL} from '../../baseURL';
import {useState} from 'react';
import {TheModal} from '../../components/Modal/TheModal';
import {TheLoading} from '../../components/TheLoading';

export const RecoverPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState('');
  const [showMessageError, setShowMessageError] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const textErrors: any = {
    400: 'There is no user with this email',
    500: 'The email could not be sent',
  };

  const checkEmail = async () => {
    setLoadingRequest(true);
    try {
      if (showMessageError) {
        throw new Error();
      }
      const resposne = await fetch(
        `https://2d12-187-161-10-73.ngrok.io/user/settings/reset_pass_mail/${email}`,
        {
          method: 'GET',
        },
      );
      if (resposne.ok) {
        setShowModal(true);
      } else {
        setShowMessageError(true);
        setMessageError(textErrors[resposne.status]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingRequest(false);
  };

  return (
    <View style={styles.container}>
      {loadingRequest ? <TheLoading /> : null}
      {showModal ? (
        <TheModal
          title="Success!"
          message="The email has been sent"
          onPress={() => {
            navigation.navigate('LogIn');
          }}
        />
      ) : null}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TheLoginHeader title="Recover your account" />
      </View>
      <View style={styles.emailContainer}>
        <TheText text="Email" styles={styles.emailText} />
        <TheInput
          placeholder="Enter your email address"
          value={email}
          autoCorrect={false}
          onChangeText={(email: string) => {
            setEmail(email);
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              setShowMessageError(true);
              setMessageError('Please enter a valid email');
            } else {
              setShowMessageError(false);
              setMessageError('');
            }
          }}
          autoCapitalize="none"
        />
        <TheText
          text="We will send you an email with instructions to recover your account"
          styles={styles.legendText}
        />
        {showMessageError ? (
          <TheText text={messageError} styles={styles.messageError} />
        ) : null}
        <View
          style={{
            justifyContent: 'space-between',
            height: 115,
          }}>
          <TheButton
            title="Continue"
            styles={styles.button}
            textColor="white"
            onPress={() => checkEmail()}
          />
          <TheButton
            title="Return to login"
            styles={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('LogIn')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emailContainer: {
    flex: 2,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#262B40',
  },
  legendText: {
    fontStyle: 'italic',
    alignSelf: 'center',
    color: '#262B40',
  },
  button: {
    alignSelf: 'center',
    shadowColor: '#262B40',
    backgroundColor: '#262B40',
    top: 15,
  },
  messageError: {
    color: 'red',
    alignSelf: 'center',
  },
});
