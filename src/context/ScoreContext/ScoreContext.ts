import { createContext } from 'react';
import { ScoreType } from '../../models/ScoreType';

const ScoreContext = createContext<ScoreType>([0, () => {}]);

export default ScoreContext;
