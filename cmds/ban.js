module.exports = {
    conf: {
        aliases: []
    },
    help: {
        name: 'ban'
    },
    run: async (bot, message, args) => {
        if (!message.guild) {
            return message.reply('This command is executeable only in servers!')
        }

//////////////////////////////////////////////////////////////////////////////////////////////
          const MissingPerm = new (require('discord.js').RichEmbed)()
                .setColor("#923ce8")
                .setDescription(":parrot: Missing ban permission! "+`<a:error:${'717349340649095189'}>`)
                .setTimestamp()
                .setFooter("Enable ban permission on 'parrot' role to ban user!", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png'); 
  
          const MissingAuthPerm = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .setDescription(":parrot: You don't have permission to ban members! "+`<a:error:${'717349340649095189'}>`)
       
         const ValidMember = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .setDescription("You need to mention a member of this server to ban! :parrot:")
                .setFooter(" Example: p!ban [user] (reason) ", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png'); 
        
        const BanYourSelf = new (require('discord.js').RichEmbed)()
                .setColor("#e8503c")
                .setDescription(":parrot: You cannot ban yourself "+`<a:error:${'717349340649095189'}>`)

        const EnoughRank = new (require('discord.js').RichEmbed)()
                .setColor("#e35242")
                .setDescription(":parrot: You cannot ban this member, this user have equal or higher role than you! "+`<a:error:${'717349340649095189'}>`)

        const EnoughHighRank = new (require('discord.js').RichEmbed)()
                .setColor("#e35242")
                .setDescription(":parrot: Lacking role permission (4) "+`<a:error:${'717349340649095189'}>`)
                .setFooter("This user have higher role than me!", 'https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png'); 
///////////////////////////////////////////////////////////////////////////////////////////////

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
              
              return message.channel.send({ embed: MissingPerm })
              //return message.reply(`:parrot: Missing ban permission! :x: \`\`\`Enable ban permission on "parrot" role to ban user!\`\`\``);
        }

        if (!message.member.permissions.has("BAN_MEMBERS")) {
          
          return message.channel.send({ embed: MissingAuthPerm })
          //return message.reply(`You don't have permission to ban members! :x:`);
        }

        const member = bot.getMemberFromString(message, args.shift());
        if (!member) {
           
             return message.channel.send({ embed: ValidMember })
           // return message.reply(`You need to mention a member of this server to ban! :parrot:\`\`\`Example: p!ban [user] (reason)\`\`\``);
        }
      
        if (member.user.id === '239023934391975936') {
            return message.reply(`This user cannot be banned! <a:error:${'717349340649095189'}>`)
        }

        if (member.user.id === message.author.id) {
            
            return message.channel.send({ embed: BanYourSelf })
            //return message.reply(`You cannot ban yourself! :x:`);
        }

        if (bot.checkMiddleware(message.member, member)) {
            
            return message.channel.send({ embed: EnoughRank })
            //return message.reply('You cannot ban member that are equal or higher than you! :x:')
        }

        if (!member.bannable) {
            
            return message.channel.send({ embed: EnoughHighRank })
           // return message.reply('I cannot moderate this member! :x:');
        }

        const reason = args.join(' ');

        try {
            const caseid = (await bot.getLatestCaseId(message.guild)) + 1

            bot.db.prepare("INSERT INTO warns(guild_id, id, reason, mod, action, guild_case_id) VALUES (?, ?, ?, ?, ?, ?)")
            .run(message.guild.id, member.user.id, reason || 'No Reason provided', message.author.id, "ban", caseid);

            const embed = new (require('discord.js').RichEmbed)()
                .setAuthor("Parrot", message.author.displayAvatarURL)
                .setColor("#e66027")
                .addField("Moderator: ", message.author.tag)
                .addField("Banned: ", member.user.tag)
                .addField("Reason:" , reason || 'No reason provided')
                .setThumbnail("https://cdn.discordapp.com/attachments/383674404447584256/716184356833460254/Photo_1590822019154.png")
                .setTimestamp()
                .setFooter(`Banned: Case-ID (${caseid})`, 'https://cdn.discordapp.com/attachments/383674404447584256/716182350844919859/Photo_1590821550863.png'); 

            await member.send({ embed: embed }).catch(error => null);
            await message.delete().catch(O_o=>{});
            await message.channel.send({ embed: embed }).catch(error => null);
            await member.ban(`${message.member.user.tag}: ${reason}`);
            // bot.pg.query('INSERT INTO warns VALUES($1, $2, $3, $4, $5)', [member.user.id, reason || 'No Reason provided', message.author.id, 'ban', (await bot.getLatestCaseId()) + 1 ]);

            return //message.channel.send(`:white_check_mark: ${member} has been banned by **${message.author.tag}** for \`${reason || 'No Reason provided'}\``)
        } catch (error) {
            return message.reply('There a error while processing command: ' + error.message);
        }
    }
}