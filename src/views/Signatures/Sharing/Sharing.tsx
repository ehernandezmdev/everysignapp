import {baseURL} from '../../../baseURL';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TheText} from '../../../components/TheText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {TheLoading} from '../../../components/TheLoading';
import {DocumentCard} from '../Inbox/components/DocumentCard';

export const Sharing = () => {
  const [documents, setDocuments] = useState([]);
  const [areDocuments, setAreDocuments] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPersonalDocuments();
  }, []);

  const getPersonalDocuments = async () => {
    setLoading(true);
    try {
      const userData = (await AsyncStorage.getItem('userData')) || '';
      const jsonUserData = JSON.parse(userData);
      const userId = jsonUserData[0].pk;
      const body = new FormData();
      body.append('user_id', userId);
      const response = await fetch(`${baseURL}/getDocuments/`, {
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      const jsonResponse = await response.json();
      // console.log(jsonResponse.documents);
      jsonResponse.documents ? setAreDocuments(true) : setAreDocuments(false);
      jsonResponse.documents ? setDocuments(jsonResponse.documents) : null;
    } catch (error) {}
    setLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <TheText
        text="Sharing Documents"
        styles={{
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'justify',
          alignSelf: 'center',
          width: '92%',
        }}
      />
      {loading ? (
        <TheLoading />
      ) : areDocuments ? (
        documents.map((item: any) => (
          <DocumentCard
            title={item.fields.filename}
            status={item.fields.status}
            date={item.fields.created_at}
            key={item.fields.created_at}
          />
        ))
      ) : (
        <TheText styles={styles.text} text="No hay nada" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
