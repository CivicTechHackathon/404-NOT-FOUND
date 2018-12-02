import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
// import background from "../../images";

class Home extends Component {
    constructor(props) {
        super(props);

        this.user = this.user.bind(this);
        this.vender = this.vender.bind(this);
    }

    componentWillMount() {
        const db = firebase.firestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push("/User/Dashboard");
            }
            else {
                console.log('no user');
            }
        });

    }

    user(){
        this.props.history.push("/User/SignUp");
    }

    vender() {
        this.props.history.push("/Vender/SignUp");
    }


    render(){

        return <div>
            {/* <img src={pic} /> */}
            <center><br />
              <h1 className="mt-5">Welcome to Trash To Cash</h1>
            </center>
            <div className="row">
              <div className="col-6">
                <center>
                  <button className="btn btn-primary" id="btn_user" onClick={this.user}>
                    LogIn as User
                  </button>
                </center>
              </div>
              <div className="col-6">
                <center>
                  <button className="btn btn-primary" id="btn_vender" onClick={this.vender}>
                    LogIn as Vender
                  </button>
                </center>
              </div>
            </div>
          </div>;
    }

}

export default Home;