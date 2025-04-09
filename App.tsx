import React, {createRef} from 'react';
import {
  CommonActions,
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import RootNavigation, {
  RootStackParamList,
} from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {LogBox} from 'react-native';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

export function resetTo(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );
}

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
