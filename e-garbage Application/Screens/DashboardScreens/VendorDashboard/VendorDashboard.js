import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Text} from 'react-native';

export default class VendorDashboardScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  

  render() {
    return (
      <View style={styles.container}>
      <Text>Vendor Dashboard</Text>      
        <Button
          title={'View Available Kabbar'}
          style={styles.input}
          onPress={()=> this.props.navigation.navigate("Login")}
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
