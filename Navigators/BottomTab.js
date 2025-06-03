import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Feed from "./Screens/Feed";

import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function BottomTab() {

  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName="Login"
      screenOptions={{
        headerStyle:{backgroundColor: '#696969'},
        headerTintColor: 'white',
        tabBarActiveBackgroundColor: 'yellow'
      }}
      >
        <BottomTab.Screen name="Login" component={Login}
        options={{tabBarIcon: () =>
          <AntDesign name="login" size={24} color="black" />
        }}
        />
        <BottomTab.Screen name="Home" component={Home}
        options={{tabBarIcon: () =>
          <AntDesign name="home" size={24} color="black" />
        }}
        />

        <BottomTab.Screen name="Feed" component={Feed}
        options={{tabBarIcon: () =>
          <FontAwesome name="feed" size={24} color="black" />
        }}
        />

      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

