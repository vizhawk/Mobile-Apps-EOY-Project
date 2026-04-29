import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                <Text style={styles.titelTxt}>
                    hw tracker
                </Text>

                <Image
                    style={styles.img1}
                />

                <View style={styles.box1}>
                    <Text style={styles.subTxt}>
                        hw list
                    </Text>

                    <Text>
                        math hw
                    </Text>

                    <Text>
                        english essay
                    </Text>

                    <TouchableHighlight style={styles.btn}>
                        <Text>
                            add hw
                        </Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.box2}>
                    <Text style={styles.subTxt}>
                        add hw
                    </Text>

                    <TextInput
                        style={styles.inpt}
                        value={"type hw"}
                    />

                    <TextInput
                        style={styles.inpt}
                        value={"class"}
                    />

                    <TouchableHighlight style={styles.btn}>
                        <Text>
                            save
                        </Text>
                    </TouchableHighlight>
                </View>

                <Image
                    style={styles.img2}
                />

                <View style={styles.box3}>
                    <Text style={styles.subTxt}>
                        done hw
                    </Text>

                    <Text>
                        science notes
                    </Text>

                    <TouchableHighlight style={styles.btn}>
                        <Text>
                            back
                        </Text>
                    </TouchableHighlight>
                </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'lightblue',
    },

    titelTxt: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
    },

    subTxt: {
        fontSize: 18,
        marginBottom: 10,
    },

    box1: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
    },

    box2: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
    },

    box3: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
    },

    btn: {
        backgroundColor: 'blue',
        marginTop: 10,
        padding: 8,
        alignItems: 'center',
    },

    inpt: {
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
    },

    img1: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        backgroundColor: 'gray',
    },

    img2: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        backgroundColor: 'gray',
    },
});
