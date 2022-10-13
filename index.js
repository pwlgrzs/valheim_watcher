require('log-timestamp');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const Gamedig = require('gamedig');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
	],
});

try {
    client.login(process.env.TOKEN);
  } catch (e) {
    if (e instanceof err) {
        console.log(err);
    } else {
        console.log("You have logged in successfully");
    }
  }

function DiscordUpdate() {
    Gamedig.query({
        type: process.env.TYPE,
        host: process.env.HOST,
        port: process.env.PORT,
    })
    .then((updatedState) => {
        state = updatedState;
        const maxplayers = state.maxplayers;
        const players = state.players.length;
        const desc = "Online: ";

        client.user.setPresence({
            activities: [{ name: `${players}/${maxplayers} players.`, type: ActivityType.Playing }],
            status: 'online',
        });

        client.channels.cache.get(process.env.CHANNEL).setName(`${desc}${players}/${state.maxplayers}`);
        console.log('Status and channel updated.');
    })
    .catch((e) => {
        console.log("Server is offline");
        client.user.setPresence({
            activities: [{ name: `server offline :(`, type: ActivityType.Playing }],
            status: 'idle',
        });
	client.channels.cache.get(process.env.CHANNEL).setName(`Server offline.`);
    });
}

client.on('ready', () => {
    console.log('Client init OK!');
    DiscordUpdate();
    setInterval(() => {
        DiscordUpdate();
    }, 300000);
});