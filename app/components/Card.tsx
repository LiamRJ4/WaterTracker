import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type WaterCardProps = {
  children: ReactNode;
};

export default function WaterCard({ children }: WaterCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4, // Android shadow
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginTop: 100, 
  },
});