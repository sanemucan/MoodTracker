import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodPicker } from '../components/MoodPicker';
import FastImage from 'react-native-fast-image'

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
  const appContext = useAppContext()
//   return (
//     <View style={styles.homeView}>
//         <Image source={{ uri: imageUrl}} style={{ flex: 1 }}/>
//         <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
//             <MoodPicker onSelect={appContext.handleSelect}/>
//         </View>
//     </View>
//   )
return(
    <ImageBackground style={styles.homeView} source={{ uri: imageUrl}}>
        <MoodPicker onSelect={appContext.handleSelect}/>
    </ImageBackground>
)
// return(
//     <View style={styles.homeView}>
//         <FastImage
//             style={{flex: 1}}
//             source={{
//                 uri: imageUrl,
//                 priority: FastImage.priority.normal,
//             }}
//         />  
//         <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
//             <MoodPicker onSelect={appContext.handleSelect}/>
//         </View>
//     </View>
// )
};


const styles = StyleSheet.create({
    homeView: {
        flex: 1,
        justifyContent: 'center',
    }
})