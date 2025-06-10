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
            <Image style={styles.logo} source={require("../assets/logo_loginCriciuma.jpg")} />

            <Text style={styles.loginText}>Cadastro de Jogadores</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Salário"
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
                 color="#000000"
                onPress={CadastrarProduct}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5bc07',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20, 
        padding: 24,      
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    loginText: {
        fontSize: 34,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 35,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 17,
        borderWidth: 0.5,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputSenhaContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputSenha: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 17,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    botaoOlho: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtsenha: {
        color: '#fff',
        marginTop: 5,
        marginBottom: 20,
        fontWeight: '600',
        fontSize: 14,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        marginRight: '6%',
    },
    cadastre_se: {
        color: '#fff',
        marginTop: 25,
        fontSize: 15,
        fontWeight: '500',
    },
    cadastroLink: {
        color: '#fff',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
