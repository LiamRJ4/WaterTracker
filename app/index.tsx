import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const MAX_WATER = 8;
const STORAGE_KEY = 'WATER_COUNT';

export default function Index() {

  const [glasses, setGlasses] = useState(0);

  useEffect(() => {
    const laodGlasses = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setGlasses(parseInt(stored, 10));
      }
    };
    laodGlasses();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, glasses.toString());
  }, [glasses]);

  const addGlass = () => {
    if (glasses < MAX_WATER) setGlasses(glasses + 1);
  };

  const removeGlass = () => {
    if (glasses > 0) setGlasses(glasses - 1);
  };

  const reset = () => setGlasses(0);

  return (
    <View 
    style={styles.container}
    >
      <Text style={styles.title}>Water Tracker!</Text>
      <Text style={styles.counter}>
        {glasses} / {MAX_WATER} glasses
      </Text>
      <View style={styles.buttonGroup}>
      <Button title="➕ Add" onPress={addGlass} />
      <Button title="➖ Remove" onPress={removeGlass} />
      <Button title="Reset" onPress={reset}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#e0f7fa', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
  }, 
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#0077b6', 
  }, 
  counter: {
    fontSize: 22, 
    marginBottom: 24, 
  }, 
  buttonGroup: {
    flexDirection: 'row', 
    gap: 10, 
  },
});
