import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const provider = new firebase.auth.FacebookAuthProvider();

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
      uid: ""
    };

    this.insertData = this.insertData.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.setState({uid: user.uid})
        this.setPosition();
      } else {
        this.props.history.push("/");
      }
    });
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);

      this.setState({
        coords: position.coords,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { longitude, latitude }, longitude, latitude });
    console.log(latitude, longitude);
  }


  insertData(){
      const db = firebase.firestore();
      const storageRef = firebase.storage().ref();
        const {uid,longitude,latitude} = this.state;
      var file = document.getElementById("image1").files[0];
      var fileName1 = 'images/trash_' + Math.random().toString().substring(2, 6) + '.jpg'
      var ImageRef1 = storageRef.child(fileName1);
      var title = document.getElementById("title").value;
      var description = document.getElementById("description").value;
      var a = this;

      if (!file || !description || !title) {
        swal("Select all fields", "", "warning");
      } 
      else {
        ImageRef1.put(file).then(function(snap) {
          ImageRef1.getDownloadURL().then(function(url) {
            db.collection("trash").add({ 
                pic: url, title, description, longitude, latitude ,userid: uid
            })
              .then(() => {
                  swal('Data inserted successful', '', 'success');
                  a.props.history.push('/User/Dashboard');
              });
          });
        });
      }
  }
  

  render() {
      const { coords } = this.state;
    return <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center" id="profile">
                Items
              </h2>
            </div>
            <div className="card-body">
              <label>Title:</label>
              <input type="text" className="form-control" id="title" />
              <label className="mt-5">Description:</label>
              <input type="text" className="form-control" id="description" />
              <label className="mt-5">Image:</label>
              <input type="file" className="form-control" id="image1" />
              <label className="mt-5">Direction:</label>
              <div className="container mt-3">
                {coords && <MyMapComponent isMarkerShown googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyANkUfLBovPhWMJohvoCTbFbo3Rd7uPLSo&v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `50%` }} />} containerElement={<div style={{ height: `50vh` }} />} mapElement={<div style={{ height: `100%` }} />} coords={coords} updateCoords={this.updateCoords} />}
                <button className="btn btn-primary mt-4" id="btn_color" onClick={this.insertData}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>;
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                    props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />}
    </GoogleMap>
))


export default SignUp;
