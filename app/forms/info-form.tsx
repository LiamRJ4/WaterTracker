import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function InfoForm() {
    const [name, setName] = useState(""); 
    const [goal, setGoal] = useState(""); 
    const router = useRouter();

    const handleSubmit = async () => {
        if (!name.trim()) {
          Alert.alert("Please enter your name");
          return; 
        }
        if (!goal.trim() || isNaN(Number(goal)) || Number(goal) <= 0) {
          Alert.alert("Please enter valid goal");
          return;
        }
    
        try {
          await AsyncStorage.setItem("userName", name);
          await AsyncStorage.setItem("userGoal", goal);
    
          router.replace("./home"); // Navigate home
        } catch (e) {
          console.error("Error saving data", e);
        }
      };

      return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Info Submission
            </Text>

            <TextInput style={styles.input} 
            placeholder="Enter your name..."
            value={name}
            onChangeText={setName}>

            </TextInput>

            <TextInput style={styles.input}
            placeholder="Enter your goal (ml)..."
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}>
            
            </TextInput>
            <Button title="Save" onPress={handleSubmit}/>
        </View>
        
      );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20, 
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 20,
    }, 
    input: {
        width: '100%', 
        borderWidth: 1, 
        borderColor: '#94a3b8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#fff",
        },
    }
);
