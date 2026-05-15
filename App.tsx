import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}