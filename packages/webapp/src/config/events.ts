export enum Events {
	GameState = 'gameState',
	PlayersList = 'playersList',
}

export enum PlayerEvents {
	Add = 'playerAdd',
	Added = 'playerAdded',
	Data = 'playerData',
	Ready = 'playerReady',
}

export enum QuizEvents {
	InitRound = 'initRound',
	PreRoundTimer = 'preRoundTimer',
	RoundTimer = 'roundTimer',
	StartRound = 'startRound',
}
