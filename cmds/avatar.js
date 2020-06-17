module.exports = {
  conf: {
    aliases: []
  },
  help: {
    name: "avatar"
  },
  run: async function(bot, message, args) {
    args = args.join(" ");
    if (!args) {
      const embed = new (require('discord.js').RichEmbed)()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setImage(message.author.displayAvatarURL)
                    .setTitle("Avatar")
      return message.channel.send({embed: embed})
      //return message.channel.send(message.author.displayAvatarURL);
    }

    if (!message.guild) {
      return message.reply("I cannot find this member!");
    }

    const member = bot.getMemberFromString(message, args);
    
   const embed = new (require('discord.js').RichEmbed)()
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
                    .setAuthor(member.user.tag, member.user.displayAvatarURL)
                    .setImage(member.user.displayAvatarURL)
                    .setTitle("Avatar")
      return message.channel.send({embed: embed})
  }
};
