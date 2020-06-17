module.exports = {
  help: {
    name: "hack"
  },
  run: async (bot, message, args) => {
    if (args.length < 1) {
      return message.reply("Who you gonna hack?");
    }

    const member = bot.getMemberFromString(message, args.join(" "));
    if (!member) {
      return message.reply("yet Member not found!");
    }

    const timeoutP = time => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };



var randomIP = [
    "1337.0.0.1."
  ];

    const EmbedA = new (require("discord.js")).RichEmbed()
      .setDescription("[▖] Finding discord login of " + member.user.tag + " (2fa bypassed)...")
      .setColor("RANDOM")

    const EmbedB = new (require("discord.js")).RichEmbed()
      .setDescription("[▝] Fetching DM's with closest friends (If there are any friends at all to hack)")
      .setColor("RANDOM")
    
    const EmbedC = new (require("discord.js")).RichEmbed()
      .setTitle("Successfully hacked email account!")
      .addField("Email:", "``"+member.user.username.replace(/ +/g, "")+"@parrotmail.com``")
      .addField("Password:", "``*********``")
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png")
      .setTimestamp()
      .setFooter("Successfully Logged in!", 'https://cdn.discordapp.com/attachments/383674404447584256/716182350844919859/Photo_1590821550863.png'); 

    const EmbedD = new (require("discord.js")).RichEmbed()
      .setDescription("[▝] Finding IP address...")
      .setColor("RANDOM")

    const EmbedE = new (require("discord.js")).RichEmbed()
      .setTitle("IP address found!")
      .addField("IP:", randomIP[Math.floor(Math.random() * randomIP.length).toString()])
      //.addField("Port:", Math.floor(Math.random() * 19000 +4000))
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png")
      .setTimestamp()
      .setFooter("Saving informations!", 'https://cdn.discordapp.com/attachments/383674404447584256/716182350844919859/Photo_1590821550863.png');
   
    const EmbedF = new (require("discord.js")).RichEmbed()
      .setDescription("[▝] Finding IP address...")
      .setColor("RANDOM")

    const EmbedG = new (require("discord.js")).RichEmbed()
      .setDescription("[▝] Injecting trojan virus...")
      .setColor("RANDOM")

    const EmbedH = new (require("discord.js")).RichEmbed()
      .setDescription("[▗] Virus injected!")
      .setColor("RANDOM")

 const FinishHack = new (require("discord.js")).RichEmbed()
      .setDescription("Successfully hacked "+ `<@${member.user.id}>`+" (Informations saved on cloud)")
      .setColor("RANDOM")

    try {
      const msg = await message.channel.send(
        "Started hacking: " + member.user.tag
      );
      await timeoutP(1000);
      await msg.edit({embed: EmbedA});
      await timeoutP(2000);
      await msg.edit({embed: EmbedB});
      await timeoutP(2000);
      await msg.edit({embed: EmbedC});
      await timeoutP(4000);
      await msg.edit({embed: EmbedD});
      await timeoutP(2000);
      await msg.edit({embed: EmbedE});
      await timeoutP(4000);
      await msg.edit({embed: EmbedF});
      await timeoutP(2000);
      await msg.edit({embed: EmbedG});
      await timeoutP(2000);
      await msg.edit({embed: EmbedH});
      await timeoutP(2000);
      await msg.edit({embed: FinishHack});
    } catch (error) {
      // nothing lol
    }
  }
};
