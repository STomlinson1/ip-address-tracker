import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { Header, Map } from '../components';

const DEFAULT_CENTER = [ 38.907132, -77.036546 ];

interface HomeProps {
	data: Data | undefined;
}
interface Data {
	ip: string;
	location: {
		country: string;
		region: string;
		city: string;
		lat: number;
		lng: number;
		postalCode: string;
		timezone: string;
		geonameId: number;
	};
	isp: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const response = await axios.get('https://geo.ipify.org/api/v1', {
			params: {
				apiKey: process.env.API_KEY,
				ipAddress: ''
			}
		});

		return {
			props: {
				data: response.data as Data
			}
		};
	} catch (error) {
		return {
			props: {
				data: undefined
			}
		};
	}
};

const Home: React.FC<HomeProps> = ({ data }) => {
	const [ ipData, setIpData ] = useState(data);

	console.log(ipData);

	return (
		<Fragment>
			<Head>
				<title>IP Address Tracker</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header
				title="IP Address Tracker"
				placeholder="Search for any IP address or domain"
			/>
			<Map className center={DEFAULT_CENTER} zoom={16}>
				{({ TileLayer, Marker, Popup }) => (
					<Fragment>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						/>
						<Marker position={DEFAULT_CENTER}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</Fragment>
				)}
			</Map>
		</Fragment>
	);
};

export default Home;
