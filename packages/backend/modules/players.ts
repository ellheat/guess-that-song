import { CharacterType } from './characters';

interface PlayerType extends CharacterType {
    id: string;
    points: number;
    correctAnswers: number;
    roundsWon: number;
    isReady: boolean;
    isAnswered: boolean;
    isAnsweredCorrectly: boolean;
}

const PLAYER_DEFAULT_VALUES = {
    points: 0,
    correctAnswers: 0,
    roundsWon: 0,
    isReady: false,
    isAnswered: false,
    isAnsweredCorrectly: false,
};

// type PlayerDefaultValuesTypes = keyof typeof PLAYER_DEFAULT_VALUES;

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
        const player = Object.assign(
            {},
            {
                id,
                ...PLAYER_DEFAULT_VALUES,
                ...character,
            },
        );
        this.list.set(id, player);
        return player;
    };

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
    };

    setAllUnready = () => {
        this.list.forEach((player) => (player.isReady = false));
        this.areAllReady = false;
    };

    setAnswered = (id: string) => {
        const player = Object.assign(this.getPlayer(id), { isAnswered: true });
        this.list.set(id, player);
        this.checkAreAllAnswered();
    };

    setAnsweredCorrectly = (id: string) => {
        const player = Object.assign(this.getPlayer(id), { isAnsweredCorrectly: true });
        this.list.set(id, player);
    };

    setAllUnanswered = () => {
        this.list.forEach((player) => {
            player.isAnswered = false;
            player.isAnsweredCorrectly = false;
        });
        this.areAllAnswered = false;
    };

    addPoints = (id: string, points: number) => {
        this.setAnsweredCorrectly(id);
        const player = this.getPlayer(id);
        const playerNewData = Object.assign(player, { points: player.points + points });

        console.log(
            `${player.name} has been answered correctly and receive: ${points} | total points: ${player.points}`,
        );

        this.list.set(id, playerNewData);
        return playerNewData;
    };

    clearQuizData = () => {
        this.list.forEach((player: PlayerType) => {
            player.points = 0;
            player.roundsWon = 0;
            player.correctAnswers = 0;
            player.isAnswered = false;
            player.isAnsweredCorrectly = false;
        });
    };
}
