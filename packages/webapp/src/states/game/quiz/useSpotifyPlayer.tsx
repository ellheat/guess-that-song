import { useRef, useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
	Spotify: typeof Spotify;
  }
}

export const useSpotifyPlayer = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [deviceId, setDeviceId] = useState<string>('');
	const playerRef = useRef<Spotify.Player | null>(null);

	useEffect(() => {
		if (!window.Spotify) {
			const scriptTag = document.createElement('script');
			scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';

			document.head!.appendChild(scriptTag);

			window.onSpotifyWebPlaybackSDKReady = () => {
				playerRef.current = new Spotify.Player({
					name: 'Guess That Song player',
					volume: 1,
					getOAuthToken: async (cb) => {
							const { accessToken } = await fetch('http://localhost:8080/token', {
								method: 'GET',
								mode: 'cors',
								headers: {
									'Content-Type': 'application/json',
								}
							}).then((response) => response.json());

						cb(accessToken);
						},
					});
				setIsInitialized(true);
			};
		}
	}, []);

	const handleReady = useCallback(({ device_id: deviceId }) => {
		setDeviceId(deviceId);
		console.log('The Web Playback SDK is ready to play music!');
		console.log('deviceId: ', deviceId);
	}, []);

	const handleNotReady = useCallback(({ device_id: deviceId }) => {
		console.log('Device ID has gone offline', deviceId);
	}, []);

	const accountError = useCallback(({ message }) => {
		console.error(message);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			playerRef.current!.connect().then((isSuccess: boolean) => {
				if (isSuccess) {
					console.log('The Web Playback SDK successfully connected to Spotify!');
				};
			});

			return () => {
				playerRef.current!.disconnect();
			}
		}
	}, [isInitialized]);

	// useEffect(() => {
	// 	if (deviceId) {
	// 		playerRef.current!.togglePlay();
	// 	}
	// }, [deviceId]);

	useEffect(() => {
		const player = playerRef.current!;

		if (isInitialized) {
			player.addListener('ready', handleReady);

			player.addListener('not_ready', handleNotReady);

			player.addListener('initialization_error', accountError);

			player.addListener('authentication_error', accountError);

			player.addListener('account_error', accountError);

			return () => {
				player.removeListener('account_error', accountError);
				player.removeListener('authentication_error', accountError);
				player.removeListener('initialization_error', accountError);
				player.removeListener('ready', handleReady);
				player.removeListener('not_ready', handleNotReady);
			};
		}
	}, [handleReady, handleNotReady, accountError, isInitialized]);

	return {
		player: playerRef.current,
		deviceId,
		isInitialized,
	};
}