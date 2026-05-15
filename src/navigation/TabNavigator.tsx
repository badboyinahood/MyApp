import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { COLORS } from '../constants/colors';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#fff',
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: isDark ? '#fff' : COLORS.primary,
        tabBarInactiveTintColor: isDark ? '#888' : '#999',

        tabBarIcon: ({ color, size, focused }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}