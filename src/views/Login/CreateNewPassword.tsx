import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TheLoginHeader} from '../../components/Login/TheLoginHeader';
import {TheText} from '../../components/TheText';
import {TheInput} from '../../components/TheInput';
import {TheButton} from '../../components/TheButton';

export const CreateNewPassword = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TheLoginHeader title="Create a new password" />
      </View>
      <View style={styles.emailContainer}>
        <View>
          <TheText text="New password" styles={styles.emailText} />
          <TheInput placeholder="Enter your new password" />
        </View>
        <View>
          <TheText text="Confirm new passowrd" styles={styles.emailText} />
          <TheInput placeholder="Enter your new password" />
        </View>
        <TheButton
          title="Change password"
          styles={styles.button}
          textColor="white"
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
  },
  button: {
    alignSelf: 'center',
    shadowColor: '#262B40',
    backgroundColor: '#262B40',
    top: 15,
  },
});
