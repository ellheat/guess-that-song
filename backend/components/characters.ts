const random = require('lodash.random');
const characters = require('../json/characters');

export type CharacterType = {
  name: string;
  color: any;
  points: number;
  correctAnswers: number;
  roundsWon: number;
}

const CHARACTERS: CharacterType[] = [];

const getSingleCharacter = () => {
  const animal = characters.characters[random(0, characters.length - 1)];
  const adjective = characters.adjectives[random(0, characters.adjectives - 1)];
  const color = characters.colors[random(0, characters.colors - 1)];

  CHARACTERS.push({
    name: `${adjective} ${animal}`,
    color: color,
    points: 0,
    correctAnswers: 0,
    roundsWon: 0,
  });
};

export const getCharacters = () => new Promise<void>(resolve => {
  const animals = <string[]>characters.characters;
  const adjectives = <string[]>characters.adjectives;
  const colors = <string[]>characters.colors;

  animals.forEach(animal => {
    const randomColor = colors[random(0, colors.length - 1)];
    const randomAdjective = adjectives[random(0, adjectives.length - 1)];

    CHARACTERS.push({
      name: `${randomAdjective} ${animal}`,
      color: randomColor,
      points: 0,
      correctAnswers: 0,
      roundsWon: 0,
    });
  });
  resolve();
});

export const characterPicker = () => {
  const randomNumberOfCharacter = random(0, CHARACTERS.length - 1);
  getSingleCharacter();

  return CHARACTERS.splice(randomNumberOfCharacter, 1)[0];
};
