import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Connector from "../../lib/Connector";
import { ErrorAlert } from "../../lib/ErrorAlert";
import { set_token, set_user } from "../../data/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { goHome } from "../../router/getRouter";


const Login = (props) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const setLogin = () => {

    if (email !== "" && password !== "") {

      setLoading(true);


      Connector().post("user/login", {
        email,
        password,
      }).then(async ({ data }) => {


        await AsyncStorage.setItem("_token", data.token);

        set_token(data.token);
        set_user(data.result);

        goHome();

      }).catch((e) => {

        ErrorAlert(e);

      })
        .finally(() => {
          setLoading(false);
        });


    } else {

      Alert.alert("Uyarı", "Tüm Alanları Doldurunuz!");

    }

  };


  return (
    <View style={styles.container}>

      <Text style={styles.loginText}>Giriş Yap</Text>


      <TextInput autoCapitalize={"none"} keyboardType={"email-address"} onChangeText={(text) => setEmail(text)}
                 style={styles.input} placeholder={"E-mail"} />

      <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry
                 placeholder={"Şifre"} />

      <TouchableOpacity onPress={() => setLogin()} activeOpacity={0.8} style={styles.btn}>
        <Text style={styles.btnText}>{loading ? "Giriş Yapılıyor..." : "Giriş Yap"} </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({


  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  loginText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 160,
    marginBottom: 20,
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
    marginTop: 20,
  },


});


export default Login;
