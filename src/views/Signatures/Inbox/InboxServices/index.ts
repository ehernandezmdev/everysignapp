import { userData } from "../../../../data/userData";
import { baseURL } from "../../../../baseURL";


export const InboxService = () => {
  const getDocuments = async () => {
    try {
      const user = await userData().getUserData();
      const jsonUser = JSON.parse(user);
      const userId = jsonUser[0]['pk'];
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
  
      if (response.ok) {
        const documents = await response.json();
        documents.docs ? documents : new Error;
        return documents;
      } else {
        throw new Error;
      } 
    } catch (error) {
      console.log(error)
      return {
        docs: false,
        documentsToSign: []
      }
    }
  }

  return {
    getDocuments
  }
}