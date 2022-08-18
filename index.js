import { Navigation } from "react-native-navigation";
import Login from "./src/Login";
import Home from "./src/Home";
import Connector from "./lib/Connector";
import { set_token, set_user } from "./data/actions/user";
import { goHome, goLogin } from "./router/getRouter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorAlert } from "./lib/ErrorAlert";


Navigation.registerComponent("com.app.login", () => Login);
Navigation.registerComponent("com.app.home", () => Home);


Navigation.events().registerAppLaunchedListener(async () => {


  let token = await AsyncStorage.getItem("_token");


  if (token !== null) {


    set_token(token);


    Connector().get("user/auth").then(({ data }) => {

      set_user(data.user);
      goHome();

    }).catch(async (e) => {

      await AsyncStorage.removeItem('_token');

      goLogin();

      ErrorAlert(e);

    });

  } else {

    goLogin();

  }


});
