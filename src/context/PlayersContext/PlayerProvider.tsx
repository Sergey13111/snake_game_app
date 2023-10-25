import { PropsWithChildren, useEffect, useState } from 'react';
import { IPlayer } from '../../models/IPlayer';
import PlayersContext from './PlayersContext';

const PlayersProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const storedPlayers = localStorage.getItem('players');
	const initialPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];

	const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
	// Загрузка данных из localStorage при монтировании компонента
	useEffect(() => {
		const savedPlayers = localStorage.getItem('players');
		if (savedPlayers) {
			setPlayers(JSON.parse(savedPlayers));
		}
	}, []);

	// Сохранение данных в localStorage при изменении players
	useEffect(() => {
		localStorage.setItem('players', JSON.stringify(players));
	}, [players]);

	return (
		<PlayersContext.Provider value={[players, setPlayers]}>{children}</PlayersContext.Provider>
	);
};

export default PlayersProvider;
