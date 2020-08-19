import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth"
import GLOBALS from "./../GLOBALS"
import { CommonActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => { // props içinden sayfa içinde yönlendirme yapabilmek için navigation'ı alıyoruz
  const [email, setEmail] = useState(""); // kullanıcın metin kutusuna gireceği email değerini tutar
  const [password, setPassword] = useState(""); // kullanıcın metin kutusuna gireceği password değerini tutar

  useEffect(() => { // ekran yüklendiğinde çalışacak metot
    auth() // firabase'in auth modülü
      .onAuthStateChanged(user => { // auth durumu değiştiğinde çalışacak metot
        if (null === user) {
          return; // kullanıcı null ise hiçbir şey yapma
        }

        // kullanıcı varsa burası çalıaşcaktır
        GLOBALS.user.id = user.uid; // kulanıcı kimliğini global değişkene ata
        GLOBALS.user.email = user.email; // kulanıcı email adresini global değişkene ata

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
  }, []);

  const login = () => { // login metodu
    auth()
      .signInWithEmailAndPassword(email, password) // Kullanıcının girdiği email ve password ile auth modülünün giriş yapan metodunu çağırdık.
      // Giriş başarılı olursa yukarıda tanımladığımız metot çalışacak
      .catch(error => Alert.alert("Hata", error.toString())) // giriş başarısız olursa ekranda hatayı göster
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

      <View style={{ marginTop: 20 }}>{/* yukardan 20px boşluk */}
        <Button title="Giriş Yap"
          disabled={(email === "" || password === "")} // email ve password boş ise buton tıklanamaz (disabled) olur
          onPress={login} // tıklandığında login metodunu çağır
        />
      </View>
      <View style={{ marginTop: 20 }}>{/* yukardan 20px boşluk */}
        <Button title="Kayıt Ol" onPress={() => navigation.navigate("Kayıt Ol")} />{/* tıklandığında Kayıt Ol ekranına yönlendiren buton */}
      </View>
    </View>
  )
}

export default LoginScreen;