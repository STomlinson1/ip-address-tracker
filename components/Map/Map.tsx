import { useEffect } from 'react';
import { LatLngExpression, Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import s from './Map.module.scss';

interface MapProps {
	center: LatLngExpression;
}

const ChangeView = ({ center, zoom }) => {
	const map = useMap();
	map.setView(center, zoom);
	return null;
};

const Map: React.FC<MapProps> = ({ center }) => {
	useEffect(() => {
		// @ts-ignore
		delete Icon.Default.prototype._getIconUrl;

		Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	}, []);

	return (
		<MapContainer className={s.map} zoom={16} center={center}>
			<ChangeView center={center} zoom={16} />
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			/>
			<Marker position={center}>
				{/* <Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup> */}
			</Marker>
		</MapContainer>
	);
};

export default Map;
