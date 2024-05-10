const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Get a random cat fact.'),
    async execute(interaction) {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            const catFact = data.fact;
            await interaction.reply(catFact);
        } catch (error) {
            console.error(error);
            await interaction.reply('Oops! Something went wrong while fetching cat facts.');
        }
    },
};
