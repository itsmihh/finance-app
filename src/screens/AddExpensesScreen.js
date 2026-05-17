import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { addExpense } from "../database/database";
import { Picker } from "@react-native-picker/picker";


export default function AddExpensesScreen({ navigation }) {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");

    function handleSave() {
        addExpense(descricao, Number(valor), categoria, data);

        alert("Adicionado!");

        setDescricao("");
        setValor("");
        setCategoria("");
        setData("");

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novo Gasto</Text>

            <TextInput
                placeholder="Descrição"
                style={styles.input}
                value={descricao}
                onChangeText={setDescricao}
            />

            <TextInput
                placeholder="Valor"
                style={styles.input}
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
            />

            <Picker
                selectedValue={categoria}
                onValueChange={(itemValue) =>
                    setCategoria(itemValue)
                }
                style={styles.input}
            >

                <Picker.Item
                    label="Selecione uma categoria"
                    value=""
                />

                <Picker.Item
                    label="Alimentação"
                    value="Alimentação"
                />

                <Picker.Item
                    label="Transporte"
                    value="Transporte"
                />

                <Picker.Item
                    label="Lazer"
                    value="Lazer"
                />

                <Picker.Item
                    label="Saúde"
                    value="Saúde"
                />

                <Picker.Item
                    label="Outros"
                    value="Outros"
                />

            </Picker>

            <TextInput
                placeholder="Data (2026-05-16)"
                style={styles.input}
                value={data}
                onChangeText={setData}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#fbf6f2",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },

    button: {
        backgroundColor: "#9c90fc",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});