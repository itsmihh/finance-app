import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getExpenses } from "../database/database";

export default function HomeScreen({ navigation }) {

    const [gastos, setGastos] = useState([]);

    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");

    useFocusEffect(
        useCallback(() => {
            loadExpenses();
        }, [])
    );

    function loadExpenses() {
        const data = getExpenses();
        setGastos(data);
    }

    const gastosFiltrados = gastos.filter((item) => {

        if (!mes && !ano) {
            return true;
        }

        const data = item.data.split("-");

        const anoItem = data[0];
        const mesItem = data[1];

        return (
            (mes ? mesItem === mes : true) &&
            (ano ? anoItem === ano : true)
        );
    });

    const total = gastosFiltrados.reduce(
        (acc, item) => acc + item.valor,
        0
    );

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Finanças</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Total gasto</Text>
                <Text style={styles.value}>R$ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddExpense")}
            >
                <Text style={styles.addButtonText}>
                    + Novo Gasto
                </Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Mês (05)"
                style={styles.input}
                value={mes}
                onChangeText={setMes}
            />

            <TextInput
                placeholder="Ano (2026)"
                style={styles.input}
                value={ano}
                onChangeText={setAno}
            />

            <FlatList
                data={gastosFiltrados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.expenseTitle}>
                            {item.descricao}
                        </Text>

                        <Text style={styles.expenseCategory}>
                            {item.categoria}
                        </Text>

                        <Text>
                            R${item.valor}
                        </Text>

                        <Text>
                            {item.data}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fbf6f2",
        padding: 20,
        paddingTop: 30,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        color: "#777",
    },

    value: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
        color: "#132436",
    },

    expenseItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },

    expenseTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },

    expenseCategory: {
        color: "#9381ff",
        fontWeight: 500
    },

    addButton: {
        backgroundColor: "#9c90fc",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});