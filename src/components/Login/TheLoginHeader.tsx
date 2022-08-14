import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TheText} from '../TheText';

interface Header {
  title: string;
}

export const TheLoginHeader = ({title}: Header) => {
  return (
    <View>
      <Image
        source={require('../../../assets/img/everysign.png')}
        style={styles.image}
      />
      <TheText text={title} styles={styles.welcomeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#262B40',
  },
  image: {
    alignSelf: 'center',
  },
});
