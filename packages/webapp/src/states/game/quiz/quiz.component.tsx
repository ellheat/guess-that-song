import React, { useEffect, useState } from 'react';
import { socket } from '../../../utils/socket';
import { QuizEvents } from '../../../config/events';
import { Round } from './round';
import { PreRound } from './preRound';
import { QUIZ_STATES } from './constants';
import type { AnswerType } from './types';
import type { RoundDataType } from './round/types';
import { useSpotifyPlayer } from './useSpotifyPlayer';


export const Quiz = () => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(QUIZ_STATES.PreRound);
    const [roundNumber, setRoundNumber] = useState<number>(0);
    const [preRoundTime, setPreRoundTime] = useState<number>(3);
    const [roundTime, setRoundTime] = useState<number>(30);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [trackUrl, setTrackUrl] = useState<string>('');

    const { player, deviceId } = useSpotifyPlayer();

    const setNewName = () => {
        player?.setName('asd').then(() => console.log('Player name updated!'));
    }

    const getVolume = () => {
        player?.getVolume().then((volume) => console.log('Volume: ', volume * 100));
    }

    const handleConnect = () => {
        player?.connect();
    }

    const handleActivate = () => {
        //@ts-ignore
        player?.activateElement();
    }

    const handlePlay = () => {
        player?.togglePlay();
    }

    const getCurrentState = () => {
        player?.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            const current_track = state.track_window.current_track;
            const next_track = state.track_window.next_tracks[0];

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
        });
    }

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ round, answers }: RoundDataType) => {
            console.log('round', round);
            const correctAnswer = answers.find((answer: AnswerType) => answer.isCorrect);
            console.log('answers', answers, 'correctAnswer', correctAnswer);
            setRoundNumber(round);
            setAnswers(answers);
            setTrackUrl(correctAnswer?.previewUrl || correctAnswer?.url || '');
        });

        socket.on(QuizEvents.RoundTimer, (time: number) => {
            setQuizState(QUIZ_STATES.Round);
            setRoundTime(time);
        });

        socket.on(QuizEvents.PreRoundTimer, (time: number) => {
            setQuizState(QUIZ_STATES.PreRound);
            setPreRoundTime(time);
        });

        return () => {
            socket.off(QuizEvents.InitRound);
            socket.off(QuizEvents.RoundTimer);
            socket.off(QuizEvents.PreRoundTimer);
        };
    }, []);

    return (
        <>
            <button onClick={handleConnect}>Connect</button>
            <button onClick={setNewName}>Set Name</button>
            <button onClick={getVolume}>Get Volume</button>
            <button onClick={handleActivate}>Activate</button>
            <button onClick={handlePlay}>Toggle Play</button>
            <button onClick={getCurrentState}>getCurrentState</button>
            {quizState === QUIZ_STATES.PreRound && <PreRound time={preRoundTime} />}
            {quizState === QUIZ_STATES.Round && <Round answers={answers} roundNumber={roundNumber} time={roundTime} trackUrl={trackUrl} />}
        </>
    );
}
