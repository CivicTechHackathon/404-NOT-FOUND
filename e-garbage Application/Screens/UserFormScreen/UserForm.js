import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native'
import { MapView, Location, Permissions, Constants } from 'expo';

import MapContainer from '../MapScreens/MapContainer'

export default class UserFormScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
        };
    }

    onLogin() {
        const { title, description } = this.state;

        Alert.alert('Credentials', `${title} + ${description}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Add Items To Recycle</Text>
                <TextInput
                    value={this.state.username}
                    onChangeText={(title) => this.setState({ title })}
                    placeholder={'Title'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(description) => this.setState({ description })}
                    placeholder={'Description'}
                    style={styles.input}
                />
                <Button
                    title={'Recycle Your Garbage'}
                    style={styles.input}
                    onPress={()=> this.props.navigation.navigate("Map")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    map: {
        flex: 1
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});
