const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Get a random cat fact.'),
    async execute(interaction) {
        try {
            // API-Anfrage, um zufälligen Katzenfakt zu erhalten
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            const catFact = data.fact;

            // Antwort senden
            await interaction.reply(catFact);
        } catch (error) {
            console.error(error);
            await interaction.reply('Oops! Something went wrong while fetching cat facts.');
        }
    },
};
