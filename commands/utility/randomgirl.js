const {AttachmentBuilder, EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const {createCanvas, Image} = require('@napi-rs/canvas');
const axios = require('axios');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('animegirl')
        .setDescription('Get a random anime girl image.')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Select between safe, suggestive, borderline or explicit')
                .setRequired(false)
                .addChoices(
                    {name: 'Safe',value:'safe'},
                    {name: 'Suggestive',value:'suggestive'},
                    {name: 'Borderline',value:'borderline'},
                    {name: 'Explicit',value:'explicit'},
                )),
    async execute(interaction) {
        const content = interaction.options.getString('content');
        await interaction.reply({ content: 'Getting cute anime girls....mostly', fetchReply: true });
        let image
        if(content != null) {
            image = await axios.get(`https://api.nekosapi.com/v3/images/random/file?rating=${content}`, {responseType: 'arraybuffer'});
        } else {
            image = await axios.get(`https://api.nekosapi.com/v3/images/random/file?rating=safe`, {responseType: 'arraybuffer'});

        }
        const attachment = new AttachmentBuilder(image.data,'anime_image.png');
        await interaction.editReply({content: 'Tadaa!', files: [attachment]});
    },
};
