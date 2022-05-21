# Guess That Song

Change name of the file `.env.example` to the `.env`. Check your local address IPv4 using the command
```
ipconfig - Windows
ifconfig - Linux/MacOS
```
then copy/paste your local address IPv4 into `.env` file in `REACT_APP_NETWORK_IP_V4`.

Finally, you can follow below steps.
### Installation

In the main directory in the terminal run command `npm run dependencies:ci`

### Start project

##### Start backend
To run the backend in the terminal run command `npm run start:backend`.

Backend should listening on the port `8080` and sockets on the port `4444`.
##### Start webapp
To run the webapp application in the terminal run command `npm run start:webapp`.

Application should listening on the port `3000`
