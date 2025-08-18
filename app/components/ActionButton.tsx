import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ActionButtonProps = {
    title: string; 
    onPress: () => void; 
    color?: string; 
}; 

export default function ActionButton({ title, onPress, color = "#38bdf8"}: ActionButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderRadius: 12, 
        margin: 5,
    }, 
    text: {
        color: "#fff", 
        fontWeight: "bold", 
        fontSize: 16, 
        textAlign: "center",
    },
});