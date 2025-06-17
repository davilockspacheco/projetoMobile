// TelaEscalacao.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native-web';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../controller';

export default function TelaEscalacao() {
  const [jogadores, setJogadores] = useState([]);
  const [formacao, setFormacao] = useState('3-2-1'); // nova
 // Formação padrão inicial

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

// Define as posições fixas no campo para cada formação (em porcentagens)
  const formacoes = {
    '3-2-1': [
      { top: '10%', left: '44.5%' }, // Goleiro
      { top: '30%', left: '30%' }, // Ala Direito
      { top: '30%', left: '50%' }, // Zagueiro
      { top: '30%', left: '70%' }, // Ala Esquerdo
      { top: '50%', left: '40%' }, // Meio Campo
      { top: '50%', left: '59%' }, // Meio Campo
      { top: '70%', left: '50%' }, // Atacante
    ],
    '2-3-1': [
      { top: '10%', left: '44.5%' }, // Goleiro
      { top: '25%', left: '38%' }, // Zagueiro
      { top: '25%', left: '60%' }, // Zagueiro
      { top: '50%', left: '30%' }, // Meio Campo
      { top: '40%', left: '50%' }, // Volante
      { top: '50%', left: '70%' }, // Meio Campo
      { top: '70%', left: '50%' }, // Atacante
    ],
    '2-2-2': [
      { top: '10%', left: '44.5%' }, // Goleiro
      { top: '30%', left: '40%' }, // Zagueiro
      { top: '30%', left: '60%' }, // Zagueiro
      { top: '50%', left: '40%' }, // Meio Campo
      { top: '50%', left: '60%' }, // Meio Campo
      { top: '70%', left: '40%' }, // Atacante
      { top: '70%', left: '60%' }, // Atacante
    ]
  };


  // Define os 7 jogadores como titulares, mas inicia vazio
const [titulares, setTitulares] = useState([]);

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


  return (
    <View style={styles.container}>

      {/* Parte esquerda: Campo com titulares */}
      <View style={styles.campoContainer}>
        <Image
          source={require('../assets/campo_futebol.jpg')}
          style={styles.campo}
          resizeMode="contain"
        />

        {/* Renderiza cada titular na posição da formação */}
        {titulares.map((jogador, index) => {
          const pos = formacoes[formacao][index];
          return (
            <TouchableOpacity
              key={index}
              style={[styles.jogadorSlot, {
                top: pos.top,
                left: pos.left,
              }]}
              onPress={() => {
                // Remove o jogador clicado da lista de titulares
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

      </View>

      {/* Parte direita: Lista de jogadores com seleção de formação */}
      <View style={styles.listaContainer}>
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
            .filter(jogador => !titulares.includes(jogador)) // Só exibe quem ainda não está no campo
            .map((jogador, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cardJogador}
                onPress={() => {
                  if (titulares.length < 7) {
                    setTitulares([...titulares, jogador]); // adiciona ao campo
                  } else {
                    alert('Limite de 7 jogadores escalados.');
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100vh',
  },
  campoContainer: {
  flex: 1,
  position: 'relative',
  backgroundColor: '#0b6623', // cor de fundo caso imagem não carregue
  },
  campo: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  position: 'absolute',
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
  listaContainer: {
    width: '40%',
    padding: 20,
    backgroundColor: '#f4f4f4',
    backgroundColor: '#f5bc07'
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
  cardJogador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
