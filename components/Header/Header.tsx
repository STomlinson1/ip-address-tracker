import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Data } from '../../types';

import s from './Header.module.scss';
interface HeaderProps {
	title: string;
	placeholder: string;
	setIpData: Dispatch<SetStateAction<Data>>;
}

const Header: React.FC<HeaderProps> = ({
	title,
	placeholder,
	setIpData,
	children
}) => {
	const [ term, setTerm ] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.get('https://geo.ipify.org/api/v1', {
				params: {
					apiKey: process.env.NEXT_PUBLIC_API_KEY,
					ipAddress: term
				}
			});

			setIpData(response.data as Data);
		} catch (error) {
			// console.log(error);
		}
	};

	return (
		<header className={s.header}>
			<h1 className={s.heading}>{title}</h1>
			<div className={s.container}>
				<form onSubmit={handleSubmit}>
					<input
						className={s.input}
						type="text"
						placeholder={placeholder}
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
					<button type="submit" className={s.button}>
						<Image src="/images/icon-arrow.svg" height={12} width={10} />
					</button>
				</form>
			</div>
			{children}
		</header>
	);
};

export default Header;
