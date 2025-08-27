import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InfoForm from "./forms/info-form";

export default function Index() {

  const [loading, setLoading] = useState(true);
  const [hasUserInfo, setHasUserInfo] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      const name = await AsyncStorage.getItem("userName"); 
      const goal = await AsyncStorage.getItem("userGoal");

      if (name && goal) {
        setHasUserInfo(true);
        console.log("user has info");
      }
      setLoading(false);
    };
    checkUserInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.background}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!hasUserInfo) {
    return(
    <View style={styles.background}>
      <InfoForm/>
    </View>
    );
  }
  
};

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    backgroundColor: '#e0f7fa',
  } 
});