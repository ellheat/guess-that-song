export enum Events {
	Connection = 'connection',
	Disconnect = 'disconnect',
	GameRound = 'gameRound',
	GameState = 'gameState',
	PlayersList = 'playersList',
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
	StartQuiz = 'startQuiz',
	StartRound = 'startRound',
}
