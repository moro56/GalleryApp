import React from "react";
import {StatusBar, StyleSheet, View, Text} from "react-native";
import Image from 'react-native-transformable-image';

class PhotoDetails extends React.Component {
  static navigationOptions = {
    title: 'Photo',
    headerStyle: {
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  };

  constructor(props) {
    super(props);

    const {navigation} = props;
    this.photo = navigation.getParam('photo', {});
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar backgroundColor="black" animated={true}/>
        <Image style={styles.image} source={{uri: this.photo.url}}/>
        <Text style={styles.label}>{this.photo.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    marginTop: -56
  },
  image: {
    flex: 1
  },
  label: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 15,
    padding: 16
  }
});

export default PhotoDetails;