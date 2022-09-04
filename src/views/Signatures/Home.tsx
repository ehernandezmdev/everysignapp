import {TheFooter} from '../../components/Menu/TheFooter';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TheHeader} from '../../components/Menu/TheHeader';
import {useState, useContext} from 'react';
import {userData} from '../../data/userData';
import {AuthContext} from '../../context/authContext';

export const Home = ({route}: any) => {
  const {logOut} = useContext(AuthContext);
  const [section, setSection] = useState('inbox');
  const {deleteUserData} = userData();

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

  const logOutButton = async () => {
    try {
      await deleteUserData();
      logOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {showSection()}
        <TouchableOpacity
          style={{position: 'absolute', bottom: '50%', right: '50%'}}
          onPress={() => logOutButton()}>
          <Text>LogOut</Text>
        </TouchableOpacity>
        <TheFooter setSection={setSectionFromChildren} />
      </View>
    </SafeAreaView>
  );
};
