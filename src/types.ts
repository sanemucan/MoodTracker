export type MoodOptionType =  { 
    emoji: string;
    description: string;
}

export type MoodOptionWithTSType = {
    mood: MoodOptionType,
    timestamp: number
}