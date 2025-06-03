import { View, Text, Image, StyleSheet } from "react-native";

export default function CardProduct({ nome, preco, imagem }) {
    return (
        <View style={styles.card}>
            <Image style={styles.img} source={{ uri: imagem }} />
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.txtItem}>R${preco.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginBottom: 10,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    preco: {
        fontSize: 16,
        color: '#d6001c',
        textAlign: 'center',
        marginTop: 5,
    },
});
