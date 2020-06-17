module.exports = {
  conf: {
    aliases: []
  },
  help: {
    name: "warn"
  },
  run: async (bot, message, args) => {
    if (!message.guild) {
      return message.reply("Not in Guild, ¯_(ツ)_/¯");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    const MissingPerm = new (require("discord.js")).RichEmbed()
      .setColor("#923ce8")
      .setDescription(":parrot: Missing ban permission! :x:")
      .setTimestamp()
      .setFooter(
        "Enable embed permission on 'parrot' role to warn user!",
        "https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png"
      );

    const MissingAuthPerm = new (require("discord.js")).RichEmbed()
      .setColor("#e8503c")
      .setDescription(
        ":parrot: You don't have permission to warn members! :x:"
      );

    const ValidMember = new (require("discord.js")).RichEmbed()
      .setColor("#e8503c")
      .setDescription(
        "You need to mention a member of this server to warn! :parrot:"
      )
      .setFooter(
        " Example: p!warn [user] (reason) ",
        "https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png"
      );

    const BanYourSelf = new (require("discord.js")).RichEmbed()
      .setColor("#e8503c")
      .setDescription(":parrot: You cannot warn yourself :x:");

    const EnoughRank = new (require("discord.js")).RichEmbed()
      .setColor("#e35242")
      .setDescription(
        ":parrot: You cannot warn this member, this user have equal or higher role than you! :x:"
      );
    ///////////////////////////////////////////////////////////////////////////////////////////////

    if (!message.guild.me.permissions.has("EMBED_LINKS")) {
ssage.channel.send({ embed: MissingPerm });
    }

    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send({ embed: MissingAuthPerm });
    }

    const member = bot.getMemberFromString(message, args.shift());
    if (!member) {
      return message.channel.send({ embed: ValidMember });
    }

    if (member.user.id === "239023934391975936") {
      return message.reply(`This user cannot be warned! :x:`);
    }

    if (member.user.id === message.author.id) {
      return message.channel.send({ embed: BanYourSelf });
    }

    if (bot.checkMiddleware(message.member, member)) {
      return message.channel.send({ embed: EnoughRank });
      //return message.reply('You cannot ban member that are equal or higher than you! :x:')
    }

    const reason = args.join(" ");

    try {
      const caseid = (await bot.getLatestCaseId(message.guild)) + 1

      bot.db.prepare("INSERT INTO warns(guild_id, id, reason, mod, action, guild_case_id) VALUES (?, ?, ?, ?, ?, ?)")
        .run(message.guild.id, member.user.id, reason || 'No Reason provided', message.author.id, "warn", caseid);

      const embed = new (require("discord.js")).RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor("#e66027")
        .addField("Moderator: ", `<@${message.author.id}>`)
        .addField("Warned: ", `<@${member.user.id}>`)
        .addField("Reason:", reason || "No reason provided")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png"
        )
        .setTimestamp()
        .setFooter(
          `Warning: Case-ID (${caseid})`,
            
        );
      await message.delete().catch(O_o => {});
      await member.send({ embed: embed }).catch(error => null);
      await message.channel.send({ embed: embed }).catch(error => null);

      return; //message.channel.send(`:white_check_mark: ${member} has been warned by **${message.author.tag}** for \`${reason || 'No Reason provided'}\``)
    } catch (error) {
      console.error(error);
      return message.reply(
        "There a error while processing command: " + error.message
      );
    }
  }
};
