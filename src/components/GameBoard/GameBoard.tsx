import { useCallback, useContext, useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './GameBoard.module.css';
import GameStartContext from '../../context/GameStartContext/GameStartContext';
import PlayersContext from '../../context/PlayersContext/PlayersContext';
import ScoreContext from '../../context/ScoreContext/ScoreContext';

const BOARD_SIZE = 25;
const arrCells = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)); //заполняем массив ячеек дефолтными значениями
const KEY_ACTION = [
	'ArrowRight',
	'ArrowLeft',
	'ArrowDown',
	'ArrowUp',
	'KeyD',
	'KeyA',
	'KeyS',
	'KeyW',
];

const checkBorders = (position: number) => {
	// появление змейки с противоположной стороны при выходе за границы поля
	switch (true) {
		case position >= BOARD_SIZE:
			return 0;
		case position < 0:
			return BOARD_SIZE - 1;
		default:
			return position;
	}
};

const GameBoard: React.FC = () => {
	const [players, setPlayers] = useContext(PlayersContext);
	const [score, setScore] = useContext(ScoreContext);
	const [speed, setSpeed] = useState(0);
	const lastPlayer = players[players.length - 1]; // последний добавленый игрок
	let level = lastPlayer ? lastPlayer.level : 'medium';
	let name = lastPlayer && lastPlayer.name;

	const [snake, setSnake] = useState([
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
	]);
	const [isGameStart, setIsGameStart] = useContext(GameStartContext);
	const [food, setFood] = useState([3, 3]);
	const [direction, setDirection] = useState(KEY_ACTION[0]);

	const pressKeyHandler = useCallback(
		(event: KeyboardEvent) => {
			// проверка входит ли наш евент в массив keyAction, если входит добавляем его в массив direction
			if (KEY_ACTION.includes(event.code)) {
				let newDirection = event.code;

				if (
					(newDirection === 'ArrowRight' && direction === 'ArrowLeft') ||
					(newDirection === 'ArrowLeft' && direction === 'ArrowRight') ||
					(newDirection === 'ArrowDown' && direction === 'ArrowUp') ||
					(newDirection === 'ArrowUp' && direction === 'ArrowDown') ||
					(event.code === 'KeyW' && direction === 'KeyS') ||
					(event.code === 'KeyS' && direction === 'KeyW') ||
					(event.code === 'KeyD' && direction === 'KeyA') ||
					(event.code === 'KeyA' && direction === 'KeyD')
				) {
					return; // если предыдуще направление совпадает с новым ,тогда игнорировать ,чтоб не двигалась в направление хвоста
				}
				setDirection(newDirection);
			}
		},
		[direction]
	);

	const generatedFood = useCallback(() => {
		let newFood: number[];
		// генерация еды до совпадения с координатами змеи
		do {
			newFood = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
			// eslint-disable-next-line no-loop-func
		} while (snake.some((item) => item[0] === newFood[0] && item[1] === newFood[1])); //проверка на совпадение с координатами змеи );
		setFood(newFood);
	}, [snake]);

	const movementSnake = useCallback(() => {
		const newSnake = [...snake];
		let movement: number[] = [];

		// изминение направления змеи в зависимости от нажатой клавиши
		if (direction === KEY_ACTION[0] || direction === KEY_ACTION[4]) {
			movement = [0, 1];
		} else if (direction === KEY_ACTION[1] || direction === KEY_ACTION[5]) {
			movement = [0, -1];
		} else if (direction === KEY_ACTION[2] || direction === KEY_ACTION[6]) {
			movement = [1, 0];
		} else if (direction === KEY_ACTION[3] || direction === KEY_ACTION[7]) {
			movement = [-1, 0];
		}

		// перемещение головы
		const headSnake = [
			checkBorders(newSnake[newSnake.length - 1][0] + movement[0]),
			checkBorders(newSnake[newSnake.length - 1][1] + movement[1]),
		];

		newSnake.push(headSnake); // добавление новіх координат головы
		let sliceIndex = 1;

		// проверка на столкновение змеи со своим телом
		const isCollision = newSnake
			.slice(0, -1)
			.some((item) => item[0] === headSnake[0] && item[1] === headSnake[1]);

		if (isCollision) {
			// Обновление состояния игроков с обновленным счетом
			// создает новый массив updatedPlayers, в котором только текущий игрок обновляется с новым счетом, а остальные игроки остаются без изменений.
			setPlayers((players) => {
				const updatedPlayers = players.map((player, index) => {
					if (index === players.length - 1) {
						// Это текущий игрок
						return {
							...player,
							levels: {
								...player.levels,
								[level]: { score: score },
							},
						};
					} else {
						return player;
					}
				});
				return updatedPlayers;
			});

			setIsGameStart(false);
			setSnake([
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4],
			]);

			return; // остановка игры в случае столкновения
		} else {
			setScore((snake.length - 5) * 10);
			// если голова совпадает с едой вернуть индекс 0,чтоб змейка не обрезалась
			if (headSnake[0] === food[0] && headSnake[1] === food[1]) {
				sliceIndex = 0;

				generatedFood();
			}
		}
		setSnake(newSnake.slice(sliceIndex)); // обрезание хвоста
	}, [direction, food, generatedFood, level, score, setIsGameStart, setPlayers, setScore, snake]);

	useEffect(() => {
		if (isGameStart) {
			switch (level) {
				case 'easy':
					setSpeed(300);
					break;
				case 'medium':
					setSpeed(200);
					break;
				case 'difficult':
					setSpeed(80);
					break;
				default:
					setSpeed(0);
					break;
			}
			const moveInterval = setInterval(movementSnake, speed);
			return () => {
				clearInterval(moveInterval);
			};
		}
	}, [isGameStart, level, movementSnake, speed]);

	useEffect(() => {
		document.addEventListener('keydown', pressKeyHandler); // вызов события клика клавиатуры
		return () => {
			document.removeEventListener('keydown', pressKeyHandler);
		};
	}, [pressKeyHandler]);

	return (
		<section className={styles.sectionGameBoard}>
			<div className={styles.infoWrapper}>
				<span>Name: {name}</span>
				<span>Score: {(snake.length - 5) * 10}</span>
				<span>Level: {level}</span>
			</div>

			<div className={styles.boardWrapper}>
				{/* создаем матрицу из двух массивов и формируем поле из ячеек  */}
				{arrCells.map((row, indexRow: number) => (
					<div
						key={indexRow}
						className={styles.rowBoard}>
						{row.map((cell: any, indexCell: number) => {
							// Проверяем, является ли данная ячейка головой змеи
							let isSnakeHead =
								indexRow === snake[snake.length - 1][0] && indexCell === snake[snake.length - 1][1];

							// Проверяем, является ли данная ячейка частью тела змеи
							let isSnakeBody = snake.some((item, index) => {
								if (index === snake.length - 1) {
									return false; // Это голова, не тело
								}
								return item[0] === indexRow && item[1] === indexCell;
							});

							// определение классов для ячеек
							let classCell = isSnakeHead
								? 'snakeHead'
								: isSnakeBody
								? 'snake'
								: food[0] === indexRow && food[1] === indexCell
								? 'food'
								: '';

							return (
								
								<Cell
									key={indexCell}
									classCell={classCell}
								/>
							);
						})}
					</div>
				))}
			</div>
		</section>
	);
};

export default GameBoard;
