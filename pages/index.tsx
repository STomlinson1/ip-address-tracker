import { GetServerSideProps } from 'next';
import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';

import { Display, Header, Map } from '../components';
import { Data } from '../types';

const DEFAULT_CENTER: LatLngExpression = [ 38.907132, -77.036546 ];

interface HomeProps {
	data: Data | undefined;
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

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await axios.get('https://geo.ipify.org/api/v1', {
					params: {
						apiKey: process.env.NEXT_PUBLIC_API_KEY,
						ipAddress: ''
					}
				});

				setIpData(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		getUserData();
	}, []);

	const latLng: LatLngExpression = [ ipData.location.lat, ipData.location.lng ];

	return (
		<Fragment>
			<Head>
				<title>IP Address Tracker</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header
				title="IP Address Tracker"
				placeholder="Search for any IP address"
				setIpData={setIpData}
			>
				<Display ip={ipData.ip} location={ipData.location} isp={ipData.isp} />
			</Header>
			<Map center={latLng || DEFAULT_CENTER} />
		</Fragment>
	);
};

export default Home;
