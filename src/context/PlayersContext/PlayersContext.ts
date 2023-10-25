import { createContext } from 'react';
import { PlayersContextType } from '../../models/PlayersContextType';

const PlayersContext = createContext<PlayersContextType>([[], () => {}]);

export default PlayersContext;
