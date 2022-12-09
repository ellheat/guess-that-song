import { config } from '../config';
import { Spotify } from './spotify';
import { getRandomNumber } from '../utils/randomRangeNumber';
import { TrackType } from '../types/track';
import { shuffle } from '../utils/array';

const ANSWERS_COUNT = 4;

export class Answers {
    private answers: TrackType[][];
    private spotify: Spotify;

    constructor(spotify: Spotify) {
        this.answers = [];
        this.spotify = spotify;
    }

    getTrack = (roundArray: TrackType[], playlist: TrackType[], index: number) => {
        const trackIndex: number = getRandomNumber(0, playlist.length - 1);
        const track: TrackType = Object.assign({ isCorrect: index === 0 }, <TrackType>playlist[trackIndex]);
        const isSameSong: boolean = roundArray.some((item) => item.id === track.id);

        if (index === 0) {
            playlist.splice(trackIndex, 1);
        }

        if (isSameSong) {
            this.getTrack(roundArray, playlist, index);
        } else {
            roundArray.push(track);
        }
    };

    prepare = () => {
        console.log('preparing answers...');
        this.answers = [];
        const playlists = this.spotify.getPlaylists();

        playlists.forEach((playlist: TrackType[]) => {
            for (let index = 0; index < config.maxRounds / playlists.length; index++) {
                const tracksArray: TrackType[] = [];
                for (let answerIndex = 0; answerIndex < ANSWERS_COUNT; answerIndex++) {
                    this.getTrack(tracksArray, playlist, answerIndex);
                }
                const round: TrackType[] = shuffle(tracksArray);
                this.answers.push(round);
            }
        });
    };

    get = (roundNumber: number): TrackType[] => {
        const roundAnswers = this.answers[roundNumber - 1];
        return roundAnswers;
    };
}
