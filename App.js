import "react-native-gesture-handler";

import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddExpensesScreen from "./src/screens/AddExpensesScreen";

import { createTable } from "./src/database/database";

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="AddExpense"
          component={AddExpensesScreen}
          options={{
            title: "Novo Gasto",
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}