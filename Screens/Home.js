import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function Home() {
    return (
        <ScrollView style={styles.container}>
            <Image 
                style={styles.banner}
                source={require("../assets/banner.png")} 
            />

            <Text style={styles.titulo}>Venha conhecer nosso cardápio</Text>

            <Text style={styles.paragrafo}>
                McDonald's Corporation é uma rede multinacional estadunidense de fast food, 
                fundada em 1940 como um restaurante operado por Richard e Maurice McDonald, 
                em San Bernardino, Califórnia, Estados Unidos.
            </Text>

            <Text style={styles.paragrafo}>
                O McDonald's é a maior cadeia de restaurantes de fast food do mundo, servindo mais de 
                69 milhões de clientes diariamente, em mais de 100 países, por meio de 40 mil pontos 
                de venda em 2021.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    banner: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d6001c',
        marginBottom: 15
    },
    paragrafo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    }
});
