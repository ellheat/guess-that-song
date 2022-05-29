import React, { useLayoutEffect, useRef } from 'react';
import { Audio, Source } from './audioPlayer.styles';

type AudioPlayerProps = {
    url: string;
}

export const AudioPlayer = ({ url }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useLayoutEffect(() => {
        if (audioRef.current) {
            audioRef?.current.pause();
            audioRef?.current.load();
            audioRef?.current.play();
        }
    }, [url, audioRef]);

    return (
        <Audio autoPlay loop controls ref={audioRef}>
            <Source src={url}></Source>
        </Audio>
    );
};
