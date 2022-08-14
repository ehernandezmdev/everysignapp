import {TheFooter} from '../../components/Menu/TheFooter';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TheHeader} from '../../components/Menu/TheHeader';
import {useState} from 'react';

export const Home = () => {
  const [section, setSection] = useState('inbox');

  const showSection = () => {
    if (section === 'inbox') {
      return <TheHeader title="Inbox" />;
    } else if (section === 'sharing') {
      return <TheHeader title="Sharing" />;
    } else {
      return <TheHeader title="Browse" />;
    }
  };

  const setSectionFromChildren = (section: string) => {
    setSection(section);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {showSection()}
        <TheFooter setSection={setSectionFromChildren} />
      </View>
    </SafeAreaView>
  );
};