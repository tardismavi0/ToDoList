import React from 'react';
import {Navigation} from 'react-native-navigation';



export const goLogin = (passProps) => Navigation.setRoot({
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'com.app.login',
                        passProps,
                        options: {},
                    },

                },
            ],
            options: {

                topBar: {
                    visible: false,
                    height: 0,
                },

            },
        },
    },
});




export const goHome = (passProps) => Navigation.setRoot({
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'com.app.home',
                        passProps,
                        options: {},
                    },

                },
            ],
            options: {

                topBar: {
                    visible: false,
                    height: 0,
                },

            },
        },
    },
});






