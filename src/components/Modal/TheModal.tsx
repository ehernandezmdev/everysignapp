import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {TheButton} from '../TheButton';
import {TheText} from '../TheText';

interface ModalProps {
  title: string;
  message: string;
  onPress: () => void;
}

export const TheModal = ({title, message, onPress}: ModalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <TheText text={title} styles={styles.title} />
        <TheText text={message} styles={styles.text} />
        <TheButton
          title="Continue"
          styles={styles.button}
          textColor="white"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'space-evenly',
    width: '70%',
    height: '30%',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#262B40',
    alignSelf: 'center',
  },
});
