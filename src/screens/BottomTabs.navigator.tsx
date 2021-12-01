import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/Icons';
import { theme } from '../theme';
import { Analytics } from './Analytics.screen';
import { History } from './History.screen';
import { Home } from './Home.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
    return (
        <BottomTabs.Navigator screenOptions={({ route }) => ({
            headerTitleStyle: {
                fontFamily: theme.fontFamilyRegular
            },
            tabBarActiveTintColor: theme.colorBlue,
            tabBarInactiveTintColor: theme.colorGrey,
            tabBarShowLabel: false,
            tabBarIcon: ({size, color}) => {
                switch(route.name) {
                    case 'Home':
                        return <HomeIcon size={size} color={color}/>
                    case 'History':
                        return <HistoryIcon size={size} color={color}/>
                    case 'Analytics':
                        return <AnalyticsIcon size={size} color={color}/>
                    default:
                        return <Text>{route.name}</Text>
                }
                
            }
        })}>
            <BottomTabs.Screen name="Home" component={Home} options={{ title: 'Today\'s Mood' }} />
            <BottomTabs.Screen name="History" component={History} options={{ title: "Past Moods" }}/>
            <BottomTabs.Screen name="Analytics" component={Analytics} options={{ title: 'Fancy Charts' }}/>
        </BottomTabs.Navigator>
    )
}