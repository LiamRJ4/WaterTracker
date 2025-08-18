import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type ProgressBarProps = {
    progress: number; 
    color?: string;
  };

export default function ProgressBar ({ progress, color = '#38bdf8'}: ProgressBarProps) {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: progress, 
            duration: 500, 
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const width = anim.interpolate({
        inputRange: [0,1], 
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.background}>
            <Animated.View style={[styles.fill, {width, backgroundColor: color}]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        height: 24, 
        backgroundColor: '#e0f2fe', 
        borderRadius: 12, 
        overflow: 'hidden', 
    },
    fill: {
        height: '100%', 
    },
});