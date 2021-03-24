import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';

import { Header, Map } from '../components';

const DEFAULT_CENTER: LatLngExpression = [ 38.907132, -77.036546 ];

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
			<Map center={DEFAULT_CENTER} />
		</Fragment>
	);
};

export default Home;
