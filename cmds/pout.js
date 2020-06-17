module.exports.run = async (bot, message, args) => {
  
  const WeebAPI = require("../util/weebapi.js")

  const slaps = await WeebAPI("pout")

  const member = bot.getMemberFromString(message, args.shift());

  const selfSlap = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} pouts themself***`)
    .setColor("RANDOM")
    .setImage(slaps);

  if (!member) {
    message.delete().catch(O_o=>{});
    message.channel.send("Mention a member!");
  }

  if (member) {
    const embed = new (require("discord.js")).RichEmbed()
      .setTitle(
        `***${message.author.username} pouts at ${member.user.username}***`
      )
      .setColor("RANDOM")
      .setImage(slaps);
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "pout"
};
