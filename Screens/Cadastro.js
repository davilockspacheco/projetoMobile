import { View, StyleSheet, Text, Image, TextInput, Button, TouchableOpacity } from "react-native-web";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../controller";
import { Feather } from '@expo/vector-icons';

export default function Cadastro({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

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
            <Image style={styles.logo} source={require("../assets/logo_loginCriciuma.jpg")} />

            <Text style={styles.loginText}>Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.inputSenhaContainer}>
                <TextInput
                    style={styles.inputSenha}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity
                    style={styles.botaoOlho}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                    accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                    {mostrarSenha ? (
                        <Feather name="eye-off" size={24} color="#666" />
                    ) : (
                        <Feather name="eye" size={24} color="#666" />
                    )}
                </TouchableOpacity>
            </View>

            <Button
                title="Cadastrar"
                color="#000000"
                onPress={RegistroUsuario}
            />

            <Text style={styles.cadastre_se}>
                Já tem uma conta?
                <Text style={styles.loginLink} onPress={() => navigation.navigate('TelaLogin')}> Faça login</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5bc07',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 140,
        height: 140,
        borderRadius: 30,
        marginBottom: 30,
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
        width: '90%',
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 18,
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
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
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
        height: 55,
        paddingHorizontal: 18,
        fontSize: 17,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    botaoOlho: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cadastre_se: {
        color: '#fff',
        marginTop: 25,
        fontSize: 15,
        fontWeight: '500',
    },
    loginLink: {
        color: '#fff',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
