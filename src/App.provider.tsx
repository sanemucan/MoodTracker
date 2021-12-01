import React, {useState, useCallback, useEffect} from 'react';
import { MoodOptionWithTSType, MoodOptionType } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
    moodList: MoodOptionWithTSType[],
    handleSelect: (mood: MoodOptionType) => void,
    handleDelete: (mood: MoodOptionWithTSType) => void
};

const defaultValue = {
    moodList: [],
    handleSelect: () => {},
    handleDelete: () => {}
};

type AppData = {
    moods: MoodOptionWithTSType[]
}

const storageKey = 'mood-app-data';

const setAppData = async (newData: AppData): Promise<void> => {
    try{
        await AsyncStorage.setItem(storageKey, JSON.stringify(newData))
    } catch {}
}

const getAppData = async() : Promise<AppData | null> => {
    try {
        const data = await AsyncStorage.getItem(storageKey)
        if(data) {
            return JSON.parse(data)
        }
        return null;
    } catch {
        return null;
    }
}

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
    const [moodList, setMoodList] = useState<MoodOptionWithTSType[]>([])
    const handleSelect = useCallback(
        (mood: MoodOptionType) => {
            setMoodList(current => {
                const newVal = [...current, {mood, timestamp: Date.now()}]
                setAppData({ moods: newVal})

                return newVal;
            })
        },
        [],
    );

    const handleDelete = useCallback(
        (mood: MoodOptionWithTSType)=> {
            setMoodList(current => {
                const newVal = current.filter(c => c.timestamp !== mood.timestamp)
                setAppData({ moods: newVal})
                return newVal
            })
        }, []
        )

    useEffect(() => {
        const getDataFromStorage = async () => {
            const data = await getAppData()
            if(data){
                setMoodList(data.moods)
            }
        }
        getDataFromStorage()
    }, [])


  return (
    <AppContext.Provider value={{ moodList, handleSelect, handleDelete }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext)