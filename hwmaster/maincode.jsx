import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { registerRootComponent } from 'expo';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {

    state = {
        homePageDisplay: 'block',
        donePageDisplay: 'none',
        progressPageDisplay: 'none',
    }

    handleHomePagePress = () => this.setState({
        homePageDisplay: 'block',
        donePageDisplay: 'none',
        progressPageDisplay: 'none',
    });

    handleDonePagePress = () => this.setState({
        homePageDisplay: 'none',
        donePageDisplay: 'block',
        progressPageDisplay: 'none',
    });

    handleProgressPagePress = () => this.setState({
        homePageDisplay: 'none',
        donePageDisplay: 'none',
        progressPageDisplay: 'block',
    });

    render() {
        return (
            <View>




                <View style={{ display: this.state.homePageDisplay }}>
                    <View style={styles.container}>

                        <ScrollView>

                            <Text style={styles.titelTxt}>
                                HWMaster
                            </Text>

                            <Image
                                style={styles.img1}
                            />

                            <View style={styles.box1}>
                                <Text style={styles.subTxt}>
                                    hw list
                                </Text>

                                <Text style={styles.hwItem}>
                                    math hw
                                </Text>

                                <Text style={styles.hwItem}>
                                    english essay
                                </Text>

                                <TouchableHighlight style={styles.btn}>
                                    <Text style={styles.btnTxt}>
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
                                    placeholder="type hw"
                                />

                                <TextInput
                                    style={styles.inpt}
                                    placeholder="class"
                                />

                                <TouchableHighlight style={styles.btn}>
                                    <Text style={styles.btnTxt}>
                                        save
                                    </Text>
                                </TouchableHighlight>
                            </View>

                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleHomePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    home
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleDonePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    done
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleProgressPagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    progress
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>




                <View style={{ display: this.state.donePageDisplay }}>
                    <View style={styles.container}>

                        <ScrollView>

                            <Text style={styles.titelTxt}>
                                done hw
                            </Text>

                            <View style={styles.box1}>
                                <Text style={styles.subTxt}>
                                    completed
                                </Text>

                                <Text style={styles.hwItem}>
                                    science notes
                                </Text>

                                <Text style={styles.hwItem}>
                                    history reading
                                </Text>
                            </View>

                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleHomePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    home
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleDonePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    done
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleProgressPagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    progress
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>




                <View style={{ display: this.state.progressPageDisplay }}>
                    <View style={styles.container}>

                        <ScrollView>

                            <Text style={styles.titelTxt}>
                                progress
                            </Text>

                            <View style={styles.box1}>
                                <Text style={styles.subTxt}>
                                    overall
                                </Text>

                                <Text style={styles.hwItem}>
                                    2 of 4 done
                                </Text>

                                <View style={styles.progressBarBg}>
                                    <View style={styles.progressBarFill} />
                                </View>
                            </View>

                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleHomePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    home
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleDonePagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    done
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleProgressPagePress}
                            >
                                <Text style={styles.tabTxt}>
                                    progress
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>




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
        marginBottom: 10,
    },

    subTxt: {
        fontSize: 18,
        marginBottom: 10,
    },

    hwItem: {
        fontSize: 15,
        marginBottom: 6,
        marginLeft: 5,
    },

    box1: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
        borderRadius: 6,
    },

    box2: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
        borderRadius: 6,
    },

    btn: {
        backgroundColor: 'blue',
        marginTop: 10,
        padding: 8,
        alignItems: 'center',
        borderRadius: 4,
    },

    btnTxt: {
        color: 'white',
    },

    inpt: {
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        borderRadius: 4,
    },

    img1: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        backgroundColor: 'gray',
        marginBottom: 10,
    },

    progressBarBg: {
        backgroundColor: 'lightgray',
        height: 16,
        borderRadius: 8,
        marginTop: 10,
    },

    progressBarFill: {
        backgroundColor: 'blue',
        height: 16,
        width: '50%',
        borderRadius: 8,
    },

    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        height: 55,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
    },
});
registerRootComponent(App);