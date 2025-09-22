import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import Toast from 'react-native-toast-message';
import {AuthProvider} from './src/redux/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <HomeScreen />
        <Toast />
      </Provider>
    </AuthProvider>
  );
};

export default App;
