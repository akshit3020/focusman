import { Andika_400Regular } from '@expo-google-fonts/andika';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
   let [fontsLoaded] = useFonts({
    Andika_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Stack screenOptions={{headerShown: false}} />;
}
 