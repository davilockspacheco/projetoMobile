import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CardProduct from './cardProducts';
import { db } from '../controller';
import { collection, getDocs } from "firebase/firestore"; 

export default function Product() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const querySnapshot = await getDocs(collection(db, 'produtos'));
                const lista = [];
                querySnapshot.forEach((doc) => {
                    lista.push({ id: doc.id, ...doc.data() });
                });
                setProdutos(lista);
            } catch (error) {
                console.log('Erro ao buscar o produto', error);
            }
        }
        carregarProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>ATLETAS</Text>
                <FlatList 
                    data={produtos}
                    renderItem={({ item }) => (
                        <CardProduct 
                            nome={item.nome} 
                            preco={item.preco}
                            imagem={item.imagem}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5bc07',
        paddingTop: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    
});
