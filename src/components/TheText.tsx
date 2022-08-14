import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TextProps {
  text: string;
  styles?: Object;
}

export const TheText = ({text, styles = {}}: TextProps) => {
  return <Text style={[textStyles.text, styles]}>{text}</Text>;
};

const textStyles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
  },
});
