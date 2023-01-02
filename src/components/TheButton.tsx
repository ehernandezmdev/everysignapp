import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {TheText} from './TheText';

interface Props {
  title: string;
  onPress?: () => void;
  styles?: Object;
  textColor?: string;
  textSize?: number;
}

export const TheButton = ({
  title,
  onPress,
  styles,
  textColor = '#262B40',
  textSize = 18,
}: Props) => {
  const ios = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[bStyles.fab, styles]}>
          <TheText
            text={title}
            styles={[bStyles.fabText, {color: textColor, fontSize: textSize}]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const android = () => {
    return (
      <View>
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#F2F1F6', false, 111)}>
          <View style={[bStyles.fab, styles, {justifyContent: 'center'}]}>
            <TheText
              text={title}
              styles={[bStyles.fabText, {color: textColor, fontSize: textSize}]}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return Platform.OS === 'ios' ? ios() : android();
};

const bStyles = StyleSheet.create({
  fab: {
    justifyContent: 'center',
    height: 50,
    width: '70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
    borderRadius: 10,
  },
  fabText: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
