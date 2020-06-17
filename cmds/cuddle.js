module.exports.run = async (bot, message, args) => {
  
  const WeebAPI = require("../util/weebapi.js")

  const slaps = await WeebAPI("cuddle")

  const member = bot.getMemberFromString(message, args.shift());

  const selfkiss = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} cuddles themself***`)
    .setColor("RANDOM")
    .setImage(slaps);

  if (!member || message.author.id === member.user.id) {
    message.delete().catch(O_o=>{});
    return message.channel.send("no....");
   // return message.channel.send({ embed: selfkiss });
  }

  if (member) {
    const embed = new (require("discord.js")).RichEmbed()
      .setTitle(
        `***${message.author.username} cuddles ${member.user.username}***`
      )
      .setColor("RANDOM")
      .setImage(slaps);
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "cuddle"
};
