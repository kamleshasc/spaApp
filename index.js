/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  AppRegistry,
  Platform,
  SafeAreaView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  View,
  StatusBarProps
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import colors from './src/config/colors';

// const MyStatusBar = ({backgroundColor, ...props}) => (
//   <View style={[styles.statusBar, {backgroundColor}]}>
//     <SafeAreaView>
//       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//     </SafeAreaView>
//   </View>
// );

export const StatusBar= (props = {}) => {
    return (
      <>
        <NativeStatusBar
          barStyle="light-content"
          backgroundColor={'red'}
          {...props}
        />
  
        <SafeAreaView
          style={{backgroundColor: props.backgroundColor}}
        />
      </>
    );
  };

function AppOnLoad() {
  return (
    <View style={styles.container}>
      {/* <MyStatusBar
        backgroundColor={colors.themePrimary}
        barStyle="light-content"
        /> */}
      <StatusBar
        backgroundColor={colors.themePrimary}
        barStyle="light-content"
      />
      <App />
    </View>
  );
}

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  statusBar: {
    // height: STATUSBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

AppRegistry.registerComponent(appName, () => AppOnLoad);
