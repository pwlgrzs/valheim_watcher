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
    console.log("You have logged in successfully");
} catch (err) {
    console.log(err);
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
        console.log(e);
        client.user.setPresence({
            activity: {
                name: 'Server wyłączony.'
            },
            status: 'idle',
        });
    });
}

client.on('ready', () => {
    console.log('Client init OK!');
    DiscordUpdate();
    setInterval(() => {
        DiscordUpdate();
    }, 300000);
});