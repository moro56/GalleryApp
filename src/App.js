import React, {Component} from 'react';
import {View} from "react-native";
import {Provider} from 'react-redux';

import store from "./store/index";

type
    Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <View></View>
            </Provider>
        );
    }
}
