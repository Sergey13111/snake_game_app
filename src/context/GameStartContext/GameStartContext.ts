import { createContext } from 'react';

import { GameStartContextType } from '../../models/GameStartContextType';

const GameStartContext = createContext<GameStartContextType>([false, () => {}]);

export default GameStartContext;
