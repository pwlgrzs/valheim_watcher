require('log-timestamp');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const Gamedig = require('gamedig');

const {
    exec
} = require('child_process');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
	],
});

try {
    client.login(process.env.TOKEN);
    console.log("You have logged in successfully");
} catch (err) {
    console.log(err);
}

client.on('ready', () => {
    console.log('Client init OK!');

    setInterval(() => {
        Gamedig.query({
                type: process.env.TYPE,
                host: process.env.HOST,
                port: process.env.PORT,
            })
            .then((updatedState) => {
                state = updatedState;

                const nv_maxplayers = state.maxplayers;
                const nv_players = state.players.length;
		const nv_desc = "Online: ";

                client.user.setPresence({
					activities: [{ name: `${nv_players}/${nv_maxplayers} players.`, type: ActivityType.Playing }],
                    status: 'online',
                });
		client.channels.cache.get(process.env.CHANNEL).setName(`${nv_desc}${nv_players}/${state.maxplayers}`);
		console.log('Status and channel name updated.');
            })
            .catch((e) => {
                console.log(e);
                client.user.setPresence({
					activities: [{ name: `Server offline.`, type: ActivityType.Playing }],
                    status: 'idle',
                });
            });
    }, 300000);
});