import {TheText} from '../../../../components/TheText';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TheButton} from '../../../../components/TheButton';

export const DocumentCard = ({
  title,
  status,
  date,
  showButton = false,
  onPress = null,
}: any) => {
  return (
    <View style={Styles.container}>
      <TheText text="Imagen" />
      <View style={Styles.secondColumn}>
        <TheText text={title} />
        <TheText text={`STATUS: ${status}`} />
        <TheText text="3/5" />
      </View>
      <View style={Styles.thirdColumn}>
        <TheText text={date.substring(0, date.indexOf('T'))} />
        {showButton ? (
          <TheButton
            title="Sign"
            styles={Styles.button}
            textColor="white"
            textSize={16}
            onPress={() => onPress()}
          />
        ) : null}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#262B40',
    width: 90,
    height: 30,
  },
  secondColumn: {
    justifyContent: 'space-evenly',
  },
  thirdColumn: {
    justifyContent: 'space-evenly',
    width: '33%',
  },
});
