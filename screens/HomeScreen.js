import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import GLOBALS from "../GLOBALS";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CommonActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => { // props içinden sayfa içinde yönlendirme yapabilmek için navigation'ı alıyoruz
  const [notes, setNotes] = useState([]); // firebase'de bulunan notların tutulacağı state

  useEffect(() => {
    firestore() // firebase'in firestore modülü
      .collection("notes") // notların kaydedildiği koleksiyon olan `notes` koleksiyonunu seçiyoruz
      .where("user_id", "==", GLOBALS.user.id) // sadece giriş yapan kullanıcıya ait notları filtreledik
      .get() // notları firebase'den aldık
      .then(snapshot => { // notlar geldiğinde elimizde bir snapshot objesi gelir
        const _notes = []; // notların bulunduğu bir array yaratıyoruz

        snapshot.forEach(document => {
          // snapshot içindeki her dokümanı `_notes` dizi değişkenine ekliyoruz
          _notes.push({
            id: document.id, // dokümanın kimliği, navigation sırasında gerekli
            ...document.data(), // spread operator ile data'nın içindeki her şeyi aldık
          });
        })
        setNotes(_notes); // notları geçici değişkenimizden notes state'ine aktarıyoruz
      })
      .catch(error => { // hata durumunda catch içinde tanımlı olan metodumuz çalışır
        Alert.alert("Hata", error.toString()); // `notes` koleksiyonundan notları okuma sırasında oluşan hatayı ekranda göster
      })

  }, []);

  const logout = () => { // çıkış yapma metodu
    auth() // firebase'in auth modülü
      .signOut() // signOut metodu ile çıkış isteği gönderiyoruz.
      .then(() => { // çıkış yapılğında then içindeki metot çalıştırılır
        navigation.dispatch( // navigation.dispatch ile farklı 'Giriş Yap' ekranına yönlendirme yapıyoruz.
          CommonActions.reset({ // yönlendirme yaparken navigation geçmişini temizliyoruz. Bu sayede kullanıcı geri butonunu kullanamayacaktır.
            index: 0,
            routes: [
              { name: "Giriş Yap" },
            ],
          })
        );
      })
      .catch(error => { // hata durumunda catch içinde tanımlı olan metodumuz çalışır
        Alert.alert("Hata", error.toString()); // `notes` koleksiyonundan notları okuma sırasında oluşan hatayı ekranda göster
      })
  }

  return (
    <View style={{ padding: 10 }}>{/* her kenardan 10px boşluk bırakır */}
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "black", marginBottom: 20 }}>
        Hoşgeldiniz, {GLOBALS.user.email}
      </Text>{/* Stil uygulanmış hoşgeldin mesajı */}
      <Button title="Yeni Not Ekle"
        onPress={() => navigation.navigate("Yeni Not Ekle")} />{/* Yeni not ekle butonu, tıklandığında 'Yeni Not Ekle' ekranına yönlendirir*/}
      <View style={{ marginVertical: 20, backgroundColor: "white" }}>{/* not listesinin bulunduğu View */}
        {
          notes.length === 0
            ?
            <Text style={{ backgroundColor: "#eee", borderColor: "#ddd", borderWidth: 1, padding: 20 }}>
              Hiç not yok
              </Text>/* Note sayısı 0 ise "Hiç not yok" yazar */
            :
            notes.map(note => (/* notes değişkenini loop'a al */
              <TouchableOpacity /* her note için bir TouchableOpacity oluştur. TouchableOpacity şekil verilebilir ve tıklanabilir görünüm oluşturur.*/
                key={note.id} /* React.js'de bir loop içindeki her item'ın key prop'u olmak zorunda */
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }} /* stilleri uyguladık */
                onPress={() => navigation.navigate("Not", { note: note.id })} /* tıklandığında not kimliği ile birlikte "Not" ekranına yönlendirir */
              >
                <Text>{note.title}</Text>
              </TouchableOpacity>
            ))
        }
      </View>
      <View style={{ marginTop: 10 }}>{/* Çıkış Yap butonu için yukarından 10px boşluk bıraktık*/}
        <Button color="red" title="Çıkış Yap" onPress={logout} />{/* tıklandığında logout metodunu çalıştıran buton */}
      </View>
    </View>
  );
}

export default HomeScreen;