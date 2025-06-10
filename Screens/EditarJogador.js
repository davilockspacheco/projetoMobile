import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../controller';

const { height } = Dimensions.get('window');

export default function EditarJogador({ route, navigation }) {
  const { jogadorId } = route.params;
  const [jogador, setJogador] = useState({
    nome: '',
    idade: '',
    posicao: '',
    altura: '',
    peso: '',
    pePreferencial: '',
    gols: '',
    assistencias: '',
    faltas: '',
    cartoesAmarelos: '',
    cartoesVermelhos: '',
    preco: '',
    imagem: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDadosJogador();
  }, []);

  const carregarDadosJogador = async () => {
    try {
      const docRefProduto = doc(db, 'produtos', jogadorId);
      const docSnapProduto = await getDoc(docRefProduto);

      let dadosBasicos = {};
      if (docSnapProduto.exists()) {
        dadosBasicos = docSnapProduto.data();
      }

      const docRefJogador = doc(db, 'jogadores', jogadorId);
      const docSnapJogador = await getDoc(docRefJogador);

      if (docSnapJogador.exists()) {
        const dadosCompletos = { ...dadosBasicos, ...docSnapJogador.data() };
        setJogador({
          nome: dadosCompletos.nome || '',
          idade: dadosCompletos.idade?.toString() || '',
          posicao: dadosCompletos.posicao || '',
          altura: dadosCompletos.altura?.toString() || '',
          peso: dadosCompletos.peso?.toString() || '',
          pePreferencial: dadosCompletos.pePreferencial || '',
          gols: dadosCompletos.gols?.toString() || '0',
          assistencias: dadosCompletos.assistencias?.toString() || '0',
          faltas: dadosCompletos.faltas?.toString() || '0',
          cartoesAmarelos: dadosCompletos.cartoesAmarelos?.toString() || '0',
          cartoesVermelhos: dadosCompletos.cartoesVermelhos?.toString() || '0',
          preco: dadosCompletos.preco || '',
          imagem: dadosCompletos.imagem || ''
        });
      } else {
        setJogador(prev => ({
          ...prev,
          nome: dadosBasicos.nome || '',
          preco: dadosBasicos.preco || '',
          imagem: dadosBasicos.imagem || ''
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Erro ao carregar dados do jogador');
    } finally {
      setLoading(false);
    }
  };

  const salvarAlteracoes = async () => {
    try {
      const dadosAtualizados = {
        nome: jogador.nome,
        idade: parseInt(jogador.idade) || 0,
        posicao: jogador.posicao,
        altura: parseInt(jogador.altura) || 0,
        peso: parseInt(jogador.peso) || 0,
        pePreferencial: jogador.pePreferencial,
        gols: parseInt(jogador.gols) || 0,
        assistencias: parseInt(jogador.assistencias) || 0,
        faltas: parseInt(jogador.faltas) || 0,
        cartoesAmarelos: parseInt(jogador.cartoesAmarelos) || 0,
        cartoesVermelhos: parseInt(jogador.cartoesVermelhos) || 0,
        preco: jogador.preco,
        imagem: jogador.imagem
      };

      await updateDoc(doc(db, 'produtos', jogadorId), {
        nome: dadosAtualizados.nome,
        preco: dadosAtualizados.preco,
        imagem: dadosAtualizados.imagem
      });

      await setDoc(doc(db, 'jogadores', jogadorId), dadosAtualizados, { merge: true });

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Erro ao salvar alterações');
    }
  };

  const updateField = (field, value) => {
    setJogador(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical={true}
        bounces={true}
      >
        <Text style={styles.titulo}>EDITAR JOGADOR</Text>

        {jogador.imagem ? (
          <Image source={{ uri: jogador.imagem }} style={styles.imagem} />
        ) : null}

        <View style={styles.form}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={jogador.nome}
              onChangeText={(text) => updateField('nome', text)}
              placeholder="Nome"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              value={jogador.idade}
              onChangeText={(text) => updateField('idade', text)}
              placeholder="Idade"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Posição</Text>
            <TextInput
              style={styles.input}
              value={jogador.posicao}
              onChangeText={(text) => updateField('posicao', text)}
              placeholder="Posição"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={jogador.altura}
              onChangeText={(text) => updateField('altura', text)}
              placeholder="Altura (cm)"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={jogador.peso}
              onChangeText={(text) => updateField('peso', text)}
              placeholder="Peso (kg)"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pé Preferencial</Text>
            <TextInput
              style={styles.input}
              value={jogador.pePreferencial}
              onChangeText={(text) => updateField('pePreferencial', text)}
              placeholder="Pé Preferencial"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gols</Text>
            <TextInput
              style={styles.input}
              value={jogador.gols}
              onChangeText={(text) => updateField('gols', text)}
              placeholder="Gols"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Assistências</Text>
            <TextInput
              style={styles.input}
              value={jogador.assistencias}
              onChangeText={(text) => updateField('assistencias', text)}
              placeholder="Assistências"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Faltas</Text>
            <TextInput
              style={styles.input}
              value={jogador.faltas}
              onChangeText={(text) => updateField('faltas', text)}
              placeholder="Faltas"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cartões Amarelos</Text>
            <TextInput
              style={styles.input}
              value={jogador.cartoesAmarelos}
              onChangeText={(text) => updateField('cartoesAmarelos', text)}
              placeholder="Cartões Amarelos"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cartões Vermelhos</Text>
            <TextInput
              style={styles.input}
              value={jogador.cartoesVermelhos}
              onChangeText={(text) => updateField('cartoesVermelhos', text)}
              placeholder="Cartões Vermelhos"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valor</Text>
            <TextInput
              style={styles.input}
              value={jogador.preco}
              onChangeText={(text) => updateField('preco', text)}
              placeholder="Valor"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL da Imagem</Text>
            <TextInput
              style={styles.input}
              value={jogador.imagem}
              onChangeText={(text) => updateField('imagem', text)}
              placeholder="URL da Imagem"
              multiline={true}
              numberOfLines={2}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5bc07'
  },
  scrollView: {
    height: height, // Altura da tela
    backgroundColor: '#f5bc07'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 400 // Muito espaço no final
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5bc07',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 100
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 45
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 50
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});