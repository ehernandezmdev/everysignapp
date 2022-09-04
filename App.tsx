import React from 'react';
import {AuthProvider} from './src/context/authContext';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck';

library.add(fab, faSquareCheck);

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
