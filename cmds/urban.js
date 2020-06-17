const {stripIndent} = require('common-tags');
const snekfetch = require("snekfetch")
module.exports.run = async (bot, message, args) => {

await snekfetch.get(`http://api.urbandictionary.com/v0/define?term=${args}`)
        .then(r =>{
            let def = r.body.list[0]
            const embed = new (require('discord.js').RichEmbed)()
                .setTitle("Urban Dictionary")
                .setThumbnail("https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png")
                .setDescription(`**Definition for ${def.word}**\n` + (def.definition.length > 1500 ? def.definition.substring(0, 1500) + "..." : def.definition))
                //.addField("**❯ Noun**", def.noun.length > 1020 ? def.noun.substring(0, 1020) + "..." : def.noun, false)
                .addField("**❯ Example**", def.example.length > 1020 ? def.example.substring(0, 1020) + "..." : def.example, false)
                .addField("**❯ Votes**",stripIndent`
                **<a:error:${'717349278015553637'}> Up: **${def.thumbs_up}
                **<a:error:${'717349340649095189'}> Down: **${def.thumbs_down}`, true)
            message.channel.send({embed})    
        }).catch(err => {
            message.channel.send("No results found!")
            console.log(err)
        });
  //p!terminal message.client.fetchUser(message.guild.owner.id)
};
module.exports.help = {
  name: "urban"
};
