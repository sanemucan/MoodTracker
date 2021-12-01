import React, {useCallback} from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation } from "react-native";
import { theme } from '../theme';
import { MoodOptionWithTSType} from '../types';
import { format } from 'date-fns';
import { useAppContext } from '../App.provider';
import { PanGestureHandler } from "react-native-gesture-handler";
import Reanimated, { 
    useAnimatedGestureHandler, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    runOnJS } from 'react-native-reanimated';

type MoodItemRowProps = {
    item: MoodOptionWithTSType
}

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
    const appContext = useAppContext()
    const offset = useSharedValue(0)
    const maxOffset = 80

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value}]
    }))

    const handleDelete = useCallback(
        ()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            appContext.handleDelete(item)
        }, []
    )

    const deleteWithDelay = useCallback(
        ()=> {
            setTimeout(() => {
                handleDelete();
            }, 500);
        }, [handleDelete])

    const onGestureEvent = useAnimatedGestureHandler({
        onActive: event => {
            offset.value = Math.floor(event.translationX)
        },
        onEnd: (event) => {
            if (Math.abs(event.translationX) > maxOffset) {
                offset.value = withTiming(1000)
                runOnJS(deleteWithDelay)()
            } else {
                offset.value = withTiming(0)
            }
        }
    }, [])


    return(
    <PanGestureHandler minDeltaX={1} minDeltaY={100} onGestureEvent={onGestureEvent}>
        <Reanimated.View style={[styles.moodContainer, animatedStyle]}>
            <View style={styles.emojiAndDesc}>
                <Text style={styles.emojiText}>{item.mood.emoji}</Text>
                <Text style={styles.descText}>{item.mood.description}</Text>
            </View>
                <Text style={styles.dateText}>{format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}</Text>
                <Pressable onPress={handleDelete}><Text style={styles.deleteText}>Delete</Text></Pressable>
        </Reanimated.View>
    </PanGestureHandler>)
}

const styles = StyleSheet.create({
    moodContainer: {
        backgroundColor: theme.colorWhite,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    emojiAndDesc: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emojiText: {
        marginRight: 10,
        fontSize: 40,
    },
    descText: {
        fontSize: 18,
        color: theme.colorPurple,
        fontFamily: theme.fontFamilyBold
    },
    deleteText: {
        fontFamily: theme.fontFamilyBold,
        color: theme.colorBlue
    },
    dateText: {
        color: theme.colorLavender,
        fontFamily: theme.fontFamilyLight
    }
});