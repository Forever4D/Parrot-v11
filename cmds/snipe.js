module.exports = {
  help: {
    name: "snipe"
  },
  run: async (bot, message, args) => {
    let member;
    
    if (args.length > 0) {
      member = bot.getMemberFromString(message, args.join(" "));
    }
    
    if (!message.channel.lastMessageI) {
      message.channel.lastMessageI = [];
    }
    
    let msg;
    if (member) {
      msg = message.channel.lastMessageI.filter(m => {
        if (m) {
          const invokedID = m.author.id;
          const targetID = member.user.id;
          
          return invokedID === targetID;
        } else return false;
      })[0]
    } else {
      msg = message.channel.lastMessageI[0];
    }
    
    if (!msg) {
      return message.reply(':x: No recent deleted message in this channel yet!');
    }
    
    message.channel.lastMessageI.remove(msg);
    const time = Math.floor(Date.now() - msg.dateDeleted);
    const content = msg.content.length < 1 ? "[No Message Content]" : msg.content;
    
    const embed = new (require('discord.js').RichEmbed)()
      //.setDescription(`**Message deleted in ${MsToTime(time)}**\n${content
      .setColor("#e8503c")
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
      .setDescription(`**Message sent by** ${msg.member} **deleted in ${msg.channel}**\n${content}`)
      .setTimestamp()
      .setFooter(`Message Deleted ${MsToTime(time)}`, 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png');
    return message.channel.send(embed);  
  }
}

function MsToTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    return `${minutes} minutes and ${seconds} seconds ago`
}