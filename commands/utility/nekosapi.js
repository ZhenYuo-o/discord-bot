const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomAnimeImage')
        .setDescription('Get a random **safe** anime image.'),
    async execute(interaction) {
        try {
            // Filter for safe images
            const response = await fetch('https://nekosapi.com/api/v3/images/random?rating=safe');
            const data = await response.json();

            if (!data.url) {
                throw new Error('Nekos API response is missing the image URL.');
            }

            const imageUrl = data.url;

            // Fetch the anime image
            const imageResponse = await fetch(imageUrl);

            if (!imageResponse.ok) {
                throw new Error(`Failed to fetch anime image: ${imageResponse.statusText}`);
            }

            const imageBuffer = await imageResponse.buffer();

            // Create a Discord attachment
            const attachment = new AttachmentBuilder(imageBuffer, { filename: 'random_anime_image.jpg' });

            // Send the anime image as a reply
            await interaction.reply({ content: 'Here\'s a random **safe** anime image for you!', files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Oops! Something went wrong while fetching a safe anime image.');
        }
    },
};
