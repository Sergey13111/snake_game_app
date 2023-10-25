import { PropsWithChildren } from 'react';
import PlayersProvider from './PlayersContext/PlayerProvider';
import GameStartProvider from './GameStartContext/GameStartProvider';
import ScoreProvider from './ScoreContext/ScoreProvider';

const MasterProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<GameStartProvider>
			<ScoreProvider>
				<PlayersProvider>{children}</PlayersProvider>
			</ScoreProvider>
		</GameStartProvider>
	);
};

export default MasterProvider;
