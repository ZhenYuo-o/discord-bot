const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('manu')
        .setDescription('joah mal schauen'),
    async execute(interaction) {
        await interaction.reply('manuel ist schwul!');
    },
};
