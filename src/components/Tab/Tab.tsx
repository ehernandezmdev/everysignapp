import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Inbox} from '../../views/Signatures/Inbox/Inbox';
import {Sharing} from '../../views/Signatures/Sharing/Sharing';
import {Browse} from '../../views/Signatures/Browse/Browse';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackground: () => (
          <Image source={require('../../../assets/img/everysign.png')} />
        ),
        headerBackgroundContainerStyle: {
          alignItems: 'flex-end',
        },
        headerTitleAlign: 'left',
        headerTitleAllowFontScaling: true,
        headerTitleStyle: {
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTitleContainerStyle: {
          // justifyContent: 'flex-start',
        },
        tabBarStyle: {
          backgroundColor: '#262B40',
          flexDirection: 'row',
          position: 'absolute',
        },
        tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Sharing" component={Sharing} />
      <Tab.Screen name="Browse" component={Browse} />
    </Tab.Navigator>
  );
};
