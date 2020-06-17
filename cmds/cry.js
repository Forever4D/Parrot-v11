module.exports.run = async (bot, message, args) => {
  
  const WeebAPI = require("../util/weebapi.js")

  const slaps = await WeebAPI("cry")

  const member = bot.getMemberFromString(message, args.shift());

  const selfSlap = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} cries...***`)
    .setColor("RANDOM")
    .setImage(slaps);

  if (!member || message.author.id === member.user.id) {
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: selfSlap });
  }

  
};
module.exports.help = {
  name: "cry"
};
