import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation/>
      <FlashMessage position="top" floating/> 
    </NavigationContainer>
  );
}