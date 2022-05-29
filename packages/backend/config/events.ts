export enum Events {
  Connection = 'connection',
  Disconnect = 'disconnect',
  PlayersList = 'playersList',
  GameState = 'gameState',
  GameRound = 'gameRound',
  RoundTimer = 'roundTimer',
  QuizTimer = 'quizTimer',
}

export enum PlayerEvents {
  Add = 'playerAdd',
  Added = 'playerAdded',
  Ready = 'playerReady',
  Answer = 'playerAnswer',
  Data = 'playerData',
}

export enum QuizEvents {
  StartQuiz = 'startQuiz',
  StartRound = 'startRound',
  Round = 'round',
  RoundTimer = 'roundTimer',
  QuizTimer = 'quizTimer',
}
