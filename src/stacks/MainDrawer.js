import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import DrawerCuston from '../components/DrawerCuston';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCuston {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#f5f6fa',
          shadowOpacity: 0,
          elevation: 0,
        },
      }}
    >
      <Drawer.Screen name="WallScreen" component={WallScreen} />
    </Drawer.Navigator>
  );
};
