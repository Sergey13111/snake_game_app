import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import PlayerRating from './components/PlayerRating/PlayerRating';

import ModalGame from './components/ModalGame/ModalGame';

const App: React.FC = () => {
	return (
		<main className='main '>
			<div className='container'>
				<div className='game'>
					<ModalGame />
					<GameBoard />
					<PlayerRating />
				</div>
			</div>
		</main>
	);
};

export default App;
