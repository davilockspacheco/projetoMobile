import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native-web';

export default function TelaProximosJogos() {
  // Exemplo de dados dos jogos
  const [jogos, setJogos] = useState([
    {
      id: 1,
      timeCasa: 'Criciúma',
      escudoCasa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/EscudoCriciumaEC.svg/2560px-EscudoCriciumaEC.svg.png',
      golsCasa: 2,
      golsFora: 1,
      timeFora: 'Paris St Germain',
      escudoFora: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Logo_PSG.png',
      local: 'Campo Municipal - Bairro Central',
    },
    {
      id: 2,
      timeCasa: 'Criciúma',
      escudoCasa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/EscudoCriciumaEC.svg/2560px-EscudoCriciumaEC.svg.png',
      golsCasa: 1,
      golsFora: 3,
      timeFora: 'Corinthians',
      escudoFora: 'https://lendasdofutebol.com/wp-content/uploads/2021/01/logo-corinthians-optimized.png',
      local: 'Arena da Cidade - Rua Principal',
    },

  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Próximos Jogos</Text>

      {jogos.map(jogo => (
        <View key={jogo.id} style={styles.card}>
          <View style={styles.linhaPlacar}>
            <Image source={{ uri: jogo.escudoCasa }} style={styles.escudo} />
            <Text style={styles.nomeTime}>{jogo.timeCasa}</Text>

            <Text style={styles.placar}>
              {jogo.golsCasa} x {jogo.golsFora}
            </Text>

            <Text style={styles.nomeTime}>{jogo.timeFora}</Text>
            <Image source={{ uri: jogo.escudoFora }} style={styles.escudo} />
          </View>

          <Text style={styles.local}>{jogo.local}</Text>
        </View>
      ))}
    <TouchableOpacity 
        style={styles.editButton} 
            onPress={() => navigation.navigate('AdicionarJogos', { jogoId })}
    >
        <Text style={styles.editButtonText}>ADICIONAR JOGO</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5bc07',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  linhaPlacar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  escudo: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  nomeTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  placar: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  local: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  }
});
