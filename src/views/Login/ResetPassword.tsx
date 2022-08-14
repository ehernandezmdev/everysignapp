import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {TheInput} from '../../components/TheInput';
import {TheButton} from '../../components/TheButton';
import {baseURL} from '../../baseURL';
import {useState} from 'react';
import {TheModal} from '@/components/Modal/TheModal';

export const RecoverPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');

  const endpointPedorro = async () => {
    try {
      const resposne = await fetch(
        `https://2d12-187-161-10-73.ngrok.io/user/settings/reset_pass_mail/${email}`,
        {
          method: 'GET',
        },
      );
      console.log(resposne.status);
      // if (resposne.ok) {
      //   const data = await resposne.json();
      //   console.log(data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TheLoginHeader title="Recover your account" />
      </View>
      <View style={styles.emailContainer}>
        <TheText text="Email" styles={styles.emailText} />
        <TheInput
          placeholder="Enter your email address"
          value={email}
          onChangeText={(email: string) => {
            setEmail(email);
          }}
          autoCapitalize="none"
        />
        <TheText
          text="We will send you an email with instructions to recover your account"
          styles={styles.legendText}
        />
        <TheButton
          title="Continue"
          styles={styles.button}
          textColor="white"
          onPress={() => endpointPedorro()}
        />
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
});
