import { PropsWithChildren, useState } from 'react';
import { IPlayer } from '../../models/IPlayer';
import PlayersContext from './PlayersContext';

const PlayersProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [players, setPlayers] = useState<IPlayer[]>([]);

	return (
		<PlayersContext.Provider value={[players, setPlayers]}>{children}</PlayersContext.Provider>
	);
};

export default PlayersProvider;
