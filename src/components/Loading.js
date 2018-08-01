import React from "react";
import {StyleSheet, ActivityIndicator, Animated} from "react-native";

const styles = StyleSheet.create({
    base: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});

class Loading extends React.Component {

    static defaultProps = {
        size: "large",
        color: "#F44336",
        delay: 550,
        delayAtMount: true
    };

    state = {
        animOpacity: new Animated.Value(0.01)
    };

    componentDidMount() {
        const {delay, delayAtMount} = this.props;
        const {animOpacity} = this.state;

        if (delayAtMount) {
            Animated.timing(animOpacity, {
                toValue: 1,
                duration: 380,
                delay,
                useNativeDriver: true
            }).start();
        } else {
            animOpacity.setValue(1);
        }
    }

    render() {
        const {style, size, color} = this.props;
        const {animOpacity} = this.state;

        const animation = {
            opacity: animOpacity
        };

        return (
            <Animated.View style={[styles.base, style, animation]}>
                <ActivityIndicator size={size} color={color}/>
            </Animated.View>
        );
    }
}

export default Loading;