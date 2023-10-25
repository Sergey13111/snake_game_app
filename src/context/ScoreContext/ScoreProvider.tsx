import { PropsWithChildren, useState } from 'react';

import ScoreContext from './ScoreContext';

const ScoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [score, setScore] = useState<number>(0);

	return <ScoreContext.Provider value={[score, setScore]}>{children}</ScoreContext.Provider>;
};

export default ScoreProvider;
