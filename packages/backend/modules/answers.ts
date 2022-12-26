import { config } from '../config';
import { getRandomNumber } from '../utils/randomRangeNumber';
import { TrackType } from '../types/track';
import { shuffle } from '../utils/array';
import { Spotify } from './spotify';

const ANSWERS_COUNT = 4;

export class Answers {
    private answers: TrackType[][];
    private spotify: Spotify;

    constructor(spotify: Spotify) {
        this.answers = [];
        this.spotify = spotify;
    }

    // getTrackOld = (roundArray: TrackType[], playlist: TrackType[], index: number) => {
    //     const trackIndex: number = getRandomNumber(0, playlist.length - 1);
    //     const track: TrackType = Object.assign({ isCorrect: index === 0 }, <TrackType>playlist[trackIndex]);
    //     const isSameSong: boolean = roundArray.some((item) => item.id === track.id);

    //     if (index === 0) {
    //         playlist.splice(trackIndex, 1);
    //     }

    //     if (isSameSong) {
    //         this.getTrackOld(roundArray, playlist, index);
    //     } else {
    //         roundArray.push(track);
    //     }
    // };

    getTrack = async (roundArray: TrackType[], playlist: TrackType[], index: number) => {
        const trackIndex: number = getRandomNumber(0, playlist.length - 1);
        const track: TrackType = Object.assign({ isCorrect: index === 0 }, <TrackType>playlist[trackIndex]);
        const isSameSong: boolean = roundArray.some((item) => item.id === track.id);

        if (index === 0) {
            playlist.splice(trackIndex, 1);
        }

        if (isSameSong) {
            console.log('isSameSong');

            await this.getTrack(roundArray, playlist, index);
        } else {
            if (!track.previewUrl && track.isCorrect) {
                console.log('if');

                await this.spotify.api.searchTracks(`${track.artist} ${track.title}`).then(async (data: any) => {
                    const song = data.body.tracks.items.find(
                        (deepTrack: any) =>
                            deepTrack.artists[0].name === track.artist &&
                            deepTrack.name.includes(track.title) &&
                            deepTrack.duration_ms === track.duration,
                    );
                    if (song) {
                        console.log('song');

                        roundArray.push({
                            album: song.album.name,
                            artist: song.artists[0].name,
                            duration: song.duration_ms,
                            id: song.id,
                            isCorrect: true,
                            previewUrl: song.preview_url,
                            title: song.name,
                            url: song.uri,
                        });
                    } else {
                        console.log('song else');

                        await this.getTrack(roundArray, playlist, index);
                    }
                });
            } else {
                console.log('else pushed');
                roundArray.push(track);
            }
        }
    };

    prepare = async () => {
        console.log('preparing answers...');
        const playlists = this.spotify.getPlaylists();
        const rounds = new Array(config.maxRounds / playlists.length).fill([]);

        const answersArray = await Promise.all(
            playlists.map(async (playlist: TrackType[]) => {
                return await Promise.all(
                    rounds.map(async () => {
                        const answers = [...Array(ANSWERS_COUNT).keys()];
                        const tracksArray: TrackType[] = [];

                        for (const answer in answers) {
                            await this.getTrack(tracksArray, playlist, Number(answer));
                        }

                        return shuffle(tracksArray);
                    }),
                );
            }),
        );

        // playlists.forEach((playlist: TrackType[]) => {
        //     for (let index = 0; index < config.maxRounds / playlists.length; index++) {
        //         const tracksArray: TrackType[] = [];
        //         for (let answerIndex = 0; answerIndex < ANSWERS_COUNT; answerIndex++) {
        //             this.getTrackOld(tracksArray, playlist, answerIndex);
        //         }
        //         const round: TrackType[] = shuffle(tracksArray);
        //         this.answers.push(round);
        //     }
        // });

        console.log('answersArray', answersArray[0]);
        console.log('answersArray', answersArray[0].length);
    };

    get = (roundNumber: number): TrackType[] => {
        const roundAnswers = this.answers[roundNumber - 1];
        return roundAnswers;
    };
}
