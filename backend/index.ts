import express from 'express';

import { colors, Ports } from './config';
import { getCharacters } from './components/characters';

const app = express();

app.listen(Ports.Base, () => {
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  getCharacters().then(() => console.log(colors.success('Characters created')));
});
