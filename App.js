import Login from "./Screens/Login";
import Feed from "./Screens/Feed";
import Produto from "./Screens/produto";
import Cadastro from "./Screens/Cadastro";
import cadastroJogador from "./Screens/cadastroJogador";
import EditarJogador from "./Screens/EditarJogador"; // Nova tela de edição
import TelaEscalacao from "./Screens/TelaEscalacao";
import TelaProximosJogos from "./Screens/TelaJogos";
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
      <BottomTab.Screen name = "Elenco" component={Produto}
      options={{tabBarIcon: () => <FontAwesome name="group" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "Estátisticas do Jogador" component={Feed}
      options={{tabBarIcon: () => <FontAwesome name="bar-chart" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "Jogos" component={TelaProximosJogos}
      options={{tabBarIcon: () => <FontAwesome name="soccer-ball-o" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "Cadastrar de Jogador" component={cadastroJogador}
      options={{tabBarIcon: () => <FontAwesome name="user-plus" size={24} color="black" />}}
      />
      <BottomTab.Screen name = "Escalação" component={TelaEscalacao}
      options={{tabBarIcon: () => <MaterialIcons name="stadium" size={24} color="black" />}}
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
        options={{tabBarIcon: () => <MaterialIcons name="sports_soccer" size={24} color="black" />}}
        />
        <Stack.Screen options = {{headerShown: false}} name ="HomeTab" component= {BottomTabs} />
        <Stack.Screen name = "TelaCadastro" component={Cadastro}
        options={{tabBarIcon: () => <MaterialIcons name="hsports_soccer" size={24} color="black" />}}
        />
        <Stack.Screen name="EditarJogador" component={EditarJogador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

