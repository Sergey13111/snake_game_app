export interface IPlayer {
	id: string;
	name: string;
	level: string;
	levels: Record<string, { score: number }>;
}
