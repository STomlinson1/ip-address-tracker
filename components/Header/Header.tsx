import { useState } from 'react';
import Image from 'next/image';

import s from './Header.module.scss';
interface HeaderProps {
	title: string;
	placeholder: string;
}

const Header: React.FC<HeaderProps> = ({ title, placeholder, children }) => {
	const [ term, setTerm ] = useState('');

	return (
		<header className={s.header}>
			<h1 className={s.heading}>{title}</h1>
			<div className={s.container}>
				<form>
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
