import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from "./store/index";
import AlbumList from "./features/album/AlbumList";

type
    Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <AlbumList/>
            </Provider>
        );
    }
}
