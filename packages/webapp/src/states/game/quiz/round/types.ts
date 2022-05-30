export type AnswerType = {
    isCorrect: boolean,
    id: string,
    artist: string,
    title: string,
    album: string,
    url: string,
    previewUrl: string,
};

export type AnswersListType = AnswerType[];

export type RoundDataType = {
    round: number;
    answers: AnswerType[];
}