import { createContext } from 'react';
import { PlayersContextType } from '../../models/PlayersContextType';

const storedPlayers = localStorage.getItem('players');
const initialPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];

const PlayersContext = createContext<PlayersContextType>(initialPlayers);

export default PlayersContext;
