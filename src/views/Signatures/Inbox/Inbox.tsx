import React, {useState, useEffect} from 'react';
import {TheText} from '../../../components/TheText';
import {DocumentCard} from './components/DocumentCard';
import {baseURL} from '../../../baseURL';
import {StyleSheet, View} from 'react-native';
import {TheLoading} from '../../../components/TheLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Inbox = ({navigation}: any) => {
  const [areDocuments, setAreDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuemntsToSign();
    // console.log(documents);
  }, []);

  const getDocuemntsToSign = async () => {
    setLoading(true);
    try {
      const userData = (await AsyncStorage.getItem('userData')) || '';
      const jsonUserData = JSON.parse(userData);
      const userId = jsonUserData[0].pk;
      const body = new FormData();
      body.append('user_id', userId);
      const response = await fetch(`${baseURL}/getDocumentsToSign/`, {
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          // 'Content-type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      const jsonResponse = await response.json();
      setAreDocuments(jsonResponse.docs);
      jsonResponse.docs ? setDocuments(jsonResponse.documentsToSign) : null;

      // setDocuments(jsonResponse.documentsToSign);
      // jsonResponse.documentsToSign.map(item => console.log(item.fields));
      // setLoading(false);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const navigateToPdf = () => {
    navigation.navigate('ViewPdf');
  };

  return (
    <View style={{flex: 1}}>
      <TheText
        text="Incoming Documents"
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
            showButton={true}
            key={item.fields.created_at}
            onPress={navigateToPdf}
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
