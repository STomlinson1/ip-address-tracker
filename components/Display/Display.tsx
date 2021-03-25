import s from './Display.module.scss';

const Display: React.FC = () => {
	return (
		<div className={s.display}>
			<div className={s.container}>
				<h1>Data Display</h1>
			</div>
		</div>
	);
};

export default Display;
