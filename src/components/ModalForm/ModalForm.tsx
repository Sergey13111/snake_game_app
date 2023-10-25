import { useContext, useState } from 'react';
import styles from './ModalForm.module.css';
import PlayersContext from '../../context/PlayersContext/PlayersContext';
import GameStartContext from '../../context/GameStartContext/GameStartContext';
import { ModalFormType } from '../../models/ModalFormType';
import ScoreContext from '../../context/ScoreContext/ScoreContext';
const ModalForm: React.FC<ModalFormType> = ({ closeModal }) => {
	const [, setIsGameStart] = useContext(GameStartContext);
	const [players, setPlayers] = useContext(PlayersContext);
	const lastPlayer = players[players.length - 1]; // последний добавленый игрок
	const defaultLevel = lastPlayer ? lastPlayer.level : 'medium';
	const defaultName = lastPlayer ? lastPlayer.name : '';
	const [textInput, setTextInput] = useState<string>(defaultName);
	const [level, setLevel] = useState<string>(defaultLevel);
	const [score] = useContext(ScoreContext);

	const addPlayer = (textInput: string) => {
		if (textInput.trim() !== '') {
			const newPlayer = {
				id: Math.random().toString().substring(2, 10),
				name: textInput,
				level: level,
				levels: {
					[level]: { score: score },
				},
			};
			setPlayers([...players, newPlayer]);
		} else {
			alert('Enter your name...');
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(event.currentTarget.value);
	};

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setLevel(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addPlayer(textInput);
		setIsGameStart(true);
		closeModal();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}>
			<label>Name:</label>
			<input
				value={textInput}
				type='text'
				onChange={handleChange}
				placeholder='Enter your name'
				className={styles.textInput}
				required
			/>
			<div className={styles.selectWrapper}>
				<label>Level:</label>
				<select
					value={level}
					onChange={handleSelectChange}>
					<option value='easy'>easy</option>
					<option value='medium'>medium</option>
					<option value='difficult'>difficult</option>
				</select>
			</div>

			<button
				type='submit'
				className={`btn ${styles.buttonAdd}`}>
				Start
			</button>
		</form>
	);
};

export default ModalForm;
