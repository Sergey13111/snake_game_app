export interface IPlayer {
	id: string;
	name: string;
	level: string;
	levels: {
		easy?: { score: number };
		medium?: { score: number };
		difficult?: { score: number };
	};
}
