require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const { generateCode } = require("./codelock.js");
const { register_slash_commmands } = require("./register-commands.js");

const token = process.env.TOKEN;
const textChannelId = "1157398787082440765";
const prefix = "!";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


const commands = {
    ping: (message) => {
        message.reply("pong");
    },
    help: (message) => {
        message.reply(`available commands: ${Object.keys(commands).join(", ")}`);
    },
    codelock: (message) => {
        message.reply(
            `${generateCode(message.content.slice(prefix.length).split(" ")[1])}`
        );
    },
    clear: (message) => {
        message.channel.messages.fetch().then((messages) => {
            messages.forEach((message) => {
                message.delete();
            });
        });
    },
    register_commmands: () => {
        register_slash_commmands();
    },
};

client.on("messageCreate", (message) => {
    if (
        message.channel.id === textChannelId &&
        message.author.id !== client.user.id
    ) {
        if (message.content.startsWith(prefix)) {
            const command = message.content.slice(prefix.length).split(" ")[0];
            if (commands[command]) {
                commands[command](message);
            }
        } else {
            console.log(
                `🔒 Ignoring message from ${message.author.username} in ${message.channel.name}`
            );
            console.log(` | ->  🔒 Message: ${message.content}`);
        }
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case "ping":
            interaction
                .reply("pong")
                .then(() => console.log(`✅ Replied to ${interaction.user.username}`));
            break;
        case "codelock":
            interaction
                .reply(`${generateCode(interaction.options.getNumber("digits"))}`)
                .then(() => console.log(`✅ Replied to ${interaction.user.username}`));
            break;
        default:
            interaction
                .reply("unknown command")
                .then(() => console.log(`✅ Replied to ${interaction.user.username}`));
            break;
    }
});

client.login(token).then(() => {
    console.log(`✅ Logged in as ${client.user.username}!`);
});
