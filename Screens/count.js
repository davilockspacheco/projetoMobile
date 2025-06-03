import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Count() {
    const [contador, setContador] = useState(0);

    function Aumentar() {
        setContador(contador + 1);
    }

    function Diminuir() {
        if (contador > 0) {
            setContador(contador - 1);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu contador</Text>
            <Text style={styles.numero}>{contador}</Text>

            <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botao} onPress={Aumentar}>
                    <Text style={styles.botaoTexto}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={Diminuir}>
                    <Text style={styles.botaoTexto}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    numero: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#d6001c',
        marginBottom: 30,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    botao: {
        backgroundColor: '#d6001c',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});
