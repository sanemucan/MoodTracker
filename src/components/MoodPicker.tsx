import React, {useState, useCallback} from "react";

import {StyleSheet, Text, View, Pressable, Image } from "react-native";
import { MoodOptionType } from "../types";
import { theme } from "../theme";
import Reanimated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const imageSrc = require('../../assets/butterflies.png')

const moodOptions: MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
  ];

type MoodPickerProps = {
    onSelect: (mood: MoodOptionType) => void;
}

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable)

export const MoodPicker:React.FC<MoodPickerProps> = ({ onSelect }) => {
    const [ selectedMood, setSelectedMood ] = useState<MoodOptionType>()
    const [ hasSelected, setHasSelected ] = useState(false)

    const handleSelect = useCallback(
        () => {
            if(selectedMood) {
                onSelect(selectedMood);
                setSelectedMood(undefined)
                setHasSelected(true)
            }
        },
        [selectedMood, onSelect],
    )

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: selectedMood ? withTiming(1) : withTiming(0.5),
        transform: [{scale: selectedMood ? withTiming(1) : 0.8}]
    }), [selectedMood])

    if(hasSelected) {
        return (<View style={styles.container}>
            <Image source={imageSrc} style={styles.image} resizeMode="contain" />
            <Pressable style={styles.button} onPress={()=> setHasSelected(false)}>
                <Text style={styles.buttonText}>Choose Another</Text>
            </Pressable>
        </View>)
    }

    return (
    <View style={styles.container}>
        <Text style={styles.heading}>How are you right now?</Text>
        <View style={styles.emojiList}>
            {
                moodOptions.map(option => (
                    <View key={option.emoji}>
                        <Pressable 
                            onPress={() => setSelectedMood(option)} 
                            style={[styles.moodItem, selectedMood === option ? styles.selectedMoodItem : undefined]}
                        >
                            <Text key={option.emoji}>{option.emoji}</Text>
                        </Pressable>
                        <Text style={styles.description}>
                            {option.emoji === selectedMood?.emoji ? option.description : ''}
                        </Text>
                    </View>
                ))
            }
        </View>
        <ReanimatedPressable style={[styles.button, buttonStyle]} onPress={handleSelect}>
            <Text style={styles.buttonText}>Choose</Text>
        </ReanimatedPressable>
    </View>)
}

const styles = StyleSheet.create({
    emojiList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
        
    },
    button: {
        alignSelf: 'center',
        borderRadius: 20,
        width: 150,
        backgroundColor: theme.colorPurple,
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: theme.colorWhite,
        fontFamily: theme.fontFamilyBold
    },
    moodItem: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30, 
    },
    selectedMoodItem: {
        backgroundColor: '#454C73',
        borderColor: theme.colorWhite,
        borderWidth: 2
    },
    description: {
        textAlign: 'center',
        color: theme.colorPurple,
        fontFamily: theme.fontFamilyRegular,
        fontSize: 10

    },
    container: {
        borderColor: theme.colorPurple,
        borderRadius: 10,
        borderWidth: 2,
        padding: 20,
        margin: 10,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 250,
    },
    heading: {
        fontFamily: theme.fontFamilyBold,
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: 20,
        color: theme.colorWhite
    },
    image: {
        alignSelf: 'center',
        aspectRatio: 2,
        height: 100,
    }
})