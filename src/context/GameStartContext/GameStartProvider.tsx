import { PropsWithChildren, useState } from 'react';

import GameStartContext from './GameStartContext';

const GameStartProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [isGameStart, setIsGameStart] = useState<boolean>(false);

	return (
		<GameStartContext.Provider value={[isGameStart, setIsGameStart]}>
			{children}
		</GameStartContext.Provider>
	);
};

export default GameStartProvider;
