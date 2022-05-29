import React from 'react';
import { Answers } from '../../../components/answers';
import { ANSWERS } from './playerAnswers.constants';

export const PlayerAnswers = () => {
	const onClick = () => {
		console.log('clicked');
	};

	return (
		<Answers answers={ANSWERS} onClick={onClick} />
	);
}
