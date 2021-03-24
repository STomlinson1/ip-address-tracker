import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import s from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
	let mapClassName = s.map;

	if (className) {
		mapClassName = `${mapClassName} ${className}`;
	}

	useEffect(() => {
		// @ts-ignore
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	}, []);

	return (
		<MapContainer className={mapClassName} {...rest}>
			{children(ReactLeaflet)}
		</MapContainer>
	);
};

export default Map;
