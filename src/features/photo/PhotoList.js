import React from "react";
import {StyleSheet, View, Image, Text, FlatList, Dimensions} from "react-native";
import {connect} from 'react-redux';
import Touchable from 'react-native-platform-touchable';

const LIST_NUM_COLUMNS_PORTRAIT = 3;
const LIST_NUM_COLUMNS_LANDSCAPE = 5;

class PhotoList extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Album\'s photo list')
        };
    };

    state = {
        viewDimension: 0,
        numColumns: LIST_NUM_COLUMNS_PORTRAIT
    };

    constructor(props) {
        super(props);

        const {albums, selectedAlbumId} = props;
        this.selectedAlbum = albums.find(item => item.album.id === selectedAlbumId).album.photos || [];
    }

    render() {
        const {navigation} = this.props;
        const {viewDimension, numColumns} = this.state;

        const numPhotos = navigation.getParam("numPhotos", 0);

        return (
            <View style={styles.background} onLayout={this._onLayout}>
                <View style={styles.subHeader}>
                    <Text style={styles.subHeaderText}><Text
                        style={styles.subHeaderTextSpecial}>Album:</Text> {numPhotos} photos</Text>
                </View>
                <FlatList key={numColumns} style={styles.list} renderItem={this._renderItem} numColumns={numColumns}
                          data={this.selectedAlbum}
                          getItemLayout={(data, index) => ({length: viewDimension, offset: 0, index})}/>
            </View>
        )
    }

    _onLayout = () => {
        const {width, height} = Dimensions.get('window');
        const numColumns = width > height ? LIST_NUM_COLUMNS_LANDSCAPE : LIST_NUM_COLUMNS_PORTRAIT;
        this.setState({
            viewDimension: width / numColumns,
            numColumns
        });
    };

    _renderItem = ({item: {photo}}) => {
        const {navigation} = this.props;
        const {viewDimension} = this.state;

        return (
            <Touchable onPress={() => {
                navigation.navigate("PhotoDetails", {photo});
            }}>
                <View style={[styles.imageContainer, {width: viewDimension, height: viewDimension}]}>
                    <Image key={photo.id} style={styles.image} source={{uri: photo.thumbnailUrl}}/>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    subHeader: {
        backgroundColor: "white",
        elevation: 2,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    subHeaderText: {
        fontSize: 16,
        color: "black"
    },
    subHeaderTextSpecial: {
        fontWeight: "bold"
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
    }
});

function mapStateToProps(state) {
    return {
        albums: state.galleryReducer.gallery,
        selectedAlbumId: state.galleryReducer.selectedAlbumId
    }
}

export default connect(mapStateToProps, null)(PhotoList);