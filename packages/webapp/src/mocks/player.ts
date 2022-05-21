import * as faker from 'faker';

export const player = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  color: faker.internet.color(),
  place: faker.datatype.number(),
  points: faker.datatype.number(),
  correctAnswers: faker.datatype.number(),
  roundsWon: faker.datatype.number(),
  isReady: faker.datatype.boolean(),
});
