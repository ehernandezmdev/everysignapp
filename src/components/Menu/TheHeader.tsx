import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TheText} from '../TheText';

interface Header {
  title: string;
}

export const TheHeader = ({title}: Header) => {
  return (
    <View style={styles.container}>
      <TheText text={title} styles={styles.text} />
      <Image
        source={require('../../../assets/img/everysign.png')}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 63,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
