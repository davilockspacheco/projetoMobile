import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../controller'; // Ajuste o caminho conforme sua estrutura

export default function Feed({ route, navigation }) {
  const jogadorId = route?.params?.jogadorId; // Pega o ID do jogador se foi passado
  const [jogador, setJogador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        if (jogadorId) {
          // Se foi passado um ID específico, busca apenas esse jogador
          const docRefProduto = doc(db, 'produtos', jogadorId);
          const docSnapProduto = await getDoc(docRefProduto);
          
          if (docSnapProduto.exists()) {
            const dadosProduto = docSnapProduto.data();
            
            // Tenta buscar dados complementares na coleção jogadores
            const docRefJogador = doc(db, 'jogadores', jogadorId);
            const docSnapJogador = await getDoc(docRefJogador);
            
            if (docSnapJogador.exists()) {
              const dadosJogador = docSnapJogador.data();
              // Combina os dados, dando prioridade aos dados do jogador
              setJogador({ ...dadosProduto, ...dadosJogador });
            } else {
              // Se não existir na coleção jogadores, usa apenas os dados do produto
              setJogador({
                ...dadosProduto,
                idade: dadosProduto.idade || 0,
                posicao: dadosProduto.posicao || '',
                altura: dadosProduto.altura || 0,
                peso: dadosProduto.peso || 0,
                pePreferencial: dadosProduto.pePreferencial || '',
                gols: dadosProduto.gols || 0,
                assistencias: dadosProduto.assistencias || 0,
                faltas: dadosProduto.faltas || 0,
                cartoesAmarelos: dadosProduto.cartoesAmarelos || 0,
                cartoesVermelhos: dadosProduto.cartoesVermelhos || 0
              });
            }
          }
        } else {
          // Se não foi passado ID, busca todos os jogadores (comportamento original)
          const querySnapshot = await getDocs(collection(db, 'jogadores'));
          if (!querySnapshot.empty) {
            const primeiroJogador = querySnapshot.docs[0];
            setJogador(primeiroJogador.data());
          }
        }
      } catch (error) {
        console.log('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [jogadorId]);

  // Função para formatar valores, garantindo que não sejam undefined/null
  const formatarValor = (valor, sufixo = '') => {
    if (valor === null || valor === undefined || valor === '') {
      return 'Não informado';
    }
    return `${valor}${sufixo}`;
  };

  // Função específica para formatar altura em metros
  const formatarAltura = (alturaCm) => {
    if (!alturaCm) return 'Não informado';
    const alturaM = alturaCm / 100;
    return `${alturaM.toFixed(2)} m`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fcd303" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!jogador) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Jogador não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>DETALHES DO JOGADOR</Text>

      <View style={styles.card}>
        {jogador.imagem ? (
          <Image
            source={{ uri: jogador.imagem }}
            style={styles.imagem}
            onError={() => console.log('Erro ao carregar imagem')}
          />
        ) : (
          <View style={styles.imagemPlaceholder}>
            <Text style={styles.imagemPlaceholderText}>Sem Imagem</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.texto}>
            <Text style={styles.label}>Nome:</Text> {formatarValor(jogador.nome)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Idade:</Text> {formatarValor(jogador.idade, ' anos')}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Posição:</Text> {formatarValor(jogador.posicao)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Altura:</Text> {formatarAltura(jogador.altura)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Peso:</Text> {formatarValor(jogador.peso, ' kg')}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Pé preferencial:</Text> {formatarValor(jogador.pePreferencial)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Gols:</Text> {formatarValor(jogador.gols)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Assistências:</Text> {formatarValor(jogador.assistencias)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Faltas:</Text> {formatarValor(jogador.faltas)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Cartões Amarelos:</Text> {formatarValor(jogador.cartoesAmarelos)}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Cartões Vermelhos:</Text> {formatarValor(jogador.cartoesVermelhos)}
          </Text>
        </View>

        {jogadorId && (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditarJogador', { jogadorId })}
          >
            <Text style={styles.editButtonText}>EDITAR ESTATÍSTICAS</Text>
          </TouchableOpacity>
        )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5bc07',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f5bc07',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
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
  imagemPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemPlaceholderText: {
    color: '#666',
    fontSize: 16,
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
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
