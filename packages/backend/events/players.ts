import { Server, Socket } from 'socket.io';
import { Events, PlayerEvents } from '../config/events';
import { colors } from '../config';
import { Characters, Game, Players, Quiz } from '../modules';
import { Answers } from '../modules/answers';

export const addPlayer = (socket: Socket, io: Server, players: Players, characters: Characters) => {
    const id = socket.id;
    socket.on(PlayerEvents.Add, () => {
        const character = characters.getRandomCharacter();
        const player = players.add(id, character);
        const playersList = players.getList();

        console.log(colors.info(`${player.name} has been joined`));
        console.log(colors.info(`players: ${playersList.length}`));

        console.log('player', player);

        socket.emit(PlayerEvents.Added, player);
        io.emit(Events.PlayersList, playersList);
    });
};

export const setPlayerReady = (socket: Socket, io: Server, players: Players, game: Game, quiz: Quiz) => {
    const id = socket.id;
    socket.on(PlayerEvents.Ready, () => {
        const player = players.setReady(id);
        const playersList = players.getList();
        console.log(colors.info(`${player.name} is ready`));
        socket.emit(PlayerEvents.Data, player);
        io.emit(Events.PlayersList, playersList);

        players.checkAreAllReady();

        if (players.areAllReady) {
            game.setQuiz();
            setTimeout(() => {
                quiz.init(io);
            });
        }
    });
};

export const removePlayer = (socket: Socket, io: Server, players: Players) => {
    const id = socket.id;
    socket.on(Events.Disconnect, () => {
        const player = players.getPlayer(id);
        players.remove(id);
        const playersList = players.getList();
        io.emit(Events.PlayersList, playersList);
        console.log(colors.info(`${player?.name} has been left`));
        console.log(colors.info(`players: ${playersList.length}`));
    });
};

export const playerAnswer = (socket: Socket, io: Server, quiz: Quiz, players: Players, answers: Answers) => {
    const id = socket.id;
    socket.on(PlayerEvents.Answer, (answerId: string) => {
        players.setAnswered(id);
        const correctAnswer = answers.get(quiz.roundNumber).find((answer) => answer.isCorrect);

        if (correctAnswer?.id === answerId) {
            console.log('correct');
            players.addPoints(id);
            return;
        }

        console.log('not correct');
    });
};
