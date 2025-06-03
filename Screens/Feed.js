import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function Feed() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>
                Sinal verde pro lanche: hoje o clima é McDonald's! 🍔
            </Text>

            <Text style={styles.subtitulo}>
                Navegue no site com muito sabor e diversão!
            </Text>

            <Image 
                style={styles.imagem} 
                source={require("../assets/feed1.jpg")} 
            />

            <Text style={styles.paragrafo}>
                🎉 Aqui o menu é outro, mas a experiência é tão boa quanto seu combo favorito!
                {"\n"}📱 Nosso site está de cara nova com um toque especial do McDonald's:
                cores vibrantes, ícones divertidos e aquele jeitinho irresistível que você já conhece.
                {"\n"}🍦 Então pega sua batata (ou melhor, seu celular) e vem curtir essa vibe deliciosa com a gente!
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d6001c',
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
    },
    imagem: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    paragrafo: {
        fontSize: 16,
        color: '#333',
    },
});
