import React, { useEffect, useRef } from 'react';
import { Audio } from './audioPlayer.styles';

type AudioPlayerProps = {
    url: string;
}

export const AudioPlayer = ({ url }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef?.current.pause();
            audioRef?.current.load();
            audioRef?.current.play();
        }
    }, [url, audioRef]);

    return <Audio autoPlay controls ref={audioRef} src={url} />;
};
