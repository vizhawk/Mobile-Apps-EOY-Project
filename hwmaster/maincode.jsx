import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { registerRootComponent } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {

    state = {
        upcomingPageDisplay: 'block',
        completedPageDisplay: 'none',
        addPageDisplay: 'none',
        dueDate: new Date(),
        assignmentName: '',
        className: '',
        assignments: [],
        completedAssignments: [],
        showHomeScreen: true,
    }

    handleEnterApp = () => {
        this.setState({ showHomeScreen: false });
    };

    handleUpcomingPagePress = () => this.setState({
        upcomingPageDisplay: 'block',
        completedPageDisplay: 'none',
        addPageDisplay: 'none',
    });

    handleCompletedPagePress = () => this.setState({
        upcomingPageDisplay: 'none',
        completedPageDisplay: 'block',
        addPageDisplay: 'none',
    });

    handleAddPagePress = () => this.setState({
        upcomingPageDisplay: 'none',
        completedPageDisplay: 'none',
        addPageDisplay: 'block',
    });

    saveAssignments = () => {
        let newAssignment = {
            id: Date.now(),
            name: this.state.assignmentName,
            class: this.state.className,
            dueDate: this.state.dueDate,
        };
        this.setState({
            assignments: [...this.state.assignments, newAssignment],
            assignmentName: '',
            className: '',
            dueDate: new Date(),
        });
    };

    getDaysUntilDue = (dueDate) => {
        let now = new Date();
        let due = new Date(dueDate);
        let milsecondDifference = Math.round((due - now));
        let difference = Math.round((due - now)/1000/60/60/24);
        if (milsecondDifference < 0) return 'Overdue';
        if (difference === 0) return 'Due Today';
        if (difference === 1) return 'Due Tomorrow';
        return 'Due in ' + difference + ' days';
    };

    getDueColor = (dueDate) => {
        let now = new Date();
        let due = new Date(dueDate);
        let milsecondDifference = Math.round((due - now));
        let difference = Math.round((due - now)/1000/60/60/24);
        if (milsecondDifference < 0) return 'red';
        if (difference === 0) return 'orange';
        if (difference === 1) return 'green';
        return 'lightgreen';
    };

    completedAssignment = (id) => {
        let completedAssignment = this.state.assignments.find(a => a.id === id);
        this.setState({
            assignments: this.state.assignments.filter(a => a.id !== id),
            completedAssignments: [...this.state.completedAssignments, completedAssignment]
        });
    };

    deleteAssignmentUpcoming = (id) => {
        this.setState({
            assignments: this.state.assignments.filter(a => a.id !== id)
        });
    };

    deleteAssignmentCompleted = (id) => {
        this.setState({
            completedAssignments: this.state.completedAssignments.filter(a => a.id !== id)
        });
    };


    render() {

        {/*This is the Home Screen --------------------------------------------------------------------------------------*/}

        if (this.state.showHomeScreen) {
            return (
                <View style={styles.homeScreen}>
                    
                    <Image
                        source={require('../assets/lightbulb.png')}
                        style={{ height: deviceHeight/5, width: deviceHeight/5 }}
                    />

                    <Text style={styles.appTitle}>
                        HW Master
                    </Text>

                    <Text style={styles.subtitle}>
                        Stay organized. Stay ahead.
                    </Text>

                    <TouchableHighlight
                        style={styles.enterButton}
                        underlayColor='darkblue'
                        onPress={this.handleEnterApp}
                    >
                        <Text style={styles.enterButtonText}>
                            Enter
                        </Text>
                    </TouchableHighlight>

                </View>
            );
        }

        return (
            <View>

                {/*This is the Upcoming Assignments Tab --------------------------------------------------------------------------------------*/}

                <View style={{ display: this.state.upcomingPageDisplay }}>
                    <View style={styles.container}>

                        <Text style={styles.titleText}>
                            Upcoming
                        </Text>

                        <TouchableHighlight
                            style={styles.addAssignmentButton}
                            underlayColor='darkblue'
                            onPress={this.handleAddPagePress}
                        >
                            <Text style={styles.addAssignmentButtonText}>
                                + Add Assignment
                            </Text>
                        </TouchableHighlight>

                        <ScrollView>
                            {this.state.assignments.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((assignment, index) => (
                                <View key={assignment.id} style={styles.assignmentCard}>
                                    <Text style={styles.assignmentName}>
                                        {assignment.name}
                                    </Text>
                                    
                                    <Text style={styles.assignmentClass}>
                                        {assignment.class}
                                    </Text>
                                    
                                    <Text style={styles.assignmentDue}>
                                        {assignment.dueDate.toLocaleString()}
                                    </Text>

                                    <Text style={[styles.assignmentDue, {color: this.getDueColor(assignment.dueDate), fontWeight: 'bold'}]}>
                                        {this.getDaysUntilDue(assignment.dueDate)}
                                    </Text>

                                    <View style={styles.buttonRow}>
                                        <TouchableHighlight
                                            style={styles.completeButton}
                                            underlayColor='darkgreen'
                                            onPress={() => this.completedAssignment(assignment.id)}
                                        >
                                            <Text style={styles.buttonText}>
                                                Complete ✅
                                            </Text>
                                        </TouchableHighlight>

                                        <TouchableHighlight
                                            style={styles.deleteButton}
                                            underlayColor='darkred'
                                            onPress={() => this.deleteAssignmentUpcoming(assignment.id)}
                                        >
                                            <Text style={styles.buttonText}>
                                                Delete X
                                            </Text>
                                        </TouchableHighlight>
                                    </View>

                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleUpcomingPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Upcoming
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleCompletedPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Completed
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleAddPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Add
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>

                {/*This is the Completed Assignments Tab --------------------------------------------------------------------------------------*/}

                <View style={{ display: this.state.completedPageDisplay }}>
                    <View style={styles.container}>

                        <Text style={styles.titleText}>
                            Completed
                        </Text>

                        <ScrollView>
                            {this.state.completedAssignments.map((assignment, index) => (
                                <View key={assignment.id} style={styles.assignmentCard}>
                                    <Text style={styles.assignmentName}>
                                        {assignment.name}
                                    </Text>
                                    
                                    <Text style={styles.assignmentClass}>
                                        {assignment.class}
                                    </Text>

                                    <Text style={[styles.assignmentDue, {color: 'lightgreen', fontWeight: 'bold'}]}>
                                        {this.getDaysUntilDue(assignment.dueDate)}
                                    </Text>

                                    <TouchableHighlight
                                        style={styles.deleteButton}
                                        underlayColor='darkred'
                                        onPress={() => this.deleteAssignmentCompleted(assignment.id)}
                                    >
                                        <Text style={styles.buttonText}>
                                            X
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleUpcomingPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Upcoming
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleCompletedPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Completed
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleAddPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Add
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>

                {/*This is the Add Tab ------------------------------------------------------------------------------------------------------*/}

                <View style={{ display: this.state.addPageDisplay }}>
                    <View style={styles.container}>

                        <ScrollView>

                            <Text style={styles.titleText}>
                                Add
                            </Text>

                            <Text style={styles.labelText}>
                                Assignment Name
                            </Text>

                            <TextInput 
                                style={styles.inputBox}
                                placeholder="Assignment Name"
                                value={this.state.assignmentName}
                                onChangeText={text => this.setState({ assignmentName: text })}
                            />

                            <Text style={styles.labelText}>
                                Which Class
                            </Text>

                            <TextInput 
                                style={styles.inputBox}
                                placeholder="Class Name"
                                value={this.state.className}
                                onChangeText={text => this.setState({ className: text })}
                            />

                            <Text style={styles.labelText}>
                                Due Date (Select)
                            </Text>

                            <DateTimePicker
                                value={this.state.dueDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => this.setState({ dueDate: date })}
                            />

                            <Text style={styles.labelText}>
                                Due Date Time (Select)
                            </Text>

                            <DateTimePicker
                                value={this.state.dueDate}
                                mode="time"
                                display="default"
                                onChange={(event, date) => this.setState({ dueDate: date })}
                            />

                            <TouchableHighlight
                                style={styles.saveButton}
                                underlayColor='darkblue'
                                onPress={this.saveAssignments}
                            >
                                <Text style={styles.saveButtonText}>
                                    Save
                                </Text>
                            </TouchableHighlight>

                        </ScrollView>

                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleUpcomingPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Upcoming
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleCompletedPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Completed
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.tab}
                                onPress={this.handleAddPagePress}
                            >
                                <Text style={styles.tabText}>
                                    Add
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
        backgroundColor: 'lightgray',
    },
    titleText: {
        fontSize: deviceHeight/30,
        textAlign: 'center',
        marginTop: deviceHeight/20,
        marginBottom: deviceHeight/60,
        fontWeight: 'bold',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        height: deviceHeight/10,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: deviceHeight/60,
        fontWeight: '600',
        color: 'black',
    },
    inputBox: {
        backgroundColor: 'white',
        margin: deviceWidth/20,
        padding: deviceHeight/80,
        borderRadius: deviceWidth/30,
        borderWidth: 1,
        borderColor: 'lightgray',
        fontSize: deviceHeight * 14/600,
    },
    labelText: {
        fontSize: deviceHeight * 14/600,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: deviceWidth/20,
        marginTop: deviceHeight/40,
    },
    saveButton: {
        backgroundColor: 'blue',
        margin: deviceWidth/20,
        padding: deviceHeight/60,
        borderRadius: deviceWidth/30,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: deviceHeight * 14/600,
    },
    assignmentCard: {
        backgroundColor: 'white',
        margin: deviceWidth/20,
        padding: deviceHeight/60,
        borderRadius: deviceWidth/30,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    assignmentName: {
        fontSize: deviceHeight * 16/600,
        fontWeight: 'bold',
        marginBottom: deviceHeight/100,
    },
    assignmentClass: {
        fontSize: deviceHeight * 14/600,
        color: 'gray',
        marginBottom: deviceHeight/100,
    },
    assignmentDue: {
        fontSize: deviceHeight * 14/600,
        color: 'gray',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: deviceHeight/60,
        justifyContent: 'space-between',
    },
    completeButton: {
        backgroundColor: 'green',
        padding: deviceHeight/80,
        borderRadius: deviceWidth/40,
        width: '45%',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: deviceHeight/80,
        borderRadius: deviceWidth/40,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: deviceHeight * 10/600,
    },
    homeScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    appTitle: {
        fontSize: deviceHeight / 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: deviceHeight / 40,
        color: 'gray',
        marginBottom: 30,
    },
    enterButton: {
        backgroundColor: 'blue',
        padding: deviceHeight / 60,
        borderRadius: 20,
        width: deviceWidth / 2,
        alignItems: 'center',
    },
    enterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addAssignmentButton: {
        backgroundColor: 'blue',
        margin: deviceWidth/20,
        padding: deviceHeight/60,
        borderRadius: deviceWidth/30,
        alignItems: 'center',
    },
    addAssignmentButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: deviceHeight * 14/600,
    },

});
registerRootComponent(App);