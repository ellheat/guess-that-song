import { useRef, useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
	Spotify: typeof Spotify;
  }
}

const TOKEN = 'BQBHPdib_sXiiIi-KOO_rjtE4toKgzfYFalFDTpQ0Uya74gFhz12pxfS-PjeiNAXetk8CPJHU6eKUW0Q4mI8UE8CqJstO4gMPqm4Lz0srxjGUYxGLUc';

const initSpotifyPlayer = () => {
	return new Spotify.Player({
		name: 'Guess That Song player',
		getOAuthToken: async cb => cb(TOKEN),
		volume: 0.5,
	});
}

export const useSpotifyPlayer = () => {
	const [isReady, setIsReady] = useState(false);
	const [deviceId, setDeviceId] = useState<string>('');
	const playerRef = useRef<Spotify.Player | null>(null);


	useEffect(() => {
		if (!window.Spotify) {
			const scriptTag = document.createElement('script');
			scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';

			document.head!.appendChild(scriptTag);

			(window as any).onSpotifyWebPlaybackSDKReady = () => {
				playerRef.current = initSpotifyPlayer();
				setIsReady(true);
			};
		}
	}, []);

	const handleReady = useCallback(({ device_id: deviceId }) => {
		console.log('deviceId', deviceId);
		setDeviceId(deviceId);
	}, []);

	useEffect(() => {
		const player = playerRef.current!

		if (isReady) {
			player.connect();
			console.log('asd');

			player.addListener('ready', handleReady);

			player.addListener('initialization_error', ({ message }) => {
				console.warn(message);
			});

			player.addListener('authentication_error', ({ message }) => {
				console.warn(message);
			});

			player.addListener('account_error', ({ message }) => {
				console.warn(message);
			});

			return () => {
				player.removeListener('account_error');
				player.removeListener('authentication_error');
				player.removeListener('initialization_error');
				player.removeListener('ready', handleReady);
			};
		}
	}, [handleReady, isReady]);

	return {
		player: playerRef.current,
		deviceId,
		isReady,
	};
}