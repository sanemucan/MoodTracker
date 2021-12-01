import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { VictoryPie } from 'victory-native';
import groupBy from 'lodash/groupBy';
import { theme } from '../theme';


export const Analytics: React.FC = () => {
  const appContext = useAppContext()
  console.log(appContext.moodList)

  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View style={styles.container}>
      <Text>Analytics</Text>
      <VictoryPie 
        data={data}
        colorScale={[
          theme.colorBlue,
          theme.colorLavender,
          theme.colorGrey,
          theme.colorPurple,
          theme.colorWhite
        ]}
        />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})