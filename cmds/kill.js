module.exports.run = async(bot, message, args) => {
const { kill } = require("../util/kill.json")

 const member = bot.getMemberFromString(message, args.shift());
        if (!member) {
      return message.channel.send('Ok you\'re dead. Please tag someone else to kill.')
  }

    
const embed = new (require('discord.js').RichEmbed)()
                .setColor("RANDOM")
                .setDescription(`**${kill[Math.floor(Math.random() * kill.length)]
      .replace(/\$mention/g, member.user.username)
      .replace(/\$author/g, message.author.username)}**`)

    message.channel.send({embed: embed}).then(message.delete().catch(O_o=>{}));

}
module.exports.help = {
    name: "kill"

}
