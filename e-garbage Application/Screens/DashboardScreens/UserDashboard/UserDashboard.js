import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Text } from 'react-native';

export default class UserDashboardScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  

  render() {
    return (
      <View style={styles.container}>   
        <Text>User Dashboard</Text>
        <Button
          title={'Add Items To Recycle'}
          style={styles.input}
          onPress={()=> this.props.navigation.navigate("UserForm")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
