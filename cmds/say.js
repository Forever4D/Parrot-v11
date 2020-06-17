module.exports.run = async(bot, message, args) => {
const embed = new (require('discord.js').RichEmbed)()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setDescription(args.join(" "))
    
    message.delete().catch(O_o=>{});
    message.channel.send( { embed: embed } )
     

}
module.exports.help = {
    name: "say"

}
