module.exports.run = async (bot, message, args) => {
  
  const WeebAPI = require("../util/weebapi.js")

  const slaps = await WeebAPI("kiss")

  const member = bot.getMemberFromString(message, args.shift());

  const selfkiss = new (require("discord.js")).RichEmbed()
    .setTitle(`***${message.author.username} kisses themself***`)
    .setColor("RANDOM")
    .setImage(slaps);

  if (!member || message.author.id === member.user.id) {
    message.delete().catch(O_o=>{});
    return message.reply("You cannot kiss yourself!");
   // return message.channel.send({ embed: selfkiss });
  }
  
//if (member.user.id !== '239023934391975936' && message.author.id === '314004699592261639') {
//           return message.channel.send("no....");
//}  

if (member.user.id === '314004699592261639' && message.author.id !== '239023934391975936') {
           return message.channel.send("no....");
}  

  if (member) {
    const embed = new (require("discord.js")).RichEmbed()
      .setTitle(
        `***${message.author.username} kisses ${member.user.username}***`
      )
      .setColor("RANDOM")
      .setImage(slaps);
    message.delete().catch(O_o=>{});
    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "kiss"
};
