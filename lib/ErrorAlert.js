import React from 'react';
import _ from "lodash";
import { Alert } from "react-native";


export  const ErrorAlert = (e) => {

  let message = "";

  if (e?.response?.data?.errors) {
    const errors = e.response.data.errors;

     _.map(errors, (item) => message += `${item.param} ${item.msg}`);


  } else {
    message = e?.response?.data?.message ?? e.message;

  }

 Alert.alert('Hata',message)

};


