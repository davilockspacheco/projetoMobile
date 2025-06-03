import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Feed from "./Screens/Feed";
import Count from "./Screens/count";
import Produto from "./Screens/produto";
import Cadastro from "./Screens/Cadastro";
import cadastroProduto from "./Screens/cadastroProduto";

import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function BottomTabs(){
  const BottomTab = createBottomTabNavigator();

  return(
    <BottomTab.Navigator>
      <BottomTab.Screen name = "HomeTab" component={Home}
      options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "FeedTab" component={Feed}
      options={{tabBarIcon: () => <FontAwesome name="feed" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "CountTab" component={Count}
      options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "ProductTab" component={Produto}
      options={{tabBarIcon: () => <AntDesign name="shoppingcart" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "CadastroProductTab" component={cadastroProduto}
      options={{tabBarIcon: () => <MaterialIcons name="admin-panel-settings" size={24} color="black" />}}
      />
      
    </BottomTab.Navigator>
  )
}
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "TelaLogin" component={Login}
        options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}
        />
        <Stack.Screen options = {{headerShown: false}} name ="HomeTab" component= {BottomTabs} />
        <Stack.Screen name = "TelaCadastro" component={Cadastro}
        options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

