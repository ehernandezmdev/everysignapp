import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

// interface Input {
//   placeholder: string;
//   styles?: Object;
//   secureText?: boolean;
//   value?: string;
//   onChange: any;
// }

export const TheInput = (props: any) => {
  return (
    <View style={props.styles}>
      <TextInput style={inputStyles.input} {...props} />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: '#E5E5EA',
    height: 35,
    borderRadius: 10,
    padding: 10,
    margin: 15,
  },
});
