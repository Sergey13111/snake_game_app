import { useContext } from 'react';
import { IPlayer } from '../../models/IPlayer';
import styles from './PlayerRating.module.css';
import PlayersContext from '../../context/PlayersContext/PlayersContext';

const PlayerRating: React.FC = () => {
	const [players] = useContext(PlayersContext);
	const lastPlayer = players[players.length - 1];
	const currentLevel = lastPlayer && lastPlayer.level;

	// Фильтруем игроков по уровню
	const filteredPlayers = players.filter((player) => player.level === currentLevel);
	// Сортируем игроков по убыванию счета
	const sortedPlayers = filteredPlayers.sort(
		(a: IPlayer, b: IPlayer) => b.levels[currentLevel].score - a.levels[currentLevel].score
	);

	return (
		<section className={styles.sectionPlayerRating}>
			<h2 className={styles.title}>Rating</h2>
			<div className={styles.ratingWrapper}>
				<span className={styles.level}>Level: {currentLevel}</span>
				<ul>
					{sortedPlayers?.map((player, index) => (
						<li key={player.id}>
							<span>{index + 1}. </span>
							<span>{player.name}: </span>
							<span>{player.levels[currentLevel].score}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default PlayerRating;
