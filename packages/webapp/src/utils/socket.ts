import { io } from 'socket.io-client';

export const socket = io(`${import.meta.env.NETWORK_IP_V4}:4444`, {
    withCredentials: true,
});
