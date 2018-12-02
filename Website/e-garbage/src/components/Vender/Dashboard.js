/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
    Marker, 
    DirectionsRenderer
} from "react-google-maps";

const provider = new firebase.auth.FacebookAuthProvider();


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.updateCoords = this.updateCoords.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  componentWillMount() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setPosition();
        db.collection("trash").onSnapshot(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(res => {
              var a = {
                title: res.data().title,
                description: res.data().description,
                latitude: res.data().latitude,
                longitude: res.data().longitude,
                pic: res.data().pic
              };
              this.setState({
                data: [...this.state.data, a]
              });
            });
          }
        });
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

  getDirections(index) {
    const { latitude, longitude } = this.state;
      var resLat = this.state.data[index].latitude;
      var resLon = this.state.data[index].longitude;
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(latitude, longitude),
        destination: new google.maps.LatLng(resLat, resLon),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          alert("Sorry! Can't calculate directions!");
        }
      }
    );
  }

  render() {
    const { data, coords, directions } = this.state;
    return (
      <div>
        {data.length ? (
          <center>
            {data.map((item, index) => (
              <div className="jumbotron border border-primary mt-5" id="jum">
                <img src={item.pic} width="300" />
                <h2>Title: {item.title}</h2>
                <h3>Description: {item.description}</h3>
                <div className="container mt-3">
                  <MyMapComponent
                    coords={coords}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyANkUfLBovPhWMJohvoCTbFbo3Rd7uPLSo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `350px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                  />
                  <center>
                    <button
                      className="btn text-white mt-5 btn-primary"
                      onClick={() => this.getDirections(index)}
                    >
                      Get Directions
                    </button>
                    <button
                      className="btn text-white mt-5 ml-4 btn-primary"
                      
                    >
                      Claim
                    </button>
                  </center>
                </div>
              </div>
            ))}
          </center>
        ) : (
          <center>
            <h1>No trash history</h1>
          </center>
        )}
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >


        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))



export default Dashboard;