import { TrackType } from '../types/track';

export const shuffle = (array: TrackType[]) => {
  return array.sort(() => Math.random() - 0.5);
}
