import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react";

export const userData = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getToken();
  }, [user]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('user');
  };
  
  const storeUserData = async (value: string) => {
    try {
      await AsyncStorage.setItem('userData', value);
      setUser(value);
      return true;
    } catch (e: any) {
      return false;
    }
  };
  
  const getUserData = async () => {
    try {
      const data: any = await AsyncStorage.getItem('userData');
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  };
  
  const deleteUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser('');
      return true;
    } catch (e: any) {
      return false;
    }
  };

  return {
    user,
    storeUserData,
    deleteUserData,
    getUserData
  }
}
