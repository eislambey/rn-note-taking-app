import React, { useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { CommonActions } from "@react-navigation/native";
import GLOBALS from "../GLOBALS";

const NewNoteScreen = ({ navigation }) => { // props içinden sayfa içinde yönlendirme yapabilmek için navigation'ı alıyoruz
  const [title, setTitle] = useState(""); // not başlığunu tutan state
  const [content, setContent] = useState(""); // not içeriğini tutan state

  const save = () => { // notu firebase'e kaydeden metot
    firestore() // firebase'in firestore modülü
      .collection("notes") // notes koleksiyonunu seç
      .add({
        user_id: GLOBALS.user.id,
        title,
        content
      }) // notu ekle
      .then(() => { // not eklenirse bu metot çalışır
        // not eklendikten sonra gezinme geçmişini temizle ve ana ekrana yönlendir
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: "Anasayfa" },
            ],
          })
        );
      })
      .catch(error => { // hata olması durumunda bu metot çalışır
        Alert.alert("Hata", error.toString()); // hatayı ekranda göster
      })
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>Not Başlığı</Text>
      <TextInput
        style={{ borderColor: "lightgray", borderWidth: 1, backgroundColor: "white" }}
        onChangeText={setTitle} // metin kutusu içeriği değiştiğinde setTitle metodunu çağr ve title state'ini güncelle.
      />

      <Text style={{ marginTop: 10 }}>Not İçeriği</Text>
      <TextInput
        multiline // çok satırlı giriş yapılabilir
        style={{ borderColor: "lightgray", borderWidth: 1, backgroundColor: "white", height: 200, textAlignVertical: "top" }}
        onChangeText={setContent} // metin kutusu içeriği değiştiğinde setContent metodunu çağr ve content state'ini güncelle.
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Notu Kaydet" // butonun üstünde yazacak yazı
          disabled={(title === "" || content === "")} // title veya content boş ise buton tıklanamaz (disabled) olsun
          onPress={save} // save metodunu çağır.
        />
      </View>
    </View>
  );
}

export default NewNoteScreen;