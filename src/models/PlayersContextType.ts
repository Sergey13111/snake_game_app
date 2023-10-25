import { IPlayer } from './IPlayer';

export type PlayersContextType = [IPlayer[], React.Dispatch<React.SetStateAction<IPlayer[]>>];
