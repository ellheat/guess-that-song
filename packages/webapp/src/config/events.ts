export enum Events {
	GameState = 'gameState',
	PlayersList = 'playersList',
	Authorization = 'authorization',
}

export enum PlayerEvents {
	Add = 'playerAdd',
	Added = 'playerAdded',
	Answer = 'playerAnswer',
	Data = 'playerData',
	Ready = 'playerReady',
}

export enum QuizEvents {
	InitRound = 'initRound',
	PreRoundTimer = 'preRoundTimer',
	RoundTimer = 'roundTimer',
	StartRound = 'startRound',
}
