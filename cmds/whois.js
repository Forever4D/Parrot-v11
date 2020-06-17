module.exports.run = async (bot, message, args) => {
  const member = bot.getMemberFromString(message, args.shift());
  const moment = require("moment");
  const { stripIndent } = require("common-tags");

  let status = {
        "online": `<:online:${'717427394100854835'}>Online`,
        "idle": `<:idle:${'717427431144947773'}>Idle`,
        "dnd": `<:dnd:${'717427455089967196'}>Do Not Disturb`,
        "offline": `<:idle:${"717427478406234113"}>Invisible`,
      }
    
  
  if (!message.guild) {
            return message.reply('This command is executeable only in servers!')
    }
  
  if (!member) {

      
    const ValidMember = new (require("discord.js")).RichEmbed()
      .setColor("#e8503c")
      .setDescription(
        "You need to mention a member of this server to display their info! :parrot:"
      )
      .setFooter(
        " Example: p!whois [user/user-id/part of username]",
        "https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png"
      );
    message.channel.send({ embed: ValidMember });
  } else {
    const rolesOfTheMember = member.roles
      .filter(r => r.name !== "@everyone")
      .map(role => role.name)
      .join(", ");
    const embed = new (require("discord.js")).RichEmbed()
      .setColor("#e8503c")
      .setThumbnail(member.user.avatarURL)
      .addField("User:", `${member.user}`, true)
      .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : "None"}`, true)
      .addField("Status:", stripIndent`${status[member.user.presence.status]}`, true)
      .addField("Game:",`${member.user.presence.game ? member.user.presence.game.name : "None"}`, true)
      .addField("Joined:",`${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`,true)
      .addField("Registered:",`${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
      .addField("Roles[" + `${member.roles.size}` + "]:",member.roles.map(roles => `${roles}`).join(" "), true)
      .setTimestamp()
      .setFooter(
        "ID: " + `${member.user.id}`,
        "https://cdn.discordapp.com/attachments/383674404447584256/716182350844919859/Photo_1590821550863.png"
      );

    message.channel.send({ embed: embed });
  }
};
module.exports.help = {
  name: "whois"
};
