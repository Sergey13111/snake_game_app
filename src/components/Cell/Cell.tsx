import styles from './Cell.module.css';

type classCell = {
	classCell: string | '';
};

const Cell: React.FC<classCell> = ({ classCell }) => {
	return <div className={`${styles.cell} ${classCell && styles[classCell]}`}></div>;
};

export default Cell;
