import React from "react";
import {View, Text} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../../actions";

class AlbumList extends React.Component {

    componentDidMount() {
        this.props.getGalleryData();
    }

    render() {
        const {albums} = this.props;

        return (
            <View>
                <Text>Album List - {albums.length} albums</Text>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        albums: state.galleryReducer.gallery
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.galleryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);