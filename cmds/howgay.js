module.exports.run = async(bot, message, args) => {

const ValidMember = new (require('discord.js').RichEmbed)()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setTitle("**gayness machine**\n")
                 .setDescription(`<@${message.author.id}>`+" is "+ "`"+Math.floor(Math.random() * 100 +1)+"`"+ "% GAY :rainbow_flag:")
                .setFooter("Verified by Parrot!", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png');

const member = bot.getMemberFromString(message, args.shift());
if (!member) {
           
             return message.channel.send({ embed: ValidMember })
           // return message.reply(`You need to mention a member of this server to ban! :parrot:\`\`\`Example: p!ban [user] (reason)\`\`\``);
}

const embed = new (require('discord.js').RichEmbed)()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setTitle("**gayness machine**\n")
                .setDescription(`**<@${member.user.id}>**`+" is "+ "`"+Math.floor(Math.random() * 100 +1)+"`"+ "% GAY :rainbow_flag:")
                .setFooter("Verified by Parrot!", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png'); 

  const FullGay = new (require('discord.js').RichEmbed)()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setTitle("**gayness machine**\n")
                 .setDescription(`**${member.user.username}**`+" is `101`% GAY :rainbow_flag:")
                .setFooter("Verified by Parrot!", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png'); 


//seb0x07

if (member.user.id === '709111596483608596' || member.user.id === '686020770711076890' || member.user.id === '458206705826922496' || member.user.id === '446678964778303498') {
           return message.channel.send({ embed: FullGay })
        
}

message.channel.send({ embed: embed })
  
}
module.exports.help = {
    name: "howgay"

}
