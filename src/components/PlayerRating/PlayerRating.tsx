import { useContext } from 'react';
import { IPlayer } from '../../models/IPlayer';
import styles from './PlayerRating.module.css';
import PlayersContext from '../../context/PlayersContext/PlayersContext';

const PlayerRating: React.FC = () => {
	const [players] = useContext(PlayersContext);
	const lastPlayer = players[players.length - 1];
	const level = lastPlayer && lastPlayer.level;

	// Фильтруем игроков по уровню
	const filteredPlayers = players.filter((player) => player.level === level);

	// Сортируем игроков по убыванию счета
	const sortedPlayers = filteredPlayers.sort(
		//@ts-ignore
		(a: IPlayer, b: IPlayer) => b.levels[level].score - a.levels[level].score
	);

	return (
		<section className={styles.sectionPlayerRating}>
			<h2 className={styles.title}>Rating</h2>
			<div className={styles.ratingWrapper}>
				<ul>
					{sortedPlayers?.map((player, index) => (
						<li key={player.id}>
							<span>{index + 1}. </span>
							<span>{player.name}: </span>
							{/* @ts-ignore */}
							<span>{player.levels[level].score}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default PlayerRating;
