import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import ActionButton from "./components/ActionButton";

const MAX_WATER = 8;
const STORAGE_KEY_COUNT = 'WATER_COUNT';
const STORAGE_KEY_DATE = 'LAST_DATE';

export default function Index() {

  // Set constants for water count and date

  const [glasses, setGlasses] = useState(0);

  const getToday = () => new Date().toISOString().split('T')[0];

  const progressAnim = useRef(new Animated.Value(0)).current;

  // Load stored data and reset logic for daily use

  useEffect(() => {
    const loadData = async () => {
      const storedCount = await AsyncStorage.getItem(STORAGE_KEY_COUNT);
      const storedDate = await AsyncStorage.getItem(STORAGE_KEY_DATE);
      const today = getToday();
      if (storedDate === today && storedCount != null) {
        setGlasses(parseInt(storedCount, 10));
      } else {

        setGlasses(0);
        await AsyncStorage.setItem(STORAGE_KEY_DATE, today);
        await AsyncStorage.setItem(STORAGE_KEY_COUNT, '0');
      }
    };
    loadData();
  }, []);

  // Store data when it changes

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_COUNT, glasses.toString());
    AsyncStorage.setItem(STORAGE_KEY_DATE, getToday());

    // Animate progress bar

    Animated.timing(progressAnim, {
      toValue: glasses / MAX_WATER, 
      duration: 500, 
      useNativeDriver: false,
    }).start();

  }, [glasses]);

  // Add, remove and reset logic

  const addGlass = () => {
    if (glasses < MAX_WATER) setGlasses(glasses + 1);
  };

  const removeGlass = () => {
    if (glasses > 0) setGlasses(glasses - 1);
  };

  const reset = () => setGlasses(0);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0,1], 
    outputRange: ['0%', '100%'],
  });

  return (
    <View 
    style={styles.container}
    >
      <Text style={styles.title}>Water Tracker!</Text>
      <Text style={styles.counter}>
        {glasses} / {MAX_WATER} glasses
      </Text>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {width: progressWidth}, 
            glasses >= MAX_WATER && { backgroundColor: '#4ade80'},
          ]}
        />

      </View>
      <View style={styles.buttonGroup}>
      <ActionButton color="#0000FF" title="➕ Add" onPress={addGlass} />
      <ActionButton color="#FF0000" title="➖ Remove" onPress={removeGlass} />
      <ActionButton color="#808080" title="Reset" onPress={reset}/>
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
  progressBarBackground: {
    height: 20,
    width: '80%',
    backgroundColor: '#bae6fd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBarFill: {
    height: '100%', 
    backgroundColor: '#38bdf8'
  },
});
