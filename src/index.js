import React, { useEffect } from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/index';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { PersistGate } from 'redux-persist/integration/react'
// const {store, persistor} = StoreFun();
export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true)
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', `useNativeDriver`,
      `Task orphaned for request`,
      `Deprecation warning:`]);
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <FlashMessage position="bottom" icon="auto" />
      </PersistGate>
    </Provider>
  );
}
