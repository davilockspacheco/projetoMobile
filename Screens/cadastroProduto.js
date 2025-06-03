import { View, StyleSheet, Text, Image, TextInput, Button } from "react-native-web";
import { useState } from "react";
import { db } from '../controller';
import { collection, addDoc } from "firebase/firestore"; 

export default function CadastroProduto({ navigation }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    const CadastrarProduct = async () => {
        try {
            await addDoc(collection(db, 'produtos'), {
                nome,
                preco: parseFloat(preco),
                imagem,
            });
            setNome("");
            setPreco("");
            setImagem("");
        } catch (error) {
            console.log('Erro ao cadastrar produto', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo_login.jpg")} />

            <Text style={styles.title}>Cadastro de Produto</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={preco}
                onChangeText={setPreco}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="URL da Imagem"
                value={imagem}
                onChangeText={setImagem}
            />

            <Button
                title="Cadastrar"
                color="#4CAF50"
                onPress={CadastrarProduct}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 12,
        paddingHorizontal: 10
    }
});
