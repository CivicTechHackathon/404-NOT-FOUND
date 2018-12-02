import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class StartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1 }}
        >
          <Image
            style={{ height: 100, width: 130 }}
            source={require('../../assets/images.jpg')}
          />
          <Text
            style={{ fontSize: 35, fontWeight: "bold", textAlign: "center", color: "#1b3815" }}
          >
            Trash To Cash
        </Text>

        </View>
        <Button
          title={'LoginUser'}
          style={styles.input}
          onPress={() => this.props.navigation.navigate("Login")}
          buttonStyle={styles.button}

        />
        <Button
          title={'LoginVendor'}
          style={styles.input}
          onPress={() => this.props.navigation.navigate("LoginVendor")}
          buttonStyle={styles.button}

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
  button: {
    // fontSize: 15,
    // color: "#1b3815",
    // width: width*0.8,
    height: 50,
    backgroundColor: "green",
    borderRadius: 27,
    // padding: "0 35px 0 35px",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 35,
    paddingRight: 35,
    // borderStyle: "none",
    maxWidth: 400,
    // maxWidth: 400,
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
