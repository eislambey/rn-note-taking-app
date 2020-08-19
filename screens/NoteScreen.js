import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { CommonActions } from "@react-navigation/native";

// props içinden sayfa içinde yönlendirme yapabilmek için navigation'ı ve
// hangi nota tıklandığını öğrenmek için route'u alıyoruz
const NoteScreen = ({ navigation, route }) => {
  const [note, setNote] = useState({}); // seçilen notu tutacak state

  useEffect(() => { // ekran hazır olduğunda çalışacak metot
    firestore(). // firebase'in firestore modülü
      collection("notes") // notes koleksiyonunu seç
      .doc(route.params.note) // tıklanan notu seç
      .get() // getir
      .then(snapshot => {
        setNote(snapshot.data()); // note state'ini güncelle
      })
      .catch(error => Alert.alert("Hata", error.toString())); // hata varsa mesajı göster

  }, []);

  const deleteNote = () => { // notu silen metot
    firestore() // firebase'in firestore modülü
      .collection("notes")// notes koleksiyonunu seç
      .doc(route.params.note) // tıklanan notu seç
      .delete() // sil
      .then(() => {
        // navigation geçmişini temizle ve ana ekrana yönlendir
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: "Anasayfa" },
            ],
          })
        );
      })
      .catch(error => Alert.alert("Hata", error.toString())) // hata varsa mesajı göster
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, backgroundColor: "white" }}>{note.title}</Text>

      <Text style={{ marginVertical: 10, padding: 10, backgroundColor: "white" }}>{note.content}</Text>

      <Button
        title="Notu Sil" // buton üstünde yazacak yazı
        color="red" // buton rengi
        onPress={deleteNote} // tıklandığında deleteNote metodunu çağır
      />
    </View>
  );
}

export default NoteScreen;