export interface ResponseInterface {
  valid: boolean;
  errors: string;
}

export interface SignUpFormInterface {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}