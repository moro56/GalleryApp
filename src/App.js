import React, {Component} from 'react';
import {View, StatusBar} from "react-native";
import {Provider} from 'react-redux';
import {createStackNavigator} from 'react-navigation';

import store from "./store/index";
import AlbumList from "./features/album/AlbumList";

const AppNavigator = createStackNavigator({
    AlbumList: {screen: AlbumList}
}, {
    initialRouteName: "AlbumList",
    navigationOptions: {
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: '#F44336'
        }
    }
});

type
    Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#D32F2F"/>
                <Provider store={store}>
                    <AppNavigator/>
                </Provider>
            </View>
        );
    }
}
