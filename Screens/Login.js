import { View, StyleSheet, Text, Image, TextInput, Button } from "react-native-web";
import { auth } from "../controller";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarUsuario = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                navigation.navigate('HomeTab');
            })
            .catch((error) => {
                console.log('Erro ao logar: ', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo_login.jpg")} />

            <Text style={styles.loginText}>Login</Text>

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

            <Text style={styles.txtsenha}>Esqueceu sua senha?</Text>

            <Button
                title="Login"
                color="#4CAF50"
                onPress={VerificarUsuario}
            />

            <Text style={styles.cadastre_se}>
                Não tem uma conta? 
                <Text style={styles.cadastroLink} onPress={() => navigation.navigate('TelaCadastro')}> Cadastre-se</Text>
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
    txtsenha: {
        color: '#4CAF50',
        marginBottom: 10,
        marginTop: -5
    },
    cadastre_se: {
        color: '#555'
    },
    cadastroLink: {
        color: '#4CAF50',
        fontWeight: 'bold'
    }
});
