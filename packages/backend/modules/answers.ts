import { Server } from 'socket.io';
import { gameConfig } from '../config';
import { Spotify } from './spotify';
import { getRandomNumber } from '../utils/randomRangeNumber';
import { TrackType } from '../types/track';
import { shuffle } from '../utils/array';


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
    const isSameSong: TrackType[] = roundArray.filter(item => item.id === track.id);

    if (index === 0) {
      playlist.splice(trackIndex, 1);
    }

    if (isSameSong.length) {
      this.getTrack(roundArray, playlist, index);
    } else {
      roundArray.push(track);
    }
  };

  prepare = () => {
    const playlist = this.spotify.getPlaylist();

    for (let index = 0; index < gameConfig.maxRounds; index++) {
      const tracksArray: TrackType[] = [];
      for (let deepIndex = 0; deepIndex < 4; deepIndex++) {
        this.getTrack(tracksArray, playlist, deepIndex);
      }
      const round: TrackType[] = shuffle(tracksArray);
      this.answers.push(round);
    }
  };

  get = (roundNumber: number) => this.answers[roundNumber];
}
