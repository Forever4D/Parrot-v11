module.exports.run = async (bot, message, args) => {
  
  const WeebAPI = require("../util/weebapi.js")

  const slaps = await WeebAPI("pat")

  const member = bot.getMemberFromString(message, args.shift());

  const selfSlap = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} pats themself***`)
    .setColor("RANDOM")
    .setImage(slaps);

  if (!member) {
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: selfSlap });
  }

  if (member) {
    const embed = new (require("discord.js")).RichEmbed()
      .setTitle(
        `***${message.author.username} pats ${member.user.username}***`
      )
      .setColor("RANDOM")
      .setImage(slaps);
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "pat"
};
