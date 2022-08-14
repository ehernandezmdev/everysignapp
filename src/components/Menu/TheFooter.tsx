import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TheText} from '../TheText';
import {useState} from 'react';

interface Footer {
  setSection: (arg: string) => void;
}

export const TheFooter = ({setSection}: Footer) => {
  const [inboxActive, setInboxActive] = useState(true);
  const [sharingActive, setSharingActive] = useState(false);
  const [browseActive, setBrowseActive] = useState(false);

  const sectionFunctions: any = {
    inbox: setInboxActive,
    sharing: setSharingActive,
    browse: setBrowseActive,
  };

  const deactivateSection = (key: string) => {
    for (const section in sectionFunctions) {
      sectionFunctions[section](false);
      if (key === section) {
        sectionFunctions[section](true);
        setSection(key);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={!inboxActive ? styles.deactiveSection : null}
        onPress={() => deactivateSection('inbox')}>
        <Image
          source={require('../../../assets/img/menu/inbox.png')}
          style={styles.img}
        />
        <TheText text="Inbox" styles={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity
        style={!sharingActive ? styles.deactiveSection : null}
        onPress={() => deactivateSection('sharing')}>
        <Image
          source={require('../../../assets/img/menu/group.png')}
          style={styles.img}
        />
        <TheText text="Sharing" styles={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity
        style={!browseActive ? styles.deactiveSection : null}
        onPress={() => deactivateSection('browse')}>
        <Image
          source={require('../../../assets/img/menu/search.png')}
          style={styles.img}
        />
        <TheText text="Browse" styles={styles.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262B40',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: 65,
    bottom: 0,
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  img: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  deactiveSection: {
    opacity: 0.2,
  },
});
