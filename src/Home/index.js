import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Connector from "../../lib/Connector";
import { ErrorAlert } from "../../lib/ErrorAlert";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editType, setEditType] = useState(false);
  const [textItem, setTextItem] = useState("");
  const [itemId, setItemId] = useState(null);

  const [data, setData] = useState([]);


  useEffect(() => {

    _getList();

  }, []);


  const _setItem = () => {

    if (textItem !== "") {

      Connector().post("user/todo/add", {
        title: textItem,
      }).then(({ data }) => {

        _getList();
        setModalVisible(false);

      }).catch((e) => {


        ErrorAlert(e);

      }).finally(() => {
        setLoading(false);
      });

    } else {

      Alert.alert("Uyarı", "Başlık boş bırakılamaz");

    }

  };


  const _editItem = () => {

    if (itemId !== null) {

      if (textItem !== "") {

        Connector().post("user/todo/edit", {
          title: textItem,
          id: itemId,
        }).then(({ data }) => {

          Alert.alert('Durum',data.message);

          _getList();
          setModalVisible(false);

        }).catch((e) => {

          ErrorAlert(e);

        }).finally(() => {
          setLoading(false);
        });

      } else {

        Alert.alert("Uyarı", "Başlık boş bırakılamaz");

      }

    } else {
      Alert.alert("Hata", "Id Bulunamadı");

    }

  };


  const _deleteItem = (id) => {


    Connector().post("user/todo/delete", {
      id,
    }).then(({ data }) => {

      _getList();

    }).catch((e) => {


      ErrorAlert(e);

    }).finally(() => {
      setLoading(false);
    });


  };


  const _getList = () => {

    setLoading(true);

    Connector().get("user/todo/list").then(({ data }) => {


      setData(data.result);

    }).catch((e) => {


      ErrorAlert(e);

    }).finally(() => {
      setLoading(false);
    });

  };


  return (
    <>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Image source={require("../../assets/img/close.png")} style={styles.closeIcon} />
            </TouchableOpacity>

            <Text style={styles.itemTitle}>{editType ? "Öğeyi Düzenle" : "Yeni Madde Gir"}</Text>
            <TextInput value={textItem} autoCapitalize={"none"} keyboardType={"email-address"}
                       onChangeText={(text) => setTextItem(text)} style={styles.input} placeholder={"Başlık"} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              if (editType) {
                _editItem();
              } else {
                _setItem();
              }
            }} style={styles.btn}>
              <Text style={styles.btnText}>{editType ? "Düzenlemeyi Kaydet" : "Yeni Madde Ekle"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.container}>

          <Text style={styles.homeTitle}>To-Do List</Text>


          {!loading && data.length === 0 &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
              <Text style={{ fontSize: 17 }}>Liste öğesi Bulunamadı</Text>
            </View>
          }

          {loading &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          }

          {!loading &&
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <View key={"todo-" + item.id} style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                  <View style={styles.listItem}>
                    <Text>{item.title}</Text>

                    <TouchableOpacity activeOpacity={0.8} style={styles.editBtn} onPress={() => {
                      setEditType(true);
                      setModalVisible(true);
                      setTextItem(item.title);
                      setItemId(item.id);
                    }}>
                      <Image source={require("../../assets/img/editing.png")} style={styles.editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                        "Uyarı",
                        "Öğeyi silmek istediğinize emin misiniz?",
                        [
                          {
                            text: "Geri dön",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "Sil", onPress: () => _deleteItem(item.id) },
                        ],
                      );

                    }} activeOpacity={0.8} style={styles.deleteBtn}>
                      <Image source={require("../../assets/img/delete.png")} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          }


          <View style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setEditType(false);
              setModalVisible(true);
              setTextItem("");
              setItemId(null);
            }} style={styles.btn}>
              <Text style={styles.btnText}>Yeni Madde Ekle</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </>

  );
};


const styles = StyleSheet.create({


  container: {
    flex: 1,
    paddingBottom: 110,
  },

  homeTitle: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },

  btn: {
    height: 60,
    borderRadius: 6,
    backgroundColor: "#4f51ee",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  btnText: {
    color: "#fff",

  },

  input: {
    height: 60,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 20,
    paddingRight:20,
    marginTop: 20,
  },


  editBtn: {
    width: 26,
    height: 26,
    borderRadius: 26,
    backgroundColor: "#f3d041",
    position: "absolute",
    right: 50,
    top: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    paddingLeft:20,
    paddingRight:75,
    paddingVertical: 20,
    borderRadius: 4,
    shadowColor: "#000",
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  editIcon: {
    width: 12,
    height: 12,
  },

  deleteIcon: {
    width: 12.3,
    height: 12.3,
  },

  deleteBtn: {
    width: 26,
    height: 26,
    borderRadius: 26,
    backgroundColor: "#fd2c2c",
    position: "absolute",
    right: 15,
    top: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    position: "absolute",
    left: 0,
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,

  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  itemTitle: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 35,
    height: 35,
    backgroundColor: "#b6b5b5",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  closeIcon: {
    width: 10,
    height: 10,

  },

});


export default Home;
