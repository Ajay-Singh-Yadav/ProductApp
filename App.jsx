import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//import WelcomeScreen from './src/screens/WelcomeScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </>
    </Provider>
  );
};

export default App;
