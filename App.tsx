import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const tab=createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator>
      <tab.Screen name="Home" component={HomeScreen} />
        <tab.Screen name="Settings" component={SettingsScreen} />        
      </tab.Navigator>
    </NavigationContainer>
  );
}
