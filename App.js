import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from './screens/LoginScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import NoteScreen from './screens/NoteScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator(); // Navigation stack'i oluştur

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>{/* Ekranlar burada tanımlanır. Uygulama açıldığında ilk tanımlanan ekran çalışır. */}
        <Stack.Screen name="Giriş Yap" component={LoginScreen} />
        <Stack.Screen name="Kayıt Ol" component={RegisterScreen} />
        <Stack.Screen name="Anasayfa" component={HomeScreen} />
        <Stack.Screen name="Not" component={NoteScreen} />
        <Stack.Screen name="Yeni Not Ekle" component={NewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;