import * as faker from 'faker';
import { PlayerStatus } from '../types';

export const player = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  color: faker.internet.color(),
  points: faker.datatype.number(),
  correctAnswers: faker.datatype.number(),
  roundsWon: faker.datatype.number(),
  status: Object.values(PlayerStatus)[Math.floor(Math.random() * 2)],
});
