import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native-web';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../controller';

export default function TelaEscalacao() {
  const [jogadores, setJogadores] = useState([]);
  const [titulares, setTitulares] = useState([]);

  useEffect(() => {
    async function carregarJogadores() {
      const querySnapshot = await getDocs(collection(db, 'jogadores'));
      const lista = [];
      querySnapshot.forEach(doc => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setJogadores(lista);
    }
    carregarJogadores();
  }, []);

  const selecionarTitular = (jogador) => {
    if (titulares.find(j => j.id === jogador.id)) return; // Evita duplicatas
    if (titulares.length >= 7) return; // Máximo de 7 titulares
    setTitulares([...titulares, jogador]);
  };

  return (
    <View style={styles.container}>
      {/* LADO ESQUERDO: CAMPO COM TITULARES */}
      <View style={styles.ladoEsquerdo}>
        <Image source={require('../assets/campo_futebol.jpg')} style={styles.fundoCampo} resizeMode="cover" />
        <View style={styles.overlayCampo}>
          {titulares.map((jogador, index) => (
            <View key={jogador.id} style={styles.slotJogador}>
              <View style={styles.fotoCircular}>
                {/* imagem temporária */}
                <Image source={{ uri: jogador.imagem || 'https://via.placeholder.com/100' }} style={styles.imagem} />
              </View>
              <Text style={styles.nomeJogador}>{jogador.nome}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* LADO DIREITO: LISTA DE JOGADORES */}
      <View style={styles.ladoDireito}>
        <Text style={styles.titulo}>Selecionar Jogadores</Text>
        <ScrollView contentContainerStyle={styles.listaJogadores}>
          {jogadores.map((jogador) => (
            <TouchableOpacity key={jogador.id} style={styles.cardJogador} onPress={() => selecionarTitular(jogador)}>
              <Text style={styles.nomeLista}>{jogador.nome} ({jogador.posicao})</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
  },
  ladoEsquerdo: {
    width: '60%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundoCampo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlayCampo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  slotJogador: {
    alignItems: 'center',
    margin: 10,
  },
  fotoCircular: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  nomeJogador: {
    marginTop: 5,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ladoDireito: {
    width: '40%',
    backgroundColor: '#ddd', // você pode mudar essa cor
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listaJogadores: {
    paddingBottom: 100,
  },
  cardJogador: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  nomeLista: {
    fontSize: 16,
  },
});
