import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

// const storageRef = firebase.storage().ref();
// const db = firebase.firestore();

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
      uid: "",
      map: false,
      first: true,
      second: false,
      third: false
    };

    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.props.history.push("/Vender/Dashboard");
      } else {
        console.log("no user");
      }
    });
  }

  signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "" || password === "") {
      swal("Fill all the fields", "", "warning");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          swal("SigIn successful", "", "success");
            this.props.history.replace("/Vender/Dashboard");
        })
        .catch(error => {
          swal(error.message, "", "error");
        });
    }
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Vender SignIn</h2>
            </div>
            <div className="card-body">
              <label className="mt-5">Email:</label>
              <input type="text" className="form-control" id="email" />
              <label className="mt-5">Password:</label>
              <input type="password" className="form-control" id="password" />
              <br />
              <button className="btn btn-primary" onClick={this.signIn}>
                SignIn
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}

export default SignUp;
