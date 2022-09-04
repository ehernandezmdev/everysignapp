export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
}

type AuthAction =
  | {type: 'signIn'; payload: {token: string}}
  | {type: 'logOut'}
  | {type: 'notAuthenticated'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'notAuthenticated':
    case 'logOut':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
      };
    case 'signIn':
      return {
        ...state,
        status: 'authenticated',
        token: action.payload.token,
      };
    default:
      return state;
  }
};
