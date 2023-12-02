function register_slash_commmands() {
    require("dotenv").config();
    const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

    const commands = [
        {
            name: "codelock",
            description: "Generate a code for the codelock",
            options: [
                {
                    name: "digits",
                    description: "Digits to generate a code for",
                    type: ApplicationCommandOptionType.Number,
                },
            ],
        },
        {
            name: "ping",
            description: "Ping!",
        },
        {
            name: "help",
            description: "List available commands",
        },
        {
            name: "clear",
            description: "Clear all messages sent by the bot",
        },
    ];

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log("Registering slash commands...");

            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                {
                    body: commands,
                }
            );
        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = { register_slash_commmands };