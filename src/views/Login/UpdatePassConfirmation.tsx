import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheButton} from '../../components/TheButton';

export const UpdatePassConfirmation = () => {
  return (
    <View style={styles.container}>
      <TheLoginHeader title="Congratulations, your password has been changed!" />
      <TheButton title="Continue" textColor="white" styles={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#262B40',
    alignSelf: 'center',
    bottom: 40,
  },
});
