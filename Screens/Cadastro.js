import { View, StyleSheet, Text, Image, TextInput, Button } from "react-native-web";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../controller";

export default function Cadastro({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const RegistroUsuario = () => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                console.log('Usuário Cadastrado!', userCredential.user.email);
                navigation.navigate('TelaLogin');
            })
            .catch((error) => {
                console.log('Erro:', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo_login.jpg")} />

            <Text style={styles.loginText}>Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Button
                title="Cadastrar"
                color="#4CAF50"
                onPress={RegistroUsuario}
            />

            <Text style={styles.cadastre_se}>
                Já tem uma conta?
                <Text style={styles.loginLink} 
                onPress={() => navigation.navigate('TelaLogin')}> Faça login</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        padding: 10
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 12
    },
    cadastre_se: {
        color: '#555'
    },
    loginLink: {
        color: '#4CAF50',
        fontWeight: 'bold'
    }
});
