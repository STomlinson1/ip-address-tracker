import s from './Display.module.scss';
import { Data } from '../../types';

const Display: React.FC<Data> = ({ ip, isp, location }) => {
	const { city, region, postalCode, timezone } = location;
	return (
		<main className={s.display}>
			<div className={s.container}>
				<article className={s.card}>
					<p className={s.label}>ip address</p>
					<p className={s.text}>{ip}</p>
				</article>
				<div className={s.divider} />
				<article className={s.card}>
					<p className={s.label}>location</p>
					<p className={s.text}>
						{city}, {region} {postalCode}
					</p>
				</article>
				<div className={s.divider} />
				<article className={s.card}>
					<p className={s.label}>timezone</p>
					<p className={s.text}>{timezone}</p>
				</article>
				<div className={s.divider} />
				<article className={s.card}>
					<p className={s.label}>isp</p>
					<p className={s.text}> {isp} </p>
				</article>
			</div>
		</main>
	);
};

export default Display;
