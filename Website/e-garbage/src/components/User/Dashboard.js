import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

class Dashboard extends Component {
  constructor(props) {
    super(props);

      this.state = {
        data: []
      }

      this.addData = this.addData.bind(this);
  }

  componentWillMount(){
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              db.collection("trash").where("userid", "==", user.uid).onSnapshot(querySnapshot =>{
                  if (querySnapshot.docs.length > 0) {
                      
                    querySnapshot.docs.forEach(res =>{
                        var a = { title: res.data().title, description: res.data().description, latitude: res.data().latitude, longitude: res.data().longitude, pic: res.data().pic };
                        this.setState({
                            data: [...this.state.data,a]
                        })
                    })
                  }
              })
          } else {
              this.props.history.push("/");
          }
      });
  }


  addData() {
    this.props.history.push("/User/Form");
  }

  render() {
      const {data} = this.state;
debugger
    return (
      <div>
        {data.length ? <center>
            {data.map(item =>(
                <div className="jumbotron border border-primary mt-5" id="jum">
                        <img src={item.pic} width="200"/>
                        <h2>Title: {item.title}</h2>
                        <h3>Description: {item.description}</h3>
                </div>
                )
            )}
        </center>
        :
        <center><h1>No trash history</h1></center>
        }
        <center>
          <button className="btn btn-primary" onClick={this.addData} id="add">
            Add Items
          </button>
        </center>
      </div>
    );
  }
}

export default Dashboard;