import s from './Header.module.scss';
import { useState } from 'react';

interface HeaderProps {
	title: string;
	placeholder: string;
}

const Header: React.FC<HeaderProps> = ({ title, placeholder }) => {
	return (
		<header className={s.header}>
			<h1 className={s.heading}>{title}</h1>
			<div className={s.container}>
				<input className={s.input} type="text" placeholder={placeholder} />
				<button className={s.button}>s</button>
			</div>
		</header>
	);
};

export default Header;
