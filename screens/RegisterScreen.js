import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import GLOBALS from "../GLOBALS";
import { CommonActions } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => { // props içinden sayfa içinde yönlendirme yapabilmek için navigation'ı alıyoruz
  const [email, setEmail] = useState(""); // kullanıcın metin kutusuna gireceği email değerini tutar
  const [password, setPassword] = useState(""); // kullanıcın metin kutusuna gireceği password değerini tutar

  const register = () => { // kullanıcı kaydı yapan metot
    auth() // fireabase auth modülü
      .createUserWithEmailAndPassword(email, password) // yeni kullanıcı oluşturan metot
      .then(user => { // kullanıcı oluştuysa bu metot çalışır
        GLOBALS.user.id = user.user.uid; // kullanıcı kimliğini global değişkene ata
        GLOBALS.user.email = user.user.email; // kullanıcı email adresini global değişkene ata

        // navigation geçmişisini sıfırla ve Ansayfa'ya yönlendir
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: "Anasayfa" },
            ],
          })
        );
      })
      .catch(error => Alert.alert("Hata", error.toString())) // hata varsa hata mesajını ekranda göster
  }

  return (
    <View style={{ padding: 10 }}>
      <Text>E-mail</Text>{/* metin kutusu üstüdne görünecek label */}
      <TextInput
        style={{ borderColor: "lightgray", backgroundColor: "white", borderWidth: 1 }}
        onChangeText={setEmail} // metin kutusu içeriği değiştiğinde setEmail metodunu çağr ve email state'ini güncelle.
      />

      <Text style={{ marginTop: 20 }}>Şifre</Text>{/* metin kutusu üstüdne görünecek label */}
      <TextInput
        style={{ borderColor: "lightgray", backgroundColor: "white", borderWidth: 1 }}
        onChangeText={setPassword} // metin kutusu içeriği değiştiğinde setPassword metodunu çağr ve password state'ini güncelle.
        secureTextEntry // şifreninin metin kutusunda ****** şeklinde görünmesi için ekle
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Kayıt Ol"
          disabled={(email === "" || password === "")} // email ya da password boşsa buton tıklanamaz (disabled) olsun
          onPress={register}  // tıklandığında register metodunu çağır
        />
      </View>
    </View>
  )
}

export default RegisterScreen;