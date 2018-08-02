import React from "react";
import {StyleSheet, View, Image, Text, FlatList, Dimensions} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Touchable from 'react-native-platform-touchable';

import * as actions from "../../actions";
import Loading from "./../../components/Loading";

const LIST_NUM_COLUMNS_PORTRAIT = 2;
const LIST_NUM_COLUMNS_LANDSCAPE = 3;

class AlbumList extends React.Component {
    static navigationOptions = {
        title: 'Gallery App',
    };

    state = {
        width: 0,
        numColumns: LIST_NUM_COLUMNS_PORTRAIT
    };

    componentDidMount() {
        this.props.getGalleryData();
    }

    render() {
        const {numColumns} = this.state;
        const {albums, loading} = this.props;

        return (
            <View style={styles.background} onLayout={this._onLayout}>
                {loading && <Loading/>}
                <FlatList key={numColumns} style={styles.list} renderItem={this._renderItem} numColumns={numColumns}
                          data={albums}/>
            </View>
        )
    }

    _onLayout = () => {
        const {width, height} = Dimensions.get('window');
        this.setState({
            width,
            numColumns: width > height ? LIST_NUM_COLUMNS_LANDSCAPE : LIST_NUM_COLUMNS_PORTRAIT
        });
    };

    _renderItem = ({item: {album: {id, title, photos}}}) => {
        const {navigation} = this.props;
        const {width, numColumns} = this.state;
        const viewDimension = width / numColumns;

        return (
            <Touchable onPress={() => {
                this.props.selectAlbum(id);
                navigation.navigate("PhotoList", {title, numPhotos: photos.length});
            }}>
                <View>
                    <View style={[styles.imageContainer, {width: viewDimension, height: viewDimension}]}>
                        <Image key={id} style={styles.image} source={{uri: photos[0].photo.thumbnailUrl}}/>
                    </View>
                    <Text style={[styles.label, {width: viewDimension}]} numberOfLines={1}
                          ellipsizeMode={"tail"}>{title}</Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    list: {
        flex: 1,
        padding: 2
    },
    imageContainer: {
        padding: 2
    },
    image: {
        flex: 1
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        paddingBottom: 8,
        paddingHorizontal: 4
    }
});

function mapStateToProps(state, props) {
    return {
        loading: state.galleryReducer.loading,
        albums: state.galleryReducer.gallery
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.galleryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);