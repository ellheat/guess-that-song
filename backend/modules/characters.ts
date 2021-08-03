const random = require('lodash.random');
const characters = require('../json/characters');

export type CharacterType = {
  name: string;
  color: string;
}

export class Characters {
  private list;

  constructor() {
    this.list = new Array<CharacterType>();
  }

  createCharactersList = () => {
    const animals = <string[]>characters.characters;
    const adjectives = <string[]>characters.adjectives;
    const colors = <string[]>characters.colors;

    animals.forEach(animal => {
      const randomColor = colors[random(0, colors.length - 1)];
      const randomAdjective = adjectives[random(0, adjectives.length - 1)];

      this.list.push({
        name: `${randomAdjective} ${animal}`,
        color: randomColor,
      });
    });
  }

  getRandomCharacter = () => {
    const randomNumber = random(0, this.list.length - 1);
    return this.list.splice(randomNumber, 1)[0];
  };
}
