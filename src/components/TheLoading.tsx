import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const TheLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '110%',
    opacity: 0.6,
    zIndex: 1,
  },
});
