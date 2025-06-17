import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native-web';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../controller';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TelaEscalacao() {
  const [jogadores, setJogadores] = useState([]);
  const [titulares, setTitulares] = useState([]);
  const [formacao, setFormacao] = useState('3-2-1');

  const drawerAnim = useState(new Animated.Value(width))[0]; // Drawer começa fora da tela

  const abrirDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: width - 300, // Abre até 300px da direita
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fecharDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jogadores'));
        const jogadoresData = querySnapshot.docs.map(doc => doc.data());
        setJogadores(jogadoresData);
      } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
      }
    };

    fetchJogadores();
  }, []);

  const formacoes = {
    '3-2-1': [
      { top: '10%', left: '50%' }, 
      { top: '30%', left: '20%' }, 
      { top: '30%', left: '50%' }, 
      { top: '30%', left: '70%' }, 
      { top: '50%', left: '40%' }, 
      { top: '50%', left: '59%' }, 
      { top: '80%', left: '50%' },
    ],
    '2-3-1': [
      { top: '10%', left: '50%' },
      { top: '25%', left: '35%' },
      { top: '25%', left: '65%' },
      { top: '50%', left: '30%' },
      { top: '40%', left: '50%' },
      { top: '50%', left: '70%' },
      { top: '80%', left: '50%' },
    ],
    '2-2-2': [
      { top: '10%', left: '50%' },
      { top: '30%', left: '35%' },
      { top: '30%', left: '65%' },
      { top: '50%', left: '40%' },
      { top: '50%', left: '60%' },
      { top: '70%', left: '40%' },
      { top: '80%', left: '60%' },
    ]
  };

  return (
    <View style={styles.container}>

      {/* Botão de abrir Drawer */}
      <TouchableOpacity style={styles.botaoDrawer} onPress={abrirDrawer}>
        <AntDesign name="team" size={24} color="white" />
      </TouchableOpacity>

      {/* Campo */}
      <Image
        source={require('../assets/campo_futebol.jpg')}
        style={styles.campo}
        resizeMode="cover"
      />

      {titulares.map((jogador, index) => {
        const pos = formacoes[formacao][index];
        return (
          <TouchableOpacity
            key={index}
            style={[styles.jogadorSlot, { top: pos.top, left: pos.left }]}
            onPress={() => {
              setTitulares(titulares.filter(j => j !== jogador));
            }}
          >
            <Image
              source={{ uri: jogador.imagem || 'https://via.placeholder.com/100' }}
              style={styles.imagem}
            />
            <Text style={styles.nome}>{jogador.nome}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Drawer lateral */}
      <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
        <TouchableOpacity onPress={fecharDrawer}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Formação:</Text>
        <View style={styles.botoesFormacao}>
          {Object.keys(formacoes).map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.botaoFormacao, formacao === item && styles.botaoSelecionado]}
              onPress={() => setFormacao(item)}
            >
              <Text style={styles.txtBotao}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={{ marginTop: 20 }}>
          {jogadores
            .filter(jogador => !titulares.includes(jogador))
            .map((jogador, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cardJogador}
                onPress={() => {
                  if (titulares.length < 7) {
                    setTitulares([...titulares, jogador]);
                  } else {
                    alert('Limite de 7 jogadores.');
                  }
                }}
              >
                <Image
                  source={{ uri: jogador.imagem || 'https://via.placeholder.com/100' }}
                  style={styles.fotoLista}
                />
                <View>
                  <Text style={styles.nomeLista}>{jogador.nome}</Text>
                  <Text style={styles.posicaoLista}>{jogador.posicao}</Text>
                </View>
              </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b6623',
  },
  campo: {
    width: '100%',
    height: '100vh',
    position: 'absolute',
  },
  botaoDrawer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    width: 300,
    height: '100vh',
    backgroundColor: '#f5bc07',
    padding: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#333',
    zIndex: 9,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoesFormacao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  botaoFormacao: {
    backgroundColor: '#4F4F4F',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  botaoSelecionado: {
    backgroundColor: '#fff',
  },
  txtBotao: {
    fontWeight: 'bold',
  },
  jogadorSlot: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  nome: {
    marginTop: 4,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardJogador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  fotoLista: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nomeLista: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  posicaoLista: {
    fontSize: 14,
    color: '#666',
  },
});
