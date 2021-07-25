import { io } from 'socket.io-client';

export const socket = io(`${process.env.REACT_APP_NETWORK_IP_V4}:4444`, {
  withCredentials: true,
});
