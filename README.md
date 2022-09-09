
# Valheim Watcher
Node.js app to monitor Valheim game server  via Discord bot & channel.
## Features

- Update bot status to "X/Y players" online on server.
- Update set channel name to "Online: X/Y"

Where:
  - X - current players in game
  - Y - server player limit

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file or pass them to the container in a different way.

`TOKEN` - your Discord Bot token

`TYPE` - this should be set to "valheim"0

`HOST` - public address of your Valheim server

`PORT` - this should be set to query port (typically 2456, if different port is used it should be one port up to game port)

`CHANNEL` -  this should be set to channel ID you want to use as status channel
## Usage/Examples

Example docker-compose.yml file:
```
version: '3'

services:
  my_valheim:
    container_name: valheim_watcher
    image: pblvsk/valheim_watcher:latest
    environment:
      TOKEN: '<YOUR_BOT_TOKEN>'
      TYPE: valheim
      HOST: <YOUR_HOST>
      PORT: <YOUR_QUERY_PORT>
    restart: unless-stopped
```
## Screenshots

Bot status:

![Bot Status](https://pwlgrzs.usermd.net/img/VBot/Screenshot_1.png)

Channel status:

![Bot Status](https://pwlgrzs.usermd.net/img/VBot/Screenshot_5.png)