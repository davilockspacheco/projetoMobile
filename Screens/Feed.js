import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function Feed() {
  const [jogador, setJogador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const querySnapshot = await getDocs(collection(db, 'jogadores'));
      querySnapshot.forEach((doc) => {
       
        setJogador(doc.data());
      });
      setLoading(false);
    }

    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fcd303" />
      </View>
    );
  }

  if (!jogador) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Jogador não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>DETALHES DO JOGADOR</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: jogador.imagem }}
          style={styles.imagem}
        />

        <View style={styles.info}>
          <Text style={styles.texto}><Text style={styles.label}>Nome:</Text> {jogador.nome}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Idade:</Text> {jogador.idade} anos</Text>
          <Text style={styles.texto}><Text style={styles.label}>Posição:</Text> {jogador.posicao}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Altura:</Text> {jogador.altura} cm</Text>
          <Text style={styles.texto}><Text style={styles.label}>Peso:</Text> {jogador.peso} kg</Text>
          <Text style={styles.texto}><Text style={styles.label}>Pé preferencial:</Text> {jogador.pePreferencial}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Gols:</Text> {jogador.gols}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Assistências:</Text> {jogador.assistencias}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Faltas:</Text> {jogador.faltas}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Cartões Amarelos:</Text> {jogador.cartoesAmarelos}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Cartões Vermelhos:</Text> {jogador.cartoesVermelhos}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5bc07',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fcd303',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  info: {
    width: '100%',
  },
  texto: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
});