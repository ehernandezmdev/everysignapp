import React, {useState} from 'react';
import {TheFooter} from '../../components/Menu/TheFooter';
import {StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TheHeader} from '../../components/Menu/TheHeader';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './../../components/Tab/Tab';
import {TheLoading} from '../../components/TheLoading';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Inbox} from '../../views/Signatures/Inbox/Inbox';
import {Sharing} from '../../views/Signatures/Sharing/Sharing';
import {Browse} from '../../views/Signatures/Browse/Browse';

export const Home = () => {
  const [currentSection, setCurrentSection] = useState('Inbox');
  const sections = {Inbox: Inbox};

  const Tab = createBottomTabNavigator();

  // const showSection = () => {
  //   if (currentSection === 'inbox') {
  //     return <TheHeader title="Inbox" />;
  //   } else if (currentSection === 'sharing') {
  //     return <TheHeader title="Sharing" />;
  //   } else if (currentSection === 'browse') {
  //     return <TheHeader title="Browse" />;
  //   }
  // };

  const returnCurrentSection = () => {
    return <Inbox />;
  };

  const setSectionFromChildren = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logOut: {
    position: 'absolute',
  },
});
