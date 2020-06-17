const snekfetch = require("snekfetch")

module.exports.run = async (bot, message, args) => {

  const WeebAPI = require("../util/weebapi.js")

  const slap = await WeebAPI("slap")

  const member = bot.getMemberFromString(message, args.shift());

  const selfSlap = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} slaps themself***`)
    .setColor("RANDOM")
    .setImage(slap)

  if (!member) {
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: selfSlap });
  }

  if (member) {
    const embed = new (require("discord.js")).RichEmbed()
      .setTitle(
        `***${message.author.username} slaps ${member.user.username}***`
      )
      .setColor("RANDOM")
      .setImage(slap);
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "slap"
};
