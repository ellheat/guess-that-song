import { useRef, useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
	Spotify: typeof Spotify;
  }
}

const TOKEN = 'BQANQe4wEj7ehocUo6PM6OT01uDyj8rYdv_h6IdMsRAvWKBd2Ja4Fj9n3y_UmG7gDPhQbOsOfmNUbdmteXjKfS9d7ywG4P6A7pdQSrlkxsx094GkoTGuz-kakwmVxHVI3jjYuP62uCRbXF5KVWsVlHaS3RSyIjgnB9O1J2Lxf0_BORmbcsk0qIqM2ZsJ_jbyWhuZUtsFRNv10ZGUIf1OZRU';

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