import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
export default class MapContainer extends React.Component {
	state = {
		locationResult: null,
		coords: { latitude: 0, longitude: 0 },
		latitude: null,
		longitude: null
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(position => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				error: null,
				coords: position.coords
			});
		});
	}

	render() {
		return (
			<MapView
				style={{
					flex: 1
				}}
				region={{
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
			>
				<MapView.Marker coordinate={this.state.coords} title="Your Location" />
			</MapView>
		);
	}
}
