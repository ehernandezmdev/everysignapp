import {baseURL} from '../../../baseURL';

interface Data {
  email: string;
  password: string;
}

export const LogInRequest = async ({email, password}: Data) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${baseURL}/validate_login/`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        // 'Content-type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return {
        error: false,
        data,
      };
    }
    return {
      error: true,
      data: '',
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      data: '',
    };
  }
};
