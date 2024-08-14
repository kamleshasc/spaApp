import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StatusBar} from 'react-native';
import colors from './src/config/colors';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        backgroundColor={colors.themePrimary}
        barStyle={'light-content'}
      />
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
