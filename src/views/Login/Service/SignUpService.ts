import { ResponseInterface, SignUpFormInterface } from '../Interfaces/SignUpResponse.interface';
import { baseURL } from '../../../baseURL';

export const SignUpRequest = async ({first_name, last_name, email, password1, password2}: SignUpFormInterface) => {
  const formData = new FormData();
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('password1', password1);
  formData.append('password2', password2);

  try {
    const response = await fetch(`${baseURL}/create_user/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': "multipart/form-data"
      },
      body: formData,
    });
    if (response.ok) {
      const {valid, errors}: ResponseInterface = await response.json();
      const errores: any = {};
      if (!valid) {
        const splitErrors = errors.split('\n');
        for (let i = 0; i < splitErrors.length - 1; i += 2) {
          const key = splitErrors[i].substring(splitErrors[i].indexOf('*') + 2)
          const value = splitErrors[i + 1].substring(splitErrors[i + 1].indexOf('*') + 2)
          errores[key] = value
        }
        return {
          valid,
          errores
        };
      }
      return {
        valid: true,
        errores: 'asdf'
      };
    }
  } catch (error) {
  }
}