const fs = module.require("fs");
const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
      if(!message.member.roles.some(r=>["AAdminiasdsadaastrator", "FOREVER 4D"].includes(r.name)) || ["344754852989108226"].includes(message.author.id))
      return message.reply("You don't have permission to use this command! :x:");



    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send("You didn't mentioned any user or ID");
  
    if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("The user has greater role than you");
  
  
    if (toMute === message.author) return message.channel.send("What are you doing ? ");
  
  let time = args.slice(1).join(' ');
  
   if(isNaN(time)){
     return message.channel.send("Invalid time")
   }
  
  if (!time) return message.channel.send("Please specify time in minutes !");
    let role = message.guild.roles.find(r => r.name === "Muted");
    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#d40d0d",
                permissions: []
            });

            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  console.log(Date.now())
    if (toMute.roles.has(role.id)) return message.channel.send("This person is already muted!");

    bot.mutes[toMute.id] = {
        guild: message.guild.id,
        time: Date.now() + parseInt(args[1]) * 60000,
        Admin : message.author.tag,
        Muted : toMute.user.tag,
      Fortime : args[1]
    }
    await toMute.addRole(role);
  
    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => { 

        if (err) throw err;
          let embed = new Discord.RichEmbed()
        .setAuthor("~Mute~", message.author.displayAvatarURL)
        .setColor("#FF0000")
        .addField("Moderator:", message.author.tag)
        .addField("Muted:", toMute.user.tag)
        .addField("Duration:", time + "ms")
        .setThumbnail("https://cdn.discordapp.com/attachments/549174985244147732/551666622587207701/infloto3.png")
        .setTimestamp()
        .setFooter("Muted -",'https://cdn.discordapp.com/attachments/304594239516573696/555022170745733140/30-512.png')
message.channel.send(embed)
    });

}


exports.conf = {
  aliases: []
  
};

module.exports.help = {
        name: "mute"

    }