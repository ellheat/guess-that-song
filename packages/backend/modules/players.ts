import { playerAnswer } from '../events/players';
import { CharacterType } from './characters';


interface PlayerType extends CharacterType {
	id: string;
	points: number;
	correctAnswers: number;
	roundsWon: number;
	isReady: boolean;
	isAnswered: boolean;
}

const PLAYER_DEFAULT_VALUES = {
	points: 0,
	correctAnswers: 0,
	roundsWon: 0,
	isReady: false,
	isAnswered: false,
}

export class Players {
	private list;
	public areAllReady: boolean;
	public areAllAnswered: boolean;

	constructor() {
		this.list = new Map<string, PlayerType>();
		this.areAllReady = false;
		this.areAllAnswered = false;
	}

	add = (id: string, character: CharacterType) => {
		const player = Object.assign({}, {
			id,
			...PLAYER_DEFAULT_VALUES,
			...character
		});
		this.list.set(id, player);
		return player;
	}

	remove = (id: string) => this.list.delete(id);

	getList = (): PlayerType[] => Array.from(this.list.values());

	getPlayer = (id: string): PlayerType => <PlayerType>this.list.get(id);

	checkAreAllReady = () => {
		const list = this.getList();
		const filteredList = list.filter(({ isReady }) => isReady);
		this.areAllReady = list.length === filteredList.length;
	};

	checkAreAllAnswered = () => {
		const list = this.getList();
		const filteredList = list.filter(({ isAnswered }) => isAnswered);
		this.areAllAnswered = list.length === filteredList.length;
	};

	setReady = (id: string) => {
		const player = Object.assign(this.getPlayer(id), { isReady: true });
		this.list.set(id, player);
		return player;
	}

	setAllUnready = () => {
		this.list.forEach(player => player.isReady = false);
		this.areAllReady = false;
	}

	setAnswered = (id: string) => {
		const player = Object.assign(this.getPlayer(id), { isAnswered: true });
		this.list.set(id, player);
		this.checkAreAllAnswered();
	}

	setAllUnanswered = () => {
		this.list.forEach(player => player.isAnswered = false);
		this.areAllAnswered = false;
	}

	addPoints = (id: string) => {
		const player = this.getPlayer(id);
		const playerNewData = Object.assign(player, { points: player.points + 1 });
		this.list.set(id, playerNewData);
		return playerNewData;
	}

	clearAllData = () => {
		this.list.forEach(player => ({ ...player, ...PLAYER_DEFAULT_VALUES }));
	}
}
